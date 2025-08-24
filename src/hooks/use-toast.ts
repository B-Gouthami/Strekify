import { useEffect } from 'react';

// Toast type
interface ToasterToast {
  id: string;
  message: string;
  open: boolean;
}

// Action types
type Action =
  | { type: 'ADD_TOAST'; toast: ToasterToast }
  | { type: 'REMOVE_TOAST'; toastId?: string };

// State interface
interface State {
  toasts: ToasterToast[];
}

// Initial state
const initialState: State = { toasts: [] };
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
const listeners: Array<(state: State) => void> = [];
let memoryState: State = initialState;

// Reducer function
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      };
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    default:
      return state;
  }
}

// Dispatch function
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

// Hook for usage
export function useToast() {
  useEffect(() => {
    const listener = (state: State) => {
      // You can implement what happens when the state changes here
      console.log(state);
    };
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }, []);

  const addToast = (message: string) => {
    const toastId = String(Date.now()); // Simple unique ID
    const toast: ToasterToast = { id: toastId, message, open: true };

    dispatch({ type: 'ADD_TOAST', toast });

    // Automatically remove the toast after a delay
    const timeout = setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', toastId });
    }, 3000);

    toastTimeouts.set(toastId, timeout);
  };

  return { addToast };
}
