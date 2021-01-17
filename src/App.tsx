import React, { FC, useState, useCallback } from 'react';
// import logo from './logo.svg';
import './App.css';
import { useImmer } from 'use-immer';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class ToDo {
  id: number = 0;
  content: string = "";

  constructor() {
  }
}

function useToDoService() {
  const [list, updateList] = useImmer<ToDo[]>([]);
  const [edit, setEdit] = useState<string>("");
  const [maxId, setMaxId] = useState<number>(0);

  const add = useCallback((value: string) => {
    if (value === "") {
      alert("不能為空。");
    }
    updateList(draft => {
      let toDo = new ToDo();
      toDo.id = maxId;
      toDo.content = value;
      draft.push(toDo);
      setEdit("");
      setMaxId(maxId + 1);
    });
  }, [updateList, setEdit, maxId, setMaxId]);

  const remove  = useCallback((id: number) => {
    const idx = list.findIndex(v => v.id === id);
    if (idx !== -1) {
      updateList(draft => {
        draft.splice(idx, 1);
      });
    }
  }, [updateList, list]);

  return {
    edit,
    setEdit,
    list,
    add,
    remove
  };
}

function App() {
  const toDoService = useToDoService();

  return (
    <div>
      <input type="text"
        value={toDoService.edit}
        onChange={e => toDoService.setEdit(e.target.value)} />
      <button onClick={e => toDoService.add(toDoService.edit)}>+</button>
      <ul>
        {toDoService.list.map((v, i) => {
          return (
            <li>
              {v.content}
              <button onClick={e => toDoService.remove(v.id)}>-</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
