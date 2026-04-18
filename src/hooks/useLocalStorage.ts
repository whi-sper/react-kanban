import { useEffect, useState } from 'react';

interface Options<T> {
  /**
   * Validate/coerce the raw JSON-parsed value. If omitted, the raw value is
   * cast to T without checks. Return `initial` (or any safe default) for bad
   * data; the sanitized result is what we hold in state, so downstream code
   * never sees corrupt localStorage data.
   */
  validate?: (raw: unknown) => T;
}

export function useLocalStorage<T>(
  key: string,
  initial: T,
  options: Options<T> = {},
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const { validate } = options;

  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return initial;
      const parsed: unknown = JSON.parse(raw);
      return validate ? validate(parsed) : (parsed as T);
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore quota / serialization errors
    }
  }, [key, value]);

  return [value, setValue];
}
