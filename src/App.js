import React, { useState } from 'react';
import Form from './Form';
import List from './List';
import Task from './Task';

const mock = [
  { text: 'Task 1', isChecked: true, id: 1 },
  { text: 'Task 2', isChecked: false, id: 2 },
];

const renderTasks = (tasks) =>
  tasks.map(({ id, text, isChecked }) => (
    <li key={id}>
      <Task text={text} isChecked={isChecked} />
    </li>
  ));

const App = () => {
  const [tasks, setTasks] = useState(mock);

  return (
    <div>
      <Form />
      <List>{renderTasks(tasks)}</List>
    </div>
  );
};

export default App;
