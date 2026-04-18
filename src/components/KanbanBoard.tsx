import { useCallback, useMemo } from 'react';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import type { Card as CardType, ColumnId, Priority } from '../types';
import { COLUMNS, STORAGE_KEY, isColumnId } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { AddCardForm } from './AddCardForm';
import { Column } from './Column';
import styles from './KanbanBoard.module.css';

export function KanbanBoard() {
  const [cards, setCards] = useLocalStorage<CardType[]>(STORAGE_KEY, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor),
  );

  const cardsByColumn = useMemo(() => {
    const grouped: Record<ColumnId, CardType[]> = {
      todo: [],
      inProgress: [],
      done: [],
    };
    for (const card of cards) grouped[card.column].push(card);
    return grouped;
  }, [cards]);

  const addCard = useCallback(
    (title: string, priority: Priority) => {
      const newCard: CardType = {
        id: crypto.randomUUID(),
        title,
        priority,
        column: 'todo',
      };
      setCards((prev) => [...prev, newCard]);
    },
    [setCards],
  );

  const moveCard = useCallback(
    (id: string, column: ColumnId) => {
      setCards((prev) =>
        prev.map((card) =>
          card.id === id && card.column !== column ? { ...card, column } : card,
        ),
      );
    },
    [setCards],
  );

  const deleteCard = useCallback(
    (id: string) => {
      setCards((prev) => prev.filter((card) => card.id !== id));
    },
    [setCards],
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (!isColumnId(over.id)) return;
    moveCard(String(active.id), over.id);
  };

  return (
    <div className={styles.board}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Kanban Board</h1>
      </header>
      <AddCardForm onAdd={addCard} />
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className={styles.columns}>
          {COLUMNS.map((col) => (
            <Column
              key={col.id}
              id={col.id}
              label={col.label}
              cards={cardsByColumn[col.id]}
              onMove={moveCard}
              onDelete={deleteCard}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
