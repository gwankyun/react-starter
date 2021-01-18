import React, { useState, useCallback } from 'react';
import './App.css';
import { useImmer } from 'use-immer';
import { produce } from 'immer';

interface ToDo {
  id: number;
  content: string;
  selected: boolean;
}

function useToDoService() {
  const [list, updateList] = useImmer<ToDo[]>([]);
  const [edit, setEdit] = useState<string>("");
  const [maxId, setMaxId] = useState<number>(0);

  const add = useCallback((value: string) => {
    if (value === "") {
      alert("不能為空。");
      return;
    }
    updateList(draft => {
      draft.push({ content: value, id: maxId, selected: false });
      setEdit("");
      setMaxId(maxId + 1);
    });
  }, [updateList, setEdit, maxId, setMaxId]);

  const remove  = useCallback((toDo: ToDo) => {
    const idx = list.findIndex(v => v.id === toDo.id);
    if (idx !== -1) {
      updateList(draft => {
        draft.splice(idx, 1);
      });
    }
  }, [updateList, list]);

  const mouseEnter = useCallback((toDo: ToDo) => {
    console.log(`mouseMove toDo: ${toDo.content} ${toDo.selected}`);
    const idx = list.findIndex(v => v.id === toDo.id);
    if (idx !== -1) {
      console.log(`yes`);
      updateList(draft => {
        draft[idx] = produce(toDo, draft => {
          draft.selected = true;
        });
      });
    }
  }, [list, updateList]);

  const mouseLeave = useCallback((toDo: ToDo) => {
    console.log(`mouseLeave toDo: ${toDo.content} ${toDo.selected}`);
    const idx = list.findIndex(v => v.id === toDo.id);
    if (idx !== -1) {
      updateList(draft => {
        draft[idx] = produce(toDo, draft => {
          draft.selected = false;
        });
      });
    }
  }, [list, updateList]);

  return {
    edit,
    setEdit,
    list,
    add,
    remove,
    mouseEnter,
    mouseLeave
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
            <li key={v.id}
              onMouseEnter={e => toDoService.mouseEnter(v)}
              onMouseLeave={e => toDoService.mouseLeave(v)}>
              {v.content}
              {v.selected &&
                <button onClick={e => toDoService.remove(v)}>-</button>
              }
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
