import React, { useReducer, useState } from 'react';
import RecordTable from './Components/RecordTable/RecordTable';
import { recordReducer } from './recordReducer/recordReducer';
import RecordForm from './Components/RecordForm/RecordForm';
import './App.css'; 

export type Record = {
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
};

export type FormState = {
  entries: Record[];
  loading: boolean;
  errors: { [key: string]: string };
};

const initialState: FormState = {
  entries: [],
  loading: false,
  errors: {},
};

const App: React.FC = () => {
  const [formState, dispatch] = useReducer(recordReducer, initialState);
  const [showForm, setShowForm] = useState(false);

  const addEntry = (entry: Record) => {
    dispatch({ type: 'ADD_ENTRY', payload: entry });
  };

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div className="App">
      <h1>Record Management</h1>
      <button onClick={toggleForm}>
        {showForm ? 'Close Form' : 'Add New Record'}
      </button>

      {showForm && <RecordForm addEntry={addEntry} />}

      <RecordTable entries={formState.entries} />
    </div>
  );
};

export default App;
