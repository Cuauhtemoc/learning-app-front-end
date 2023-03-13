import Button from "@/components/Utils/Button";
import Input from "@/components/Utils/Input";
import Label from "@/components/Utils/Label";
import { useGame } from "@/hooks/game";
import { BowlingGame } from "@/lib/bowlingGame";
import { useEffect, useState } from "react";
import Frame from "./Frame";
import SaveGame from "./SaveGame";
import ScoreBoard from "./ScoreBoard";

const Game = () => {

    const {newGame, setBowl} = BowlingGame()
    const {onSave} = useGame();
    const [status, setStatus] = useState("");
    const [game, setGame] = useState([]);
    const [location, setLocation] = useState("");
    const [scores, setScores] = useState(10);
    const [gameOver, setGameOver] = useState(false);
    const [frameToEdit, setFrameToEdit] = useState(null);
    const [editMode, setEditMode] = useState(false);
    useEffect( () => {
            newGame({setGame})
        }  
    , []);
    const submitForm = async (event) => {
        event.preventDefault();
        onSave({game, setStatus});
    }
    return( 
        <form onSubmit={submitForm}>
            <Label htmlFor="location">Email</Label>
            <Input
                id="location"
                type="location"
                value={location}
                className="block mt-1 w-full"
                onChange={event => setLocation(event.target.value)}
                
                autoFocus 
            />
                
            <div className="min-h-[100px] my-[50px] flex">
                {game.map( (frame, index) =>
                    <Frame 
                        {...frame}
                        edit={editMode}
                        frameToEdit={frameToEdit}
                        setEditMode={setEditMode}
                        setFrameToEdit={setFrameToEdit}
                        key={'frame='+index}
                    />
                )}
            </div>
                        
            <ScoreBoard
                frameToSet={frameToEdit} 
                game={game}
                setGame={setGame}
                setBowl={setBowl}
                setScores={setScores}
                setGameOver={setGameOver}
                scores={scores}
            />
            <Button > Save</Button>
        </form>
           

        
    )
}

export default Game;