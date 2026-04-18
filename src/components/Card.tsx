import { useDraggable } from '@dnd-kit/core';
import type { Card as CardType, ColumnId } from '../types';
import { COLUMNS } from '../types';
import styles from './Card.module.css';

interface Props {
  card: CardType;
  onMove: (id: string, column: ColumnId) => void;
  onDelete: (id: string) => void;
}

export function Card({ card, onMove, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: card.id });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <article
      ref={setNodeRef}
      className={`${styles.card} ${isDragging ? styles.dragging : ''}`}
      style={style}
    >
      <div
        className={styles.dragHandle}
        {...listeners}
        {...attributes}
        aria-label={`Drag card: ${card.title}`}
      >
        <div className={styles.header}>
          <span
            className={`${styles.priority} ${styles[`priority_${card.priority}`]}`}
          >
            {card.priority}
          </span>
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(card.id);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label={`Delete card: ${card.title}`}
          >
            ×
          </button>
        </div>
        <h3 className={styles.title}>{card.title}</h3>
      </div>

      <label className={styles.moveLabel}>
        <span className={styles.moveLabelText}>Move to</span>
        <select
          className={styles.moveSelect}
          value={card.column}
          onChange={(e) => onMove(card.id, e.target.value as ColumnId)}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label={`Move card "${card.title}" to another column`}
        >
          {COLUMNS.map((col) => (
            <option key={col.id} value={col.id}>
              {col.label}
            </option>
          ))}
        </select>
      </label>
    </article>
  );
}
