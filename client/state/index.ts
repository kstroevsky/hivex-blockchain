import { createEvent, createStore } from 'effector';
import { Mode } from './types';

export const toggleMode = createEvent<Mode>();

export const $mode = createStore<Mode>('dark').on(toggleMode, (state, newMode) => newMode);
