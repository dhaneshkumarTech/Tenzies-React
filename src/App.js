import './App.css';
import Dice from './components/Dice';
import React, { useState } from 'react';
import { nanoid } from 'nanoid'

function App() {

  const counter = 0;
  const [dieValue, setDiceValue] = useState(randomNumArray());
  const [tenzies, setTenzies] = useState(false);

  React.useEffect(() => {
    const allHeld = dieValue.every(die => die.isHeld)
    const firstValue = dieValue[0].value
    const allSameValue = dieValue.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
    }
  }, [dieValue])

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

  const btnName = tenzies ? 'New Game' : 'Roll Dice';
  return (
    <main>
      <div className='about-game'>
        <h1 className='title'>Tenzies</h1>
        <p className='hint'>Roll untill all dice the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className='die-container'>
        {dieElements}
      </div>
      <button
        onClick={() => rollDie()}
        className='roll-btn'>
        {btnName}
      </button>
    </main>
  );
}

export default App;
