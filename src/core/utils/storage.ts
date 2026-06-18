const STORAGE_PREFIX = "aneira-game";

export function getStorageBoolean(key: string, fallback: boolean): boolean {
  try {
    const value = window.localStorage.getItem(`${STORAGE_PREFIX}:${key}`);
    if (value === null) {
      return fallback;
    }

    return value === "true";
  } catch {
    return fallback;
  }
}

export function setStorageBoolean(key: string, value: boolean): void {
  try {
    window.localStorage.setItem(`${STORAGE_PREFIX}:${key}`, String(value));
  } catch {
    // Ignore storage failures so the app keeps working in restricted contexts.
  }
}

export function getStorageString(key: string, fallback: string): string {
  try {
    const value = window.localStorage.getItem(`${STORAGE_PREFIX}:${key}`);
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
}

export function setStorageString(key: string, value: string): void {
  try {
    window.localStorage.setItem(`${STORAGE_PREFIX}:${key}`, value);
  } catch {
    // Ignore storage failures so the app keeps working in restricted contexts.
  }
}
