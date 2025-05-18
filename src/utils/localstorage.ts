const localStorageService = {
  set: <T>(key: string, value: T): void => {
    if (typeof window === "undefined") return;
    try {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (error) {
      console.error("Failed to save to localStorage", error);
    }
  },

  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === "undefined") return defaultValue;

    const item = localStorage.getItem(key);
    try {
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  remove: (key: string): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },

  clear: (): void => {
    if (typeof window === "undefined") return;
    localStorage.clear();
  },
};

export { localStorageService };
