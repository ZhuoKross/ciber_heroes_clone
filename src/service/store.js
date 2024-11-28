import { atom, createStore } from "jotai";


export const currentLevelAtom = atom("level_01");
export const curretPositionsPlayerAtom = atom(null);
export const emeniesDefeat = atom(null)
export const store = createStore(); 