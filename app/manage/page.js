'use client'

import { useState, useEffect } from 'react'
import { Button } from '@nextui-org/react'
import { Input } from '@nextui-org/react'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'

export default function FlashcardManager() {
  const [flashcards, setFlashcards] = useState([]);
  const [newCard, setNewCard] = useState({ question: '', answer: '' });

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    const response = await fetch('/api/flashcard');
    const data = await response.json();
    setFlashcards(data);
  };

  const handleInputChange = (e) => {
    setNewCard({ ...newCard, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/flashcard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCard),
    });
    setNewCard({ question: '', answer: '' });
    fetchFlashcards();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/flashcard/${id}`, { method: 'DELETE' });
    fetchFlashcards();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Flashcard Manager V0.1 (Vercel KV)</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2 mb-2">
          <Input
            type="text"
            name="question"
            value={newCard.question}
            onChange={handleInputChange}
            placeholder="Question"
            required
            aria-label="Question"
          />
          <Input
            type="text"
            name="answer"
            value={newCard.answer}
            onChange={handleInputChange}
            placeholder="Answer"
            required
            aria-label="Answer"
          />
        </div>
        <Button type="submit">Add Flashcard</Button>
      </form>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {flashcards.map((card) => (
          <Card key={card.id}>
            <CardHeader>
              <span className='text-xl text-green-800 font-bold'>Q: {card.question}</span>
            </CardHeader>
            <CardBody>
              <p>A: {card.answer}</p>
            </CardBody>
            <CardFooter>
              <Button color="danger" onClick={() => handleDelete(card.id)}>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
