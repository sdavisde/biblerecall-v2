'use client'

import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import $ from 'jquery'
import { Verse } from '@app/api/verse/util'

export default function useHelpers(verse: Verse) {
  const [loading, setLoading] = useState(false)
  const [cursor, setCursor] = useState(0)
  const [amountCompleted, setAmountCompleted] = useState(0)
  const displayedText = verse ? verse.text?.split(' ') : []
  // Same in every game mode, used for coloring logic.
  const textRefs = displayedText.map((word) => ({
    word: word.toLowerCase(),
    length: word.length,
    processed: false,
  }))
  const [parity, setParity] = useState('odd')
  const [wordsCorrect, setWordsCorrect] = useState(0)
  const router = useRouter()
  const input = useRef<HTMLInputElement>(null)
  const LOADING_TIME = 4000

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

      if ($(`.verse_word:nth-child(${cursor + 1})`)) $(`.verse_word:nth-child(${cursor + 1})`).removeClass('hidden')

      if ($(`.verse_word:nth-child(${cursor + 2})`)) $(`.verse_word:nth-child(${cursor + 2})`).addClass('target')

      const target = textRefs[cursor]
      let matched = target.word[0] === keyPressed.toLowerCase()

      if (matched) {
        setWordsCorrect((prev) => prev + 1)
      }

      $(`#verse_word_${cursor}`)[0].classList.add(matched ? 'text-darkGreen' : 'text-red')

      setCursor((prev) => prev + 1)

      const correctPercent = Math.round((wordsCorrect / textRefs.length) * 100)
      setAmountCompleted(correctPercent)

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
      console.log('here')
      await router.push(`/home/${verse.id}/success`)
    } else {
      await router.push(`/home/${verse.id}/failed`)
    }
  }

  /**
   * Resets the state variables back to defaults to start a new game / new difficulty stage
   */
  function reset() {
    setWordsCorrect(0)
  }

  /**
   * Sets styles on words based on difficulty
   */
  const setGameMode = (difficulty: number, loadGif = true) => {
    // trigger a 1 second load gif to switch between difficulties
    if (loadGif) {
      triggerLoad()
    }

    // reset position in displayed text
    setCursor(0)
    input.current!.focus()
    $('.verse_word').removeClass().addClass('verse_word pr-[3px]').delay(800)

    // if diff 1, already reset.
    // if diff 2, add "background_font" class to every other displayText
    if (difficulty == 2) {
      // compare with previous difficulty
      if (difficulty === 2) {
        setParity(parity == 'odd' ? 'even' : 'odd')
      }

      // iterate through each word, and take 1200 / n seconds for each one.
      const delayTime = LOADING_TIME / displayedText.length
      $(`.verse_words div :nth-child(${parity})`).each((i, elem) => {
        setTimeout(() => {
          $(elem).addClass('hidden')
        }, i * delayTime)
      })
    }

    // if diff 3, add "background_font" class to every displayText
    else if (difficulty == 3) {
      const delayTime = LOADING_TIME / displayedText.length
      $(`.verse_words div div`).each((i, elem) => {
        setTimeout(() => {
          $(elem).addClass('hidden')
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
    inputRef: input,
    setGameMode,
    handleUserInput,
    triggerLoad,
  }
}
