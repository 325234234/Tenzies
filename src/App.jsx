import Die from './components/Die'
import Confetti from 'react-confetti'

import { useEffect, useState } from 'react'

export default function App() {
  const [dice, setDice] = useState(() => newDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    let winningDie = dice[0].value
    if(dice.every(die => die.isHeld && die.value === winningDie)) {
      setTenzies(true)
    }    
  }, [dice])

  function newDice() {
    const newDice = []

    for(let i=0; i<10; i++) {
      newDice.push(getRandomDie())
    }

    return newDice
  }

  function handleClick() {
    if(tenzies) {
      setTenzies(false)
      setDice(newDice)
    } else {
      setDice(prevDice => prevDice.map(die => die.isHeld ? die : getRandomDie()))
    }
  }

  function getRandomDie() {
    return {
              id: Math.random().toFixed(12).toString().slice(2),
              value: Math.ceil(Math.random()*6),
              isHeld: false
            }
  }

  function holdDie(id) {
    setDice(prevDice => prevDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die))
  }

  const diceElements = dice.map(die => {
    return (
      <Die key={die.id} id={die.id} value={die.value} isHeld={die.isHeld} onClick={() => holdDie(die.id)}/>
    )
  })

  return (
    <main>
      {tenzies && <Confetti width={window.innerWidth} height={window.innerHeight}/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click a die to keep it.</p>
      <div className="diceContainer">
        {diceElements}
      </div>
      <button onClick={handleClick}>{tenzies ? "Restart" : "Roll"}</button>
    </main>
  )
}