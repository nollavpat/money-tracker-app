import {atom} from 'jotai';

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const firstDay = new Date(year, month, 1);
const lastDay = new Date(year, month + 1, 0);

export const homeFrom = atom(firstDay);

export const homeTo = atom(lastDay);
