import FlashcardDisplay from "../components/flashcard-display"

export default function FlashcardsPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">Flashcards</h1>
      <FlashcardDisplay />
    </div>
  )
}