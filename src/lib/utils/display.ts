import type { SystemTime } from "$lib/types/game";
import { Stage } from "$lib/types/game";

export function isPassed(time: SystemTime): boolean {
  return new Date(time.secs_since_epoch * 1000) < new Date();
}

// Return a string of the date in the format of exemple : lun. 5 nov
export function formatDate(time: SystemTime): string {
  const date = new Date(time.secs_since_epoch * 1000);
  return date.toLocaleString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

// Return a string of the date in the format of exemple : 22:00
export function formatTime(time: SystemTime): string {
  const date = new Date(time.secs_since_epoch * 1000);
  return date.toLocaleString("fr-FR", {
    hour: "numeric",
    minute: "numeric",
  });
}

export function sysTimeToDate(time: SystemTime): Date {
  return new Date(time.secs_since_epoch * 1000);
}

export function displayStage(stage: Stage): string {
  switch (stage) {
    case Stage.Group:
      return 'Poule';
    case Stage.Sixteen:
      return 'Huitième';
    case Stage.Quarter:
      return 'Quart';
    case Stage.Semi:
      return 'Demi';
    case Stage.Final:
      return 'Finale';
  }
}