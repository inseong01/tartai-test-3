# Project

Admin frontend for education expense settlement service.

## Stack

Next.js 16 (App Router)
React 19
TypeScript
Tailwind CSS v4
Deploy: Vercel

## Architecture

features/{feature}/
ui/\* → pure UI components (props only)
{feature}.tsx → client logic (state, handlers, API)

## File Placement

New features must be created under:

src/features/{feature}/

UI components:

src/features/{feature}/ui/

Shared components:

src/components/

Do not create new top-level folders in src.
Follow existing patterns in the repository.

## Client Components

Files using state, event handlers, or browser APIs must include:

"use client"

## UI Components

shadcn/ui components are located in:

src/components/ui/

## Styling

Design tokens are defined in:

src/styles/tokens.css

## Naming

files, components: kebab-case
css variables: --kebab-case

## Types

React 19: avoid `FormEvent`.

Use:

ComponentProps<"form">["onSubmit"]
