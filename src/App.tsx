import React, { useReducer } from 'react';
import RecordForm from './Components/RecordForm/RecordForm';
import RecordTable from './Components/RecordTable/RecordTable';
import { formReducer, FormState } from './recordReducer/recordReducer';

const initialState: FormState = {
  entries: [],
  loading: false,
  errors: {},
};

const App: React.FC = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const addEntry = (entry: any) => {
    dispatch({ type: 'ADD_ENTRY', payload: entry });
  };

  return (
    <div>
      <RecordForm addEntry={addEntry} dispatch={dispatch} />
      <RecordTable entries={formState.entries} />
    </div>
  );
};

export default App;
