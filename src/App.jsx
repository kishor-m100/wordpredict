import  {useState} from 'react'
import {clsx} from "clsx"
import { languages } from './language'
import confetti from "canvas-confetti";

// import Confetti from 'react-confetti'
import { useEffect } from "react";
export default function AssemblyEndgame(){
  // State values
  const[currentWord , setCurrentWord]= useState("react");
  const[guessedLetters,setGuessedLetters] = useState([]);
  const [wrongGuessCount, setWrongGuessCount] = useState(0);

      // Derived values
    //     const wrongGuessCount = 
    //     guessedLetters.filter(letter => !currentWord.includes(letter)).length   //it stores number of wrong guesses put it  in the array 
    // console.log(wrongGuessCount)

    
    // Static values
  const alphabet ="abcdefghijklmnopqrstuvwxyz"
  const languageElements=languages.map(
    (lang,index)=>{
      const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        // const className = clsx("chip", wrongGuessCount > index && "lost")     another way to write
      return(
         <span style={styles} id={lang.name} className={`chip ${wrongGuessCount > index ? 'lost' : ''}`}>{lang.name}</span>   //write the classname={className}
      )
    }
  )
  function addGuessedLetters(letter){
      setGuessedLetters(prevLetters =>
        prevLetters.includes(letter) ? prevLetters : [...prevLetters,letter])

        if (!currentWord.includes(letter)) {
          setWrongGuessCount(prevCount => prevCount + 1);
        }
  }

  const letterElements = currentWord.split("").map((letter,index)=>(
    <span key={index}>{guessedLetters.includes(letter)?letter.toUpperCase():""}</span>
  ))
 
  const keyboardElements=alphabet.split("").map(letter=>{
    const isGuessed=guessedLetters.includes(letter)
    const isCorrect= isGuessed && currentWord.includes(letter)
    const isWrong=  isGuessed && !currentWord.includes(letter)

    const className=clsx(
      {
        correct: isCorrect,
        wrong: isWrong
      }
    )
      console.log(wrongGuessCount)
  
    return(
    <button key={letter} className={className}
      onClick={()=>addGuessedLetters(letter)}>{letter.toUpperCase()
      }
      </button>
    )
  }  
  )
  const isGamewon = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= languages.length-1
  const isGameOver = isGamewon || isGameLost

  const gameStatusClass=clsx("game-status",{
    won: isGamewon,
    lost: isGameLost
  })
  // function renderGameStatus() {
  //       if (!isGameOver) {
  //           return null
  //       }

  //       if (isGameWon) {
  //           return (
  //               <>
  //                   <h2>You win!</h2>
  //                   <p>Well done! 🎉</p>
  //               </>
  //           )
  //       } else {
  //           return (
  //               <>
  //                   <h2>Game over!</h2>
  //                   <p>You lose! Better start learning Assembly 😭</p>
  //               </>
  //           )
  //       }
  // }


//firework confetti
  useEffect(() => {
  if (!isGamewon) return;

  const duration = 2 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}, [isGamewon]);


  return(
      <main>
      {/* {isGamewon && <Confetti />} */}
        <header>
          <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the 
                programming world safe from Assembly!</p>
        </header>
        <section className={gameStatusClass}>
          {
            //nested ternary operator
          isGameOver?(
          isGamewon?
            (
            <>
          <h2>you win!</h2>
          <p>Well done! 🎉</p>
          </>
          )
          : (
          <>
          <h2>you lose!</h2>
          <p>Try again! 😭</p>
          </>
          )
        ):(
          null
        )
          }

        </section> 


        <section className='language-chips'>
          {languageElements}
        </section>
        <section className='word'>
         {letterElements}
        </section>
        <section className='keyboard'>
        {keyboardElements}
        </section>
        {isGameOver && <button className="new-game">New Game</button>}
      </main>
  )
}
