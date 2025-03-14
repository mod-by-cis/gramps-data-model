
export async function processEachFiles<T, Args extends unknown[]>(
  files: T[],
  operations: ((file: T, delay: number, ...args: unknown[]) => Promise<void>)[],
  delay: number,
  ...args: Args
): Promise<void> {
  for (const file of files) {
    for (const operation of operations) {
      await operation(file, delay, ...args);
    }
  }
}
