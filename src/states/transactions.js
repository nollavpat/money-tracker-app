import {atom} from 'jotai';

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const firstDay = new Date(year, month, 1);
const lastDay = new Date(year, month + 1, 0);

export const homeFromAtom = atom(firstDay);

export const homeToAtom = atom(lastDay);
