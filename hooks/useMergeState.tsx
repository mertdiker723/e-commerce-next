import { useReducer } from 'react';

export function useMergeState<T>(initialState: T) {
  const [state, setState] = useReducer(
    (currentState: T, newState: Partial<T>) => ({ ...currentState, ...newState }),
    initialState
  );

  return [state, setState] as const;
}
