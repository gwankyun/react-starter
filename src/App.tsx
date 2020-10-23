import React, { FC, useState, useCallback } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Tabs, Input, Button } from 'antd';
import { Game } from './Game';
import { ToDo } from './ToDo';
import { useImmer } from 'use-immer';

const { TabPane } = Tabs;

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

interface ICheckBox {
  checked: boolean;
}

interface CheckBox extends ICheckBox {
  content: string;
}

const App: FC = () => {
  const [text, setText] = useState<string>("");
  // const [checked, setChecked] = useState<boolean>(false);
  const [checkedList, updateCheckedList] =
    useImmer<CheckBox[]>([
      { checked: false, content: "A" },
      { checked: false, content: "B" }
    ]);
  const [color, setColor] = useState<string>("#ffffff");
  const [date, setDate] = useState<string>("2020-02-20");
  const [radio, setRadio] = useState<string>("A");
  const [range, setRange] = useState<number>(50);

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
    <Tabs defaultActiveKey="4">
      <TabPane tab="游戲" key="1">
        <Game />
      </TabPane>
      <TabPane tab="待辦" key="2">
        <ToDo />
      </TabPane>
      <TabPane tab="控件" key="3">
        <Button onClick={() => alert('click')}>Button</Button>
        <Input />
      </TabPane>
      <TabPane tab="原生" key="4">
        <button onClick={() => alert('click')}>button</button>
        <hr />
        <label>
          單行文本框：
            <input type="text"
            value={text}
            onChange={e => setText(e.target.value)} />
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
            value={color}
            onChange={e => setColor(e.target.value)} />
        </label>
        <hr />
        <label>
          日期：
          <input type="date"
            value={date}
            onChange={e => setDate(e.target.value)} />
        </label>
        <hr />
        <label>
          單選按鈕：
          {["A", "B", "C", "D"].map((v) =>
            <div>
              <label>
                <input type="radio"
                  value={v}
                  checked={radio === v}
                  onChange={e => setRadio(e.target.value)} />
                {v}
              </label>
            </div>
          )}
        </label>
        <hr />
        <label>
          範圍：{range}
          <input type="range"
            min={0}
            max={100}
            value={range}
            onChange={e => setRange(parseInt(e.target.value))} />
        </label>
      </TabPane>
    </Tabs>
  );
};

export default App;
