'use client'

import { useState, useEffect, useCallback} from 'react'
import { Card, CardBody } from '@nextui-org/react'
import { Button } from "@nextui-org/react"
import { SkipForward, Pause, Play } from 'lucide-react'

export default function FlashcardDisplay() {
  const [flashcards, setFlashcards] = useState([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(6000)

  const questionDuration = 6000 // Set the duration for the question (in milliseconds)
  const answerDuration = 4000 // Set the duration for the answer (in milliseconds)

  const fetchFlashcards = useCallback(async () => {
    try {
      const response = await fetch('/api/flashcard')
      if (!response.ok) throw new Error('Failed to fetch flashcards')
      const data = await response.json()
      setFlashcards(data)
    } catch (error) {
      console.error('Error fetching flashcards:', error)
    }
  }, [])

  useEffect(() => {
    fetchFlashcards()
  }, [fetchFlashcards])

  useEffect(() => {
    if (flashcards.length === 0) return

    const timer = setInterval(() => {
      if (!isPaused) {
        setTimeRemaining((prevTime) => {
          if (prevTime > 100) {
            return prevTime - 100
          } else {
            if (showAnswer) {
              // Move to next card after showing answer
              console.log(currentCardIndex)
              setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length)
              setShowAnswer(false)
              return questionDuration
            } else {
              // Show answer after question duration
              setShowAnswer(true)
              return answerDuration
            }
          }
        })
      }
    }, 100)

    return () => clearInterval(timer)
  }, [flashcards, currentCardIndex, showAnswer, isPaused, questionDuration, answerDuration])


  const handleNextCard = useCallback(() => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length)
    setShowAnswer(false)
    setTimeRemaining(questionDuration)
  }, [flashcards.length, questionDuration])

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev)
  }, [])

  if (flashcards.length === 0) {
    return <div className="text-center p-4">Loading flashcards...</div>
  }

  const currentCard = flashcards[currentCardIndex]
  const currentDuration = showAnswer ? answerDuration : questionDuration
  const progressPercentage = (timeRemaining / currentDuration) * 100

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardBody className="p-6">
          <div className="flex flex-row justify-between mb-4 text-sm text-gray-500">
            <h1 className='text-3xl font-bold'>
              {showAnswer ? <span className='text-red-800'>Answer</span> : <span className='text-green-800'>Question</span>}
            </h1>
            <div>
            Card {currentCardIndex + 1} of {flashcards.length}
            </div>
          </div>

          <div className="min-h-[200px] flex items-center justify-center text-center">
            <h2 className="text-2xl font-bold">
              {showAnswer ? currentCard.answer : currentCard.question}
            </h2>
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            <Button onClick={togglePause} aria-label={isPaused ? "Resume" : "Pause"}>
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
            <Button onClick={handleNextCard} aria-label="Next card">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700" role="progressbar" aria-valuenow={timeRemaining} aria-valuemin={0} aria-valuemax={currentDuration}>
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-100 ease-linear" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="mt-2 text-center text-sm text-gray-500" aria-live="polite">
            Time remaining: {Math.ceil(timeRemaining / 1000)} seconds
          </div>
        </CardBody>
      </Card>
    </div>
  )
}