

export interface FormState {
  entries: any[];
  loading: boolean;
  errors: Record<string, string>;
}

export type Action =
  | { type: 'ADD_ENTRY'; payload: any }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERRORS'; payload: Record<string, string> };

export const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case 'ADD_ENTRY':
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};
