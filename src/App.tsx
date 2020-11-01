import React, { FC, useState, useCallback } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Tabs, Input, Button } from 'antd';
import { Game } from './Game';
import { ToDo } from './ToDo';
// import { useImmer } from 'use-immer';
import { range } from "rxjs";
import { map, filter } from "rxjs/operators";
import { Native } from './Native';
import { RxJS } from './RxJS';

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

const App: FC = () => {
  // const [checked, setChecked] = useState<boolean>(false);

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
        <Native />
      </TabPane>
      <TabPane tab="RxJS" key="5">
        <RxJS />
        {/* <button onClick={_ => {
          range(1, 200)
            .pipe(
              filter(x => x % 2 === 1),
              map(x => x + x)
            )
            .subscribe(x => console.log(x));
        }}>RxJS</button> */}
      </TabPane>
    </Tabs>
  );
};

export default App;
