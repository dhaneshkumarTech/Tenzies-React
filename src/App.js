import './App.css';
import Dice from './components/Dice';
import React, { useState } from 'react';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dieValue, setDiceValue] = useState(randomNumArray());
  const [tenzies, setTenzies] = useState(false);
  const [count, setCount] = useState(0);
  const [highScore, setHighScore] = useState(0);


  React.useEffect(() => {
    const allHeld = dieValue.every(die => die.isHeld)
    const firstValue = dieValue[0].value
    const allSameValue = dieValue.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
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
  const counter = 0;

  function rollDie() {

    if (!tenzies) {

      setCount(count + 1)
      setDiceValue(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateDie()
      }))
    } else {
      setCount(0)
      setTenzies(false)
      setDiceValue(randomNumArray())
    }
  }

  const btnName = tenzies ? 'New Game' : 'Roll Dice';
  return (
    <main>

      {tenzies && <Confetti />}
      <div className='about-game'>
        <h1 className='title'>Tenzies</h1>
        <p className='hint'>Roll untill all dice the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className='die-container'>
        {dieElements}
      </div>
      <div className='game-fact'>
        <span className='rolls'>Min: rolls {highScore}</span>
        <button
          onClick={() => rollDie()}
          className='roll-btn'>
          {btnName}
        </button>
        <span className='your-rolls'>No. of rolls: {count}</span>

      </div>


    </main>
  );
}

export default App;

