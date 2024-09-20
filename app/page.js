import FlashcardDisplay from "./components/flashcard-display"

export default function FlashcardsPage() {
  return (
    <div className="container mx-auto">
      <div className="mx-5 my-2 p-2 rounded-3xl bg-gray-500">
        <h1 className="text-3xl font-bold text-center mt-6 text-white">Flashcards</h1>
        <p className="text-sm italic text-center text-white mb-2">contact: wasin.kamp@gmail.com</p>
      </div>
      <FlashcardDisplay />
    </div>
  )
}