export function useWait(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}
