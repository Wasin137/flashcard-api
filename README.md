# Flashcards Web App

## Description

A small, interactive web app designed to help medical students memorize complex and often tedious medical knowledge more effectively. This project aims to make learning more engaging by organizing information into quick, accessible flashcards. Each flashcard will feature concise questions and answers, allowing students to review critical concepts efficiently, whether they’re on the go or preparing for exams. The app also incorporates spaced repetition, ensuring users can retain and recall information more easily over time.

## Tech Stack

- **Next.js 14**
- **KV Databases** (Upstash)
- **Next UI Components**
- **Tailwind CSS**

## Set-Up Instructions

### Step 1: Install Node.js

Make sure Node.js is installed. You can download it from [Node.js Official Website](https://nodejs.org/en).

### Step 2: Clone the Project

Clone this Git repository:
```bash
git clone https://github.com/Wasin137/flashcard-api
```

Navigate to the project folder:
```bash
cd flashcard-api
```

Install all necessary dependencies:
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env.local` file in the project root with the following variables to connect to your KV database:

```bash
KV_URL="redis://<your-secret>:<your-secret>@direct-koi-20121.upstash.io:6379"
KV_REST_API_URL="https://direct-koi-20121.upstash.io"
KV_REST_API_TOKEN="<your-secret>"
KV_REST_API_READ_ONLY_TOKEN="<your-secret>"
```

### Step 4: Start the App
Run the app locally with:

```bash
npm run dev
```

By default, the web app should be running on [http://localhost:3000](http://localhost:3000).

### Step 5: Navigate Through the App
- `/`: The index page where flashcards are displayed one by one. Default setup: 6 seconds for the question and 4 seconds for the answer
- `/manage`: A page to add or delete flashcards. **Note:** There is no login requirement, so be cautious with access.

## Customization

### Customize Flashcard Display Duration
To change the duration for questions and answers, edit the `flashcard-display.js` file located under `app/components`. You can adjust the following lines:

```js
const questionDuration = 6000 // Set the duration for the question (in milliseconds)
const answerDuration = 4000 // Set the duration for the answer (in milliseconds)
```

## Disclaimer

You are free to modify and compile this code without notifying me, but it is not allowed for commercial use.