<div align="center">

<br />

# ✦ Quizly

### AI-Powered Quiz Platform

*Generate. Play. Learn.*

<br />

[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<br />

</div>

---

## Overview

**Quizly** is a full-stack AI-powered quiz platform that lets users instantly generate personalized quizzes on any topic. Built with a modern, type-safe stack, Quizly delivers a seamless experience from quiz creation to detailed performance analytics — all in a beautifully crafted, responsive interface.

Whether you want to test your knowledge on Node.js, World History, or Quantum Physics, Quizly has you covered in seconds.

---

## Screenshots

<br />

### 🏠 Landing Page
> Clean, minimal hero with a clear call to action — your quiz journey starts here.

![Landing Page](screenshots/landing.png)

<br />

### 📊 Dashboard
> A personalized hub showing your recent games, trending topics, and quick-start actions.

![Dashboard](screenshots/dashboard.png)

<br />

### 🧠 Quiz — MCQ Mode
> Distraction-free quiz interface with smooth animations, keyboard shortcuts, live timer, and score tracking.

![Quiz MCQ](screenshots/quiz.png)

<br />

### 📈 Statistics Page
> In-depth post-quiz breakdown with accuracy scores, time taken, and a full question-by-question review.

![Statistics](screenshots/statistics.png)

> **Note:** To display screenshots, create a `screenshots/` folder in your project root and add `landing.png`, `dashboard.png`, `quiz.png`, and `statistics.png`.

---

## Features

- **AI Quiz Generation** — Enter any topic and get a fully generated quiz in seconds, powered by Google Gemini
- **Two Quiz Modes** — Multiple Choice (MCQ) and Open-Ended question formats
- **Live Timer** — Track exactly how long each quiz takes
- **Real-Time Scoring** — Instant correct/incorrect feedback after every answer
- **Detailed Statistics** — Post-quiz analytics with accuracy percentage, time taken, and per-question breakdown
- **Authentication** — Secure sign-in with NextAuth.js (Google OAuth + credentials)
- **Topic Trending** — Tracks popular quiz topics across all users
- **Keyboard Navigation** — Press `1–4` to select answers, `Enter` to advance
- **Fully Responsive** — Optimized for mobile, tablet, and desktop
- **Smooth Animations** — Framer Motion powered transitions throughout

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Database ORM** | [Prisma](https://www.prisma.io/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/) |
| **AI Provider** | [Google Gemini](https://ai.google.dev/) (via `@google/genai`) |
| **Validation** | [Zod](https://zod.dev/) |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query) + [Axios](https://axios-http.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Date Utilities** | [date-fns](https://date-fns.org/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |

---

## Project Structure

```
quizly/
├── app/
│   ├── (auth)/              # Sign in / Sign up pages
│   ├── dashboard/           # User dashboard
│   ├── quiz/
│   │   └── [gameId]/        # MCQ & Open-ended game pages
│   ├── statistics/
│   │   └── [gameId]/        # Post-game analytics
│   ├── api/
│   │   ├── auth/            # NextAuth handlers
│   │   ├── game/            # Game creation & retrieval
│   │   ├── questions/       # AI question generation
│   │   ├── checkAnswer/     # Answer validation
│   │   └── endGame/         # Game completion
│   └── lib/
│       └── prisma.ts        # Prisma client singleton
├── components/
│   ├── statistics/          # Results, accuracy, time cards
│   ├── MCQ.tsx              # Multiple choice game component
│   ├── MCQCounter.tsx       # Live score counter
│   └── Button.tsx           # Shared button component
├── lib/
│   ├── ai.ts                # Gemini strict_output wrapper
│   ├── auth.ts              # NextAuth config
│   ├── utils.ts             # cn(), formatTimeDelta()
│   └── ENV_SECRETS.ts       # Environment variable loader
├── schemas/
│   ├── Question.schema.ts   # Zod schemas for questions
│   └── Quiz.schema.ts       # Zod schemas for quiz creation
├── prisma/
│   └── schema.prisma        # Database schema
└── middleware.ts             # Route protection
```

---

## Getting Started

### Prerequisites

- Node.js `18+`
- PostgreSQL database
- Google Gemini API key
- Google OAuth credentials (for authentication)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/quizly.git
cd quizly
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/quizly"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Google Gemini AI
AI_KEY="your-gemini-api-key"

# App
BACKEND_BASE_URL="http://localhost:3000"
```

**4. Set up the database**

```bash
npx prisma generate
npx prisma db push
```

**5. Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database Schema

Quizly uses three core models:

- **User** — Authenticated user accounts linked via NextAuth
- **Game** — Each quiz session with topic, type, start/end times
- **Questions** — Individual questions with answers, options, and correctness tracking
- **Topic_Count** — Tracks trending topics across all users

---

## Environment Variables Reference

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Secret key for NextAuth session encryption |
| `NEXTAUTH_URL` | Base URL of your application |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `AI_KEY` | Google Gemini API key |
| `BACKEND_BASE_URL` | Base URL for internal API calls |

---

## Deployment

Quizly is optimized for deployment on [Vercel](https://vercel.com/).

```bash
# Build for production
npm run build

# Start production server
npm start
```

Ensure all environment variables are configured in your Vercel project settings before deploying.

---

## Roadmap

- [ ] Leaderboards and global rankings
- [ ] Custom quiz sharing via link
- [ ] Open-ended answer grading improvements
- [ ] Quiz history and progress tracking over time
- [ ] Dark mode toggle
- [ ] More AI providers (OpenAI, Claude)
- [ ] Mobile app (React Native)

---

## Contributing

Contributions are welcome! Please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Contact

Have a question, suggestion, or just want to say hi?

**Krishna Sahu** — [krishna.sahu.work@gmail.com](mailto:krishna.sahu.work@gmail.com)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

<br />

Made with ♥ by **Krishna**

<br />

*If you found this project helpful, please consider giving it a ⭐*

</div>