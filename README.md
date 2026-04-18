# React Kanban

A small three-column Kanban board built with React + TypeScript + Vite. Cards carry a priority tag, move between columns via drag-and-drop or a per-card dropdown, and persist across refreshes via `localStorage`.

## Features

- **Three columns**: To Do, In Progress, Done
- **Priority tags**: `high` (red), `medium` (yellow), `low` (green)
- **Two ways to move a card**:
  - Drag-and-drop (pointer + keyboard, via `@dnd-kit/core`)
  - Per-card "Move to" `<select>` dropdown (accessible fallback)
- **Add card form** at the top: title + priority → creates a card in To Do
- **Delete card** button (`×`) on each card
- **Persistent state** in `localStorage` under key `kanban-cards-v1`
- **Corruption-safe load**: malformed or tampered storage is sanitized on read (non-array root → empty list; items with unknown `column` / bad fields are filtered out) and self-heals on the next write

## Stack

- React 19 + TypeScript
- Vite 7
- `@dnd-kit/core` + `@dnd-kit/sortable` for drag-and-drop
- CSS Modules for component-scoped styles
- `crypto.randomUUID()` for card IDs (no UUID dependency)

## Getting started

Requires Node.js ≥ 20.19 (Vite 7 engine requirement).

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # type-check + production build
npm run preview  # serve the built bundle
npm run lint     # eslint
```

## Project structure

```
src/
├── App.tsx                       # mounts <KanbanBoard />
├── main.tsx                      # React entry
├── index.css                     # reset + base styles
├── types.ts                      # Card, Priority, ColumnId, parseCards, type guards
├── hooks/
│   └── useLocalStorage.ts        # persisted state with optional validate()
└── components/
    ├── KanbanBoard.tsx           # root: state, DndContext, add form
    ├── Column.tsx                # droppable column
    ├── Card.tsx                  # draggable card + dropdown + delete
    └── AddCardForm.tsx           # title input + priority select
```

## Data model

```ts
type Priority = 'high' | 'medium' | 'low';
type ColumnId = 'todo' | 'inProgress' | 'done';

interface Card {
  id: string;
  title: string;
  priority: Priority;
  column: ColumnId;
}
```

The single source of truth is a `Card[]` in `KanbanBoard`, grouped per column by `useMemo`. Mutations (`addCard` / `moveCard` / `deleteCard`) all go through `setCards`, which triggers the `useLocalStorage` write effect.

## localStorage & validation

On load, `useLocalStorage` calls `parseCards` (a validator passed from `KanbanBoard`):

- If `JSON.parse` result is **not an array** → returns `[]`.
- Otherwise returns the array with malformed items filtered out — each card must have a `string` id, `string` title, a valid `priority`, and a known `column`.

Because the sanitized result is what goes back into state (and then back into storage on the next effect), bad data can't stably reproduce a crash — it gets cleaned up on the first render after load.
