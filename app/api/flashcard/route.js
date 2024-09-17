import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
    try {
        // Get the path to the JSON file
        const jsonDirectory = path.join(process.cwd(), 'public');
        const fileContents = await fs.readFile(jsonDirectory + '/flashcards.json', 'utf8');
        
        // Parse the JSON file
        const flashcards = JSON.parse(fileContents);

        // Return the flashcards as JSON
        return Response.json(flashcards);
    } catch (error) {
        console.error('Error reading flashcards:', error);
        return Response.json({
            error: 'Internal Server Error'
        }, { status: 500 });
    }
}