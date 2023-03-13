
//return an empty game to be filled
export const BowlingGame = () => {
    const newGame = ({setGame}) => { 
        setGame([]);
        let game = [...Array(10)].map((frame, index) => {

            //return the extra bowl for the last frame
            if(index == 9){
                return {
                    frame_num: index + 1,
                    bowl_1: undefined,
                    bowl_2: undefined,
                    bowl_3: undefined,
                    score: undefined
                }
            }
            return {
                    frame_num: index + 1,
                    bowl_1: undefined,
                    bowl_2: undefined,
                    score: undefined
                }
           
        })
       
        return setGame(game);
    }
    const getFrame = ({game}) => {
        let currentFrame = 0
        for(let i = 0; i < game.length; i++){
            if(game[i].bowl_1 == undefined || game[i].bowl_2 == undefined){
                return currentFrame;
            }
            currentFrame++;
            
        }
        //make sure we dont go over the 10 frames allowed in a bowling game
        return currentFrame > 9 ? 9: currentFrame;

    }

    const setStrike = (frame) => {
        
        frame.strike = true;
        return "X";
    }

    const setBowl = ({ frameToSet, game, bowl, setGame, setScores, setGameOver}) => {
        
        //if there is no frame passed, determine it based on the state of the game
        let currentFrame = frameToSet ? frameToSet - 1 : getFrame({game});
        let frame = game[currentFrame];
    
        //handle edit mode
        if(frameToSet && (frame.bowl_2 || frame.bowl_3) ){
            
            frame.bowl_1 = bowl;
            frame.bowl_2 = bowl == 10 && frameToSet != 9 ? setStrike(frame) : undefined;
            if(currentFrame == 9 ){ 
                frame.bowl_3 = undefined
            }

        }
        else if(frame.bowl_1 == undefined){
            frame.bowl_1 = bowl;
            
            if(bowl == 10 && currentFrame != 9){
                frame.bowl_2 = setStrike(frame);
            }

        }
        else if (frame.bowl_2 == undefined) {
            frame.bowl_2 = bowl;
            if(frame.bowl_1 + frame.bowl_2 == 10){
                frame.spare = true;
            }
        }
        else if(frame.bowl_3 == undefined && (frame.bowl_1 == 10 || frame.bowl_1 + frame.bowl_2 == 10)) {
            frame.bowl_3 = bowl;
        }
       
        frame.bowl_2 || bowl == 10 ? setScores(10): setScores(10 - bowl);
        game[currentFrame] = frame;
        setScore({game});
        setGameOver(checkForGameEnd({bowl_1: frame.bowl_1, bowl_2: frame.bowl_2, bowl_3:frame.bowl_3, currentFrame}));
        return setGame([...game]);
    }

    const checkForGameEnd = ({bowl_1, bowl_2, bowl_3, currentFrame}) => {
        //frame 10 extra bowl
        if(bowl_3){
            return true;
        }
        //frame 10 no spare
        if(currentFrame == 9 && bowl_1 + bowl_2 < 10){
            return true
        }
        return false
    }
    const setScore = ({game}) => {
        for(let i = 0; i < game.length; i++){
            let score = typeof(game[i].bowl_2) == 'number' ? game[i].bowl_1 + game[i].bowl_2: undefined;
            let prevScore = (game[i - 1]?.score ? game[i - 1].score: 0);
            if(score != undefined && score < 10){     
                console.log("frame", i);
                console.log("prev",prevScore);           
                game[i].score = score + (game[i - 1]?.score ? game[i - 1].score: 0);
            }
            //spare
            if(score == 10){
                game[i].score = getSpareStrikeScore({numRolls:1,currentFrame: i, game}) ? getSpareStrikeScore({numRolls:1,currentFrame: i, game}) + prevScore: undefined;
            }
            //strike
            if(game[i].bowl_1 == 10){
                game[i].score =  getSpareStrikeScore({numRolls:2,currentFrame: i, game}) ? getSpareStrikeScore({numRolls:2,currentFrame: i, game}) + prevScore: undefined;
            }
            if(game[i].bowl_1 + game[i].bowl_2 > 10 && i != 9){
                game[i].bowl_1 = undefined;
                game[i].bowl_2 = undefined;
                game[i].score = undefined;
            }
            //last frame 
            if(i == 9 && game[i].bowl_3){
                let score = game[i].bowl_1 + game[i].bowl_2 + game[i].bowl_3;
                game[i].score = score + prevScore;
            }
        }
    }

    const getSpareStrikeScore = ({numRolls, currentFrame, game}) => {
            //spare
            if(numRolls == 1){
                if(game[currentFrame].bowl_3 != undefined){
                    return game[currentFrame].bowl_3;
                }
                
                return game[currentFrame + 1]?.bowl_1 != undefined ? game[currentFrame].bowl_1 + game[currentFrame].bowl_2 + game[currentFrame + 1]?.bowl_1: false;
            }
            //strike
            let bowl_1 = game[currentFrame + 1]?.bowl_1;
            let bowl_2 = typeof game[currentFrame + 1]?.bowl_2 == 'number' ? game[currentFrame + 1]?.bowl_2: game[currentFrame + 2]?.bowl_1;
            let score = bowl_1 != undefined && bowl_2 != undefined ? bowl_1 + bowl_2 + game[currentFrame].bowl_1  : null;
            return score;  
    }
    
    return{
        newGame,
        getFrame,
        setBowl
   }
}

