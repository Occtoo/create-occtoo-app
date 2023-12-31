<p align="center">
  <picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://6519008.fs1.hubspotusercontent-na1.net/hub/6519008/hubfs/Logo-Occtoo-white.png?width=200&height=80&name=Logo-Occtoo-white.png">
  <img src="https://www.occtoo.com/hs-fs/hubfs/Logo-Occtoo-dark.png?width=200&height=80&name=Logo-Occtoo-dark.png" width="200" alt="Occtoo Logo">
</picture>
</p>

<h1 align="center">
  create-occtoo-app
</h1>

<p align="center">
  Scaffold a typesafe app using <a rel="noopener noreferrer" target="_blank" href="https://www.occtoo.com">Occtoo</a> as a data service.
</p>

<p align="center">
  Get started by running <code>npx @occtoo/create-app</code>
</p>

## Table of contents

- <a href="#about">Occtoo</a>
- <a href="#getting-started">Getting started</a>
- <a href="#templates">Templates</a>

<h2 id="about">Occtoo</h2>

Occtoo is an Experience Data Platform designed to accelerate the way companies create meaningful customer experiences across various touchpoints. Our platform is tailored to assist digital officers, marketers, and developers in transitioning to a new paradigm where they can dedicate less time to data integration and more time to unleashing their creative potential with data.

An Occtoo Destination offers one or more endpoints that allow you to query specific subsets of your data. It also encompasses facets and various mechanisms for fine-tuning queries by leveraging them.

For more in-depth information about how to query a destination, please refer to the [destination docs](https://docs.occtoo.com/docs/get-started/call-custom-destination/).

#### Links

- [Occtoo docs](https://docs.occtoo.com/)
- [React + Typescript article](https://docs.occtoo.com/docs/get-started/Examples/frontend-example)

<h2 id="getting-started">Getting Started</h2>

To scaffold an app, run one of the commands below and answer the command prompt questions:

```bash
npx @occtoo/create-app
```

```bash
bunx @occtoo/create-app
```

```bash
pnpm dlx @occtoo/create-app
```

For demo purposes, you can use the following url when asked to provide an Occtoo Destination:

```
https://global.occtoo.com/occtoodemo/occtooFrontEndDocumentation/v3/openapi
```

<h2 id="templates">Templates</h2>

### Next.js

Next.js is a React framework that enables server-side rendering and generating static websites. It also provides a great developer experience with features like hot module reloading, automatic code splitting, and more.

[Next.js docs](https://nextjs.org/docs)

### Vite

Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts:

- A dev server that serves your source files over native ES modules, with rich built-in features and astonishingly fast Hot Module Replacement (HMR).
- A build command that bundles your code with Rollup, pre-configured to output highly optimized static assets for production.

[Vite docs](https://vitejs.dev/guide/)

#### Packages

The packages used in the templates are:

- [TypeScript](https://typescriptlang.org) for type safety
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Tanstack Query](https://tanstack.com/query/latest) for data fetching
- [OpenAPI Typescript Codegen](https://github.com/ferdikoomen/openapi-typescript-codegen) for generating types from OpenAPI specs
