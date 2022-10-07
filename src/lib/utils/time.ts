export function isPassed(date: number): boolean {
  return new Date(date) < new Date();
}

// Return a string of the date in the format of exemple : lun. 5 nov
// Language: typescript
// Path: src/lib/utils/time.ts
export function formatDate(time: number): string {
  const date = new Date(time);
  return date.toLocaleString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

// Return a string of the date in the format of exemple : 22:00
// Language: typescript
// Path: src/lib/utils/time.ts
export function formatTime(time: number): string {
  const date = new Date(time);
  return date.toLocaleString("fr-FR", {
    hour: "numeric",
    minute: "numeric",
  });
}