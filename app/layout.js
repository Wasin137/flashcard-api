import "./globals.css";
import {Providers} from "./providers";

export const metadata = {
  title: "Flashcards for Medical Students",
  description: "A small, interactive web app designed to help medical students memorize complex and often tedious medical knowledge more effectively. This project aims to make learning more engaging by organizing information into quick, accessible flashcards. Each flashcard will feature concise questions and answers, allowing students to review critical concepts efficiently, whether they’re on the go or preparing for exams. The app also incorporates spaced repetition, ensuring users can retain and recall information more easily over time. ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
