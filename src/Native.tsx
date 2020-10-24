import React, { FC, useState, useCallback } from 'react';
import { useImmer } from 'use-immer';

interface ICheckBox {
  checked: boolean;
}

interface CheckBox extends ICheckBox {
  content: string;
}

export const Native: FC = () => {
  const [textValue, setTextValue] = useState<string>("");
  const [colorValue, setColorValue] = useState<string>("#ffffff");
  const [dateValue, setDateValue] = useState<string>("2020-02-20");
  const [radioValue, setRadioValue] = useState<string>("A");
  const [rangeValue, setRangeValue] = useState<number>(50);
  const [datetimeLocalValue, setDatetimeLocalValue] = useState<string>("2018-06-12T19:30");
  const [monthValue, setMonthValue] = useState<string>("2020-02");
  const [checkedList, updateCheckedList] =
    useImmer<CheckBox[]>([
      { checked: false, content: "A" },
      { checked: false, content: "B" }
    ]);

  const onCheckBoxChange = useCallback((v: CheckBox): void => {
    const index = checkedList.findIndex(i => i.content === v.content);
    if (index !== -1) {
      updateCheckedList(draft => {
        const checked = draft[index].checked;
        draft[index].checked = !checked;
      });
    }
  }, [checkedList, updateCheckedList]);

  return (
    <div>
      <button onClick={() => alert('click')}>button</button>
      <hr />
      <label>
        單行文本框：
            <input type="text"
          value={textValue}
          onChange={e => setTextValue(e.target.value)} />
      </label>
      <hr />
      <ul>
        {[1, 2, 3, 4, 5].map((v, i) =>
          <li key={i}>{v}</li>
        )}
      </ul>
      <hr />
      <label>
        複選按鈕：
          {checkedList.map((v) =>
          <label>
            <input type="checkbox"
              checked={v.checked}
              onChange={_ => onCheckBoxChange(v)} />
            {v.content}
          </label>)
        }
      </label>
      <hr />
      <label>
        顏色：
            <input type="color"
          value={colorValue}
          onChange={e => setColorValue(e.target.value)} />
      </label>
      <hr />
      <label>
        日期：
          <input type="date"
          value={dateValue}
          onChange={e => setDateValue(e.target.value)} />
      </label>
      <hr />
      <label>
        單選按鈕：
          {["A", "B", "C", "D"].map((v) =>
          <div>
            <label>
              <input type="radio"
                value={v}
                checked={radioValue === v}
                onChange={e => setRadioValue(e.target.value)} />
              {v}
            </label>
          </div>
        )}
      </label>
      <hr />
      <label>
        範圍：{rangeValue}
        <input type="range"
          min={0}
          max={100}
          value={rangeValue}
          onChange={e => setRangeValue(parseInt(e.target.value))} />
      </label>
      <hr />
      <label>
        日期與時期：
          <input type="datetime-local"
          value={datetimeLocalValue}
          onChange={e => setDatetimeLocalValue(e.target.value)} />
      </label>
      <hr />
      <label>
        月份：
          <input type="month"
          value={monthValue}
          onChange={e => setMonthValue(e.target.value)} />
      </label>
    </div>
  );
};
