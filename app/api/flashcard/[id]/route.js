import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  const id = params.id;
  const flashcards = await kv.lrange('flashcards', 0, -1);
  const updatedFlashcards = flashcards.filter(card => card.id !== id);
  
  await kv.del('flashcards');
  
  if (updatedFlashcards.length > 0) {
    await kv.rpush('flashcards', ...updatedFlashcards);
  }
  
  return NextResponse.json({ message: 'Flashcard deleted' }, { status: 200 });
}