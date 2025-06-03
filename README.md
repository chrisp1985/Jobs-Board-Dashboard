# Job Board Tracker
## Background
This project builds on my knowledge of Spring Boot to create a CRUD application with access to a postgres database for managing job applications. The Spring Boot side is not really anything new, but the project introduces:

- NextJS
- Tailwind
- Authentication with JWT
- Turbopack
- Typescript

## NextJS Notes
### Why NextJS?
NextJS can help with server side rendering. My previous project used vite, and all rendering was done on the client at startup. In a small app this isn't a problem, but for production apps there is likely a need to get the UI elements rendered before displaying in the browser to mitigate the risk of poor responsiveness in the UI.

### 'use client'
All files are treated as server components by default. If you want a component to run in the browser and use hooks, you must explicitly mark it as a client component. The hooks
in use in page.tsx and JobForm.tsx are 'useState'.

## Tailwind Notes



## Execution
Run the Spring Boot service first, as well as the DB and Keycloak/KeycloakDB docker-compose files. Once this is running, run the nextJS service using npm run dev. Then navigate to http://localhost:3000.

Keycloak admin can be run via http://localhost:8081. To set up Keycloak, use the settings in the readme for Spring Boot.


---

# NextJS

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
