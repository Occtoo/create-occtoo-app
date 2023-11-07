# Product Listing App using React, Typescript and Occtoo

This template provides a React+Typescript boilerplate with minimal setup using Vite to get a React app working with **[Occtoo](https://www.occtoo.com)** as a data source for fetching and rendering product data.

**Docs:** https://docs.occtoo.com/

![/public/docs/occtoo-plp.png](/public/docs/occtoo-plp.png)

**Currently using these plugins:**

- [react-query](https://github.com/TanStack/query#readme) for data fetching
- [tailwindcss](https://github.com/tailwindlabs/tailwindcss#readme) for styling
- [react-router-dom](https://github.com/remix-run/react-router#readme) for routing
- [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen#readme) for generating Typescript client and types based on OpenAPI specification

## Running the app

### 1. Install dependencies

```bash
yarn install
```

or using npm:

```bash
npm install
```

### 2. Generate types and client

```bash
yarn codegen
```

or using npm:

```bash
npm run codegen
```

> [!NOTE]
> This command needs to be executed each time a change is made to the OpenAPI spec provided as input.

### 3. Start the app

```bash
yarn dev
```

or using npm:

```bash
npm run dev
```

## Vite

This template uses [Vite](https://vitejs.dev/) for development and building. Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects.
