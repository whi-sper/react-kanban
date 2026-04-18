import { useDroppable } from '@dnd-kit/core';
import type { Card as CardType, ColumnId } from '../types';
import { Card } from './Card';
import styles from './Column.module.css';

interface Props {
  id: ColumnId;
  label: string;
  cards: CardType[];
  onMove: (cardId: string, column: ColumnId) => void;
  onDelete: (cardId: string) => void;
}

export function Column({ id, label, cards, onMove, onDelete }: Props) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <section
      ref={setNodeRef}
      className={`${styles.column} ${isOver ? styles.over : ''}`}
      aria-label={`${label} column`}
    >
      <header className={styles.header}>
        <h2 className={styles.title}>{label}</h2>
        <span className={styles.count}>{cards.length}</span>
      </header>
      <div className={styles.list}>
        {cards.length === 0 ? (
          <p className={styles.empty}>No cards</p>
        ) : (
          cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onMove={onMove}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  );
}
