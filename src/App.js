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

 
  const dieElements = dieValue.map(die => {
    return (
      <Dice key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
    )
  });


  function rollDie() {
    counter++;
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
