import { useState } from 'react';

type UseFsm = {
  initial: string;
  states: { [key: string]: { next: string; prev: string } };
};

const useFsm = (config: UseFsm) => {
  const [state, setState] = useState(config.initial);

  const nextState = config.states[state].next;
  const prevState = config.states[state].prev;

  const transition = {
    next: () => setState(nextState),
    prev: () => setState(prevState),
  };

  return { state, transition, nextState, prevState };
};

export { useFsm };
