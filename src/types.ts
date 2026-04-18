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
