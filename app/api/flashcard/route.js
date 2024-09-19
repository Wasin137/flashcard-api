import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export async function GET() {
  const flashcards = await kv.lrange('flashcards', 0, -1)
  return NextResponse.json(flashcards)
}

export async function POST(request) {
  const newCard = await request.json()
  newCard.id = Date.now().toString()
  await kv.rpush('flashcards', JSON.stringify(newCard))
  return NextResponse.json(newCard, { status: 201 })
}