import { useState } from 'react';
import type { Priority } from '../types';
import { PRIORITIES } from '../types';
import styles from './AddCardForm.module.css';

interface Props {
  onAdd: (title: string, priority: Priority) => void;
}

export function AddCardForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed, priority);
    setTitle('');
    setPriority('medium');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="New card title…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="New card title"
      />
      <select
        className={styles.select}
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        aria-label="Priority"
      >
        {PRIORITIES.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
      <button className={styles.button} type="submit" disabled={!title.trim()}>
        Add card
      </button>
    </form>
  );
}
