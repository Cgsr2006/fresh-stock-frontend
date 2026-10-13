type AnyFn = (...args: any[]) => Promise<any>;

export function createDynamicRepository<T extends object>(api: T, mock: T): T {
  const apiRepo = api as unknown as Record<string, AnyFn>;
  const mockRepo = mock as unknown as Record<string, AnyFn>;

  return new Proxy({} as T, {
    get(_, key: string) {
      return async (...args: any[]) => {
        try {
          const result = await apiRepo[key](...args);

          // nos "get", null significa que o back não respondeu
          if (result === null || (key.startsWith("get") && result == null)) {
            throw new Error("API indisponível");
          }

          return result;
        } catch {
          console.warn(`[repository] API falhou em "${key}", usando mock`);
          return mockRepo[key](...args);
        }
      };
    },
  });
}
