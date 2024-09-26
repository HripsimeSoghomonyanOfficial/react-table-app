export type Action = 
  | { type: 'ADD_ENTRY'; payload: any };

export const recordReducer = (state: any, action: Action) => {
  switch (action.type) {
    case 'ADD_ENTRY':
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    default:
      return state;
  }
};
