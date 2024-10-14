'use client'

import { ChangeEvent, RefObject, useState } from 'react'
import { useRouter } from 'next/navigation'
import $ from 'jquery'
import { Verse } from 'service/verse/types'

export default function useHelpers(verse: Verse, inputRef: RefObject<HTMLInputElement>) {
  const [loading, setLoading] = useState(false)
  const [cursor, setCursor] = useState(0)
  const displayedText = verse ? verse.text?.replaceAll('"', '').split(' ') : []
  // Same in every game mode, used for coloring logic.
  const textRefs = displayedText.map((word) => ({
    word: word.toLowerCase(),
    length: word.length,
    processed: false,
  }))
  const [difficulty, setDifficulty] = useState(0)
  const [parity, setParity] = useState('odd')
  const [wordsCorrect, setWordsCorrect] = useState(0)
  const router = useRouter()
  const LOADING_TIME = 2500

  /*
  1. Users load the page and see the verse greyed out depending on difficulty
  2. Users type a letter
  3. Evaluate whether letter matches first letter of word at cursor
  4. Set color corresponding to whether letter matches
  5. move cursor to next word
  6. When we're out of words, send player either to win screen or losing screen
  */

  /**
   * Handles the cursor / word color logic when user enters a letter
   */
  function handleUserInput(e: ChangeEvent<HTMLInputElement>) {
    const keyPressed = e.target.value
    e.target.value = ''

    if (cursor < textRefs.length) {
      $(`.verse_words div`).removeClass('target')

      if ($(`.verse_word:nth-child(${cursor + 1})`))
        $(`.verse_word:nth-child(${cursor + 1})`).removeClass('text-transparent')

      if ($(`.verse_word:nth-child(${cursor + 2})`)) $(`.verse_word:nth-child(${cursor + 2})`).addClass('target')

      const target = textRefs[cursor]
      const matched = target.word[0] === keyPressed.toLowerCase()

      $(`#verse_word_${cursor}`)[0].classList.add(matched ? 'text-darkGreen' : 'text-red')

      const update = matched ? 1 : 0

      setCursor((prev) => prev + 1)
      setWordsCorrect((prev) => prev + update)

      const correctPercent = Math.round(((wordsCorrect + update) / textRefs.length) * 100)

      // Verse is complete! Evaluate player performance
      if (cursor >= textRefs.length - 1) {
        onStageComplete(correctPercent)
      }
    }
  }

  /**
   * Defines behavior when user finishes a difficulty stage
   */
  async function onStageComplete(correctPercent: number) {
    if (correctPercent >= 90) {
      // todo add api call here for verse completions
      router.push(`/home/${verse.id}/success?diff=${difficulty}`)
    } else {
      router.push(`/home/${verse.id}/failed?diff=${difficulty}&percent=${correctPercent}`)
    }
  }

  /**
   * Resets the state variables back to defaults to start a new game / new difficulty stage
   */
  function reset() {
    setWordsCorrect(0)
    setCursor(0)
    inputRef.current!.focus()
  }

  /**
   * Sets styles on words based on difficulty
   */
  const difficultyTransition = (diff: number) => {
    setDifficulty(diff)
    // reset position in displayed text
    setCursor(0)
    inputRef.current!.focus()
    const target = $('.target')
    $('.verse_word').removeClass().addClass('verse_word pr-[3px]').delay(800)
    target.addClass('target')

    // if diff 0, already reset.
    // if diff 1, add "background_font" class to every other displayText
    if (diff === 1) {
      // iterate through each word, and take 1200 / n seconds for each one.
      const delayTime = LOADING_TIME / displayedText.length
      $(`.verse_words div :nth-child(${parity})`).each((i, elem) => {
        setTimeout(() => {
          $(elem).addClass('text-transparent')
        }, i * delayTime)
      })

      setParity((prev) => (prev === 'odd' ? 'even' : 'odd'))
    }

    // if diff 2, add "background_font" class to every displayText
    else if (diff === 2) {
      const delayTime = LOADING_TIME / displayedText.length
      $(`.verse_words div div`).each((i, elem) => {
        setTimeout(() => {
          $(elem).addClass('text-transparent')
        }, i * delayTime)
      })
    }
  }

  /**
   * Handles state for the loading icon while styling words for difficulties
   */
  const triggerLoad = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, LOADING_TIME)
  }

  return {
    displayedText,
    loading,
    difficultyTransition,
    handleUserInput,
    triggerLoad,
  }
}
