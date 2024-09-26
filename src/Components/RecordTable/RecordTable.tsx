import React from 'react';

interface RecordTableProps {
  entries: any[];
}

const RecordTable: React.FC<RecordTableProps> = ({ entries }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Field 1</th>
          <th>Field 2</th>
          <th>Field 3</th>
          <th>Field 4</th>
          <th>Field 5</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, index) => (
          <tr key={index}>
            <td>{entry.field1}</td>
            <td>{entry.field2}</td>
            <td>{entry.field3}</td>
            <td>{entry.field4}</td>
            <td>{entry.field5}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecordTable;
