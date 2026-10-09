````markdown name=README.md
# English Quest

A Duolingo-inspired English learning application with a personalised vocabulary bank, Chinese translation support, and a gamified quiz flow.

## Features in this starter
- Custom vocabulary entry form
- English-to-Chinese auto-translation trigger
- Reverse lookup for Chinese input
- Duolingo-style dashboard and navigation
- Quiz round with hearts and pronunciation audio
- PostgreSQL schema for `users`, `user_vocab`, and `user_stats`

## Stack
- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion

## Run locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create your environment file:
   ```bash
   cp .env.example .env.local
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000`

## Database schema
The schema is stored in `lib/schema.sql` and includes:
- `users`
- `user_vocab`
- `user_stats`

`user_vocab` stores the English term, the Chinese translation, and the mastery level for each word.

## Suggested next steps
- Connect to Supabase Auth for user accounts
- Save vocabulary entries to a real database
- Track mastery progression with spaced repetition
- Add daily challenge and streak persistence
- Expand the quiz engine with sentence building and listening tasks
````
