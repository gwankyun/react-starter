import React, { FC, useState, useCallback } from 'react';
import { List, Input, Button } from 'antd';
import { useImmer } from 'use-immer';

interface ToDoItem {
  content: string;
  id: number;
}

export const ToDo: FC = () => {
  const [value, setValue] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [content, updateContent] = useImmer<ToDoItem[]>([]);

  const onAdd = useCallback((value: string) => {
    updateContent(draft => {
      if (value !== "") {
        draft.push({ content: value, id: index });
        setValue("");
        setIndex(index + 1);
      };
    });
  }, [updateContent, index]);

  const onRemove = useCallback((index: number) => {
    const idx = content.findIndex(i => i.id === index);
    if (idx !== -1) {
      updateContent(draft => {
        draft.splice(idx, 1);
      });
    }
  }, [updateContent, content]);

  return (
    <div>
      <Input value={value} onChange={e => setValue(e.target.value)} />
      <Button onClick={_ => onAdd(value)}>+</Button>
      <List
        dataSource={content}
        renderItem={i =>
          <div>
            {i.content}
            <Button onClick={_ => onRemove(i.id)}>-</Button>
          </div>
        }
      />
    </div>
  );
};
