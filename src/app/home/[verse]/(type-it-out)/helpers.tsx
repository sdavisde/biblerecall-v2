'use client'

import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import $ from 'jquery'
import { Verse } from '@app/api/verse/util'

export default function Helpers(verse: Verse) {
  const [verseComplete, setVerseComplete] = useState(false)
  const [isTransition, setIsTransition] = useState(false)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)
  const [failed, setFailed] = useState(false)
  const [index, setIndex] = useState(0)
  const [completed, setCompleted] = useState(0)
  const displayedText = verse ? verse.text.split(' ') : []
  // Same in every game mode, used for coloring logic.
  const textRefs = displayedText.map((word) => ({
    word: word.toLowerCase(),
    length: word.length,
    processed: false,
  }))
  const [difficulty, setDifficulty] = useState(1)
  const [parity, setParity] = useState('odd')
  const [key, setKey] = useState('')
  const [wordsCorrect, setWordsCorrect] = useState(0)
  const router = useRouter()
  const input = useRef<HTMLInputElement>(null)
  const LOADING_TIME = 4000

  const setGameMode = (diff: number, loadGif = true) => {
    // trigger a 1 second load gif to switch between difficulties
    if (loadGif) triggerLoad()

    // reset position in displayed text
    setIndex(0)
    input.current!.focus()
    $('.verse_word').removeClass().addClass('verse_word pr-[3px]').delay(800)

    // if diff 1, already reset.
    // if diff 2, add "background_font" class to every other displayText
    if (diff == 2) {
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
    else if (diff == 3) {
      const delayTime = LOADING_TIME / displayedText.length
      $(`.verse_words div div`).each((i, elem) => {
        setTimeout(() => {
          $(elem).addClass('hidden')
        }, i * delayTime)
      })
    }

    setDifficulty(diff)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = ''
    console.log(index, textRefs)

    if (index < textRefs.length) {
      $(`.verse_words div`).removeClass('target')

      if ($(`.verse_word:nth-child(${index + 1})`))
        $(`.verse_word:nth-child(${index + 1})`).removeClass('hidden')

      if ($(`.verse_word:nth-child(${index + 2})`))
        $(`.verse_word:nth-child(${index + 2})`).addClass('target')

      const target = textRefs[index]
      let valid = target.word[0] == key.toLowerCase()

      if (valid) setWordsCorrect((prev) => prev + 1)

      $(`#verse_word_${index}`)[0].classList.add(valid ? 'text-green' : 'text-red')

      setIndex((prev) => prev + 1)

      const correctPercent = Math.round((wordsCorrect / textRefs.length) * 100)
      setCompleted(correctPercent)
      valid = correctPercent >= 90

      // Verse is complete! Evaluate player performance
      if (index >= textRefs.length - 1) {
        if (valid) {
          switch (difficulty) {
            case 1:
              setIsTransition(true)
              break
            case 2:
              setIsTransition(true)
              break
            case 3:
              setFinished(true)
              setTimeout(() => {
                router.push('/')
              }, 4000)
              break
          }
        } else {
          setFailed(true)
          setTimeout(() => {
            setFailed(false)
            setVerseComplete(false)
            setGameMode(difficulty, false)
          }, 4000)
        }

        setWordsCorrect(0)
      }
    }
  }

  const onKeyDown = (e: KeyboardEvent) => {
    console.log(e.key)
    setKey(e.key)
  }

  const triggerLoad = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setVerseComplete(false)
    }, LOADING_TIME)
  }

  const moveForward = () => {
    setIsTransition(false)
    setVerseComplete(true)
    setCompleted(0)
    setGameMode(difficulty + 1)
  }

  const retryStep = () => {
    setIsTransition(false)
    setCompleted(0)
    setGameMode(difficulty)
  }
  return {
    displayedText,
    loading,
    inputRef: input,
    setGameMode,
    onChange,
    onKeyDown,
    triggerLoad,
    moveToNextStep: moveForward,
    retryStep,
  }
}
