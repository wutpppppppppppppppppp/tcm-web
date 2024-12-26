# tcm-web

A production-ready Next.js catalog website with built-in authentication and monitoring.

## Features

- ⚡ [Next.js](https://nextjs.org) 15 with App Router
- 🔒 Authentication with [Clerk](https://clerk.com)
- 🌐 i18n with next-intl and Crowdin
- ✅ Type safety with TypeScript
- 🎨 UI with Tailwind CSS
- 🧪 Testing with Vitest
- 📝 Logging with Pino.js
- 🔍 Error monitoring with Sentry
- ☂️ Code coverage with Codecov
- 🔐 Security with Arcjet

## Getting Started

1. Clone the repository:

    ```sh
    git clone https://github.com/wutpppppppppppppppppp/tcm-web
    cd my-project
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Copy `.env` to

    .env.local and configure your environment variables

4. Start the development server:

    ```sh
    npm run dev
    ```

Visit <http://localhost:3000> to see your application.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run unit tests
- `npm run lint` - Run linter

## Project Structure

```
src/
  ├── app/           # Next.js App Router routes
  ├── components/    # React components
  ├── libs/          # External library configs
  ├── models/        # Database models
  ├── locales/       # i18n translations
  └── utils/         # Utility functions
```

## Documentation

For detailed setup and configuration instructions, see:

- [Authentication Setup](https://github.com/ixartz/Next-js-Boilerplate#set-up-authentication)
- [Database Setup](https://github.com/ixartz/Next-js-Boilerplate#set-up-remote-database)
- [i18n Setup](https://github.com/ixartz/Next-js-Boilerplate#translation-i18n-setup)
- [Deployment Guide](https://github.com/ixartz/Next-js-Boilerplate#deploy-to-production)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
