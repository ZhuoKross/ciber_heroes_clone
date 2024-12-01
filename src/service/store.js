import { atom, createStore } from "jotai";

export const playerIsOnDialogue = atom(false);
export const hasNotificationDisplayed = atom(false);
export const counterSuccessNotifications = atom(0);
export const currentLevelAtom = atom("level_01");
export const curretPositionsPlayerAtom = atom(null);
export const enemiesDefeated = atom([]);
export const isMusicPlaying = atom(false);
export const store = createStore(); 