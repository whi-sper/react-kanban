export type Priority = 'high' | 'medium' | 'low';
export type ColumnId = 'todo' | 'inProgress' | 'done';

export interface Card {
  id: string;
  title: string;
  priority: Priority;
  column: ColumnId;
}

export const COLUMNS: { id: ColumnId; label: string }[] = [
  { id: 'todo', label: 'To Do' },
  { id: 'inProgress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
];

export const COLUMN_IDS: ColumnId[] = COLUMNS.map((c) => c.id);

export const PRIORITIES: { value: Priority; label: string }[] = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export const STORAGE_KEY = 'kanban-cards-v1';

export function isColumnId(value: unknown): value is ColumnId {
  return typeof value === 'string' && (COLUMN_IDS as string[]).includes(value);
}

const PRIORITY_SET = new Set<Priority>(['high', 'medium', 'low']);

function isPriority(value: unknown): value is Priority {
  return typeof value === 'string' && PRIORITY_SET.has(value as Priority);
}

function isCard(value: unknown): value is Card {
  if (value === null || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === 'string' &&
    typeof v.title === 'string' &&
    isPriority(v.priority) &&
    isColumnId(v.column)
  );
}

export function parseCards(raw: unknown): Card[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(isCard);
}
