import { renderHook } from '@testing-library/react-hooks';

import { useFsm } from './useFsm';

enum State {
  STATE_1 = 'STATE_1',
  STATE_2 = 'STATE_2',
  STATE_3 = 'STATE_3',
}

const fsmConfig = {
  initial: State.STATE_1,
  states: {
    [State.STATE_1]: { prev: State.STATE_3, next: State.STATE_2 },
    [State.STATE_2]: { prev: State.STATE_1, next: State.STATE_3 },
    [State.STATE_3]: { prev: State.STATE_2, next: State.STATE_1 },
  },
};

describe('useFsm', () => {
  it('should initialize with STATE_1', () => {
    const { result } = renderHook(() => useFsm(fsmConfig));

    expect(result.current.state).toBe(State.STATE_1);
    expect(result.current.nextState).toBe(State.STATE_2);
    expect(result.current.prevState).toBe(State.STATE_3);
  });

  it('should transition next from STATE_1 to STATE_2', () => {
    const { result } = renderHook(() => useFsm(fsmConfig));
    result.current.transition.next();

    expect(result.current.state).toBe(State.STATE_2);
    expect(result.current.nextState).toBe(State.STATE_3);
    expect(result.current.prevState).toBe(State.STATE_1);
  });

  it('should transition prev from STATE_1 to STATE_3', () => {
    const { result } = renderHook(() => useFsm(fsmConfig));
    result.current.transition.prev();

    expect(result.current.state).toBe(State.STATE_3);
    expect(result.current.nextState).toBe(State.STATE_1);
    expect(result.current.prevState).toBe(State.STATE_2);
  });

  it('should transition next from STATE_2 to STATE_3', () => {
    const { result } = renderHook(() =>
      useFsm({ ...fsmConfig, initial: State.STATE_2 })
    );
    result.current.transition.next();

    expect(result.current.state).toBe(State.STATE_3);
    expect(result.current.nextState).toBe(State.STATE_1);
    expect(result.current.prevState).toBe(State.STATE_2);
  });

  it('should transition prev from STATE_2 to STATE_1', () => {
    const { result } = renderHook(() =>
      useFsm({ ...fsmConfig, initial: State.STATE_2 })
    );
    result.current.transition.prev();

    expect(result.current.state).toBe(State.STATE_1);
    expect(result.current.nextState).toBe(State.STATE_2);
    expect(result.current.prevState).toBe(State.STATE_3);
  });

  it('should transition next from STATE_3 to STATE_1', () => {
    const { result } = renderHook(() =>
      useFsm({ ...fsmConfig, initial: State.STATE_3 })
    );
    result.current.transition.next();

    expect(result.current.state).toBe(State.STATE_1);
    expect(result.current.nextState).toBe(State.STATE_2);
    expect(result.current.prevState).toBe(State.STATE_3);
  });

  it('should transition prev from STATE_3 to STATE_2', () => {
    const { result } = renderHook(() =>
      useFsm({ ...fsmConfig, initial: State.STATE_3 })
    );
    result.current.transition.prev();

    expect(result.current.state).toBe(State.STATE_2);
    expect(result.current.nextState).toBe(State.STATE_3);
    expect(result.current.prevState).toBe(State.STATE_1);
  });
});
