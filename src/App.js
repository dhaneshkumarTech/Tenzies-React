import './App.css';
import Dice from './components/Dice';
import React, { useState } from 'react';
import { nanoid } from 'nanoid'

function App() {

  const counter = 0;
  const [dieValue, setDiceValue] = useState(randomNumArray());

  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function randomNumArray() {
    let valueArr = [];
    for (let i = 0; i < 10; i++) {
      valueArr.push(
        generateDie())
    }
    return valueArr;
  }

  function holdDice(id) {
    setDiceValue(dieValue.map(die => {
      return die.id === id ?
        {
          ...die,
          isHeld: !die.isHeld
        }
        : die;
    }));
  }

  const dieElements = dieValue.map(die => {
    return (
      <Dice key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
    )
  });


  function rollDie() {
    setDiceValue(dieValue.map(die => {
      return die.isHeld ? die : generateDie()
    }
    ))
  }

  return (
    <main>
      <div className='die-container'>
        {dieElements}
      </div>
      <button
        onClick={() => rollDie()}
        className='roll-btn'>
        Roll
      </button>
    </main>
  );
}

export default App;
