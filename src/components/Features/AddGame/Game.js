import { BowlingGame } from "@/lib/bowlingGame";
import { useEffect, useState } from "react";
import Frame from "./Frame";
import ScoreBoard from "./ScoreBoard";
import ScoreButton from "./ScoreButton";

const Game = () => {

    const {newGame, setBowl} = BowlingGame()
    const [game, setGame] = useState([]);
    const [scores, setScores] = useState(10);
    const [gameOver, setGameOver] = useState(false);
    useEffect( () => {
            newGame({setGame})
        }  
    , []);

    let bowl = 1;
    return( 
        <>
        <div className="min-h-[100px] my-[50px] flex">
            {game.map( (frame, index) =>
                <Frame 
                    {...frame}
                    key={'frame='+index}
                />
            )}
        </div>
        {
            gameOver ? <div>GameOver</div>:
            <ScoreBoard 
                game={game}
                setGame={setGame}
                setBowl={setBowl}
                setScores={setScores}
                setGameOver={setGameOver}
                scores={scores}
            />
        }
        </>

        
    )
}

export default Game;