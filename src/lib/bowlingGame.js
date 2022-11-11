
//return an empty game to be filled
export const BowlingGame = () => {

    const newGame = ({setGame}) => { 
        setGame([]);
        let game = [...Array(10)].map((frame, index) => {

            //return the extra bowl for the last frame
            if(index == 9){
                return {
                    frameNum: index + 1,
                    bowl1: undefined,
                    bowl2: undefined,
                    bowl3: undefined,
                    score: undefined
                }
            }
            return {
                    frameNum: index + 1,
                    bowl1: undefined,
                    bowl2: undefined,
                    score: undefined
                }
           
        })
       
        return setGame(game);
    }

    const getFrame = ({game}) => {
        let currentFrame = 0
        for(let i = 0; i < game.length; i++){
            if(!game[i].bowl1 || !game[i].bowl2){
                return currentFrame;
            }
            currentFrame++;
            
        }
        //make sure we dont go over the 10 frames allowed in a bowling game
        return currentFrame > 9 ? 9: currentFrame;

    }

    const setBowl = ({game, bowl, setGame, setScores, setGameOver}) => {
        
        let currentFrame = getFrame({game});
        let frame = game[currentFrame];
      
        if(!frame.bowl1 ){
            frame.bowl1 = bowl;
            
            if(bowl == 10 && currentFrame != 9){
                frame.bowl2 = "X";
                frame.strike = true;
            }

        }
        else if (!frame.bowl2) {
            frame.bowl2 = bowl;
            if(frame.bowl1 + frame.bowl2 == 10){
                frame.spare = true;
            }
        }
        else if(!frame.bowl3 && (frame.bowl1 == 10 || frame.bowl1 + frame.bowl2 == 10)) {
            frame.bowl3 = bowl;
        }
       
        frame.bowl2 || bowl == 10 ? setScores(10): setScores(10 - bowl);
        game[currentFrame] = frame;
        setScore({game});
        setGameOver(checkForGameEnd({bowl1: frame.bowl1, bowl2: frame.bowl2, bowl3:frame.bowl3, currentFrame}));
        return setGame([...game]);
    }

    const checkForGameEnd = ({bowl1, bowl2, bowl3, currentFrame}) => {
        //frame 10 extra bowl
        if(bowl3){
            return true;
        }
        //frame 10 no spare
        if(currentFrame == 9 && bowl1 + bowl2 < 10){
            return true
        }
        return false
    }
    const setScore = ({game}) => {
        for(let i = 0; i < game.length; i++){
            let score = typeof(game[i].bowl2) == 'number' ? game[i].bowl1 + game[i].bowl2: null;
            let prevScore = (game[i - 1]?.score ? game[i - 1].score: 0);
            if(score && score < 10){                
                game[i].score = score + (game[i - 1]?.score ? game[i - 1].score: 0);
            }
            //spare
            if(score == 10){
                game[i].score = getSpareStrikeScore({numRolls:1,currentFrame: i, game}) ? getSpareStrikeScore({numRolls:1,currentFrame: i, game}) + prevScore: null;
            }
            //strike
            if(game[i].bowl1 == 10){
                game[i].score =  getSpareStrikeScore({numRolls:2,currentFrame: i, game}) ? getSpareStrikeScore({numRolls:2,currentFrame: i, game}) + prevScore: null;
            }
            //last frame 
            if(i == 9 && game[i].bowl3){
                let score = game[i].bowl1 + game[i].bowl2 + game[i].bowl3;
                game[i].score = score + prevScore;
            }
        }
    }

    const getSpareStrikeScore = ({numRolls, currentFrame, game}) => {
            //spare
            if(numRolls == 1){
                if(game[currentFrame].bowl3){
                    return game[currentFrame].bowl3;
                }
                return game[currentFrame + 1]?.bowl1 ? game[currentFrame].bowl1 + game[currentFrame].bowl2 + game[currentFrame + 1]?.bowl1: false;
            }
            //strike
            let bowl1 = game[currentFrame + 1]?.bowl1;
            let bowl2 = typeof game[currentFrame + 1]?.bowl2 == 'number' ? game[currentFrame + 1]?.bowl2: game[currentFrame + 2]?.bowl1;
            let score = bowl1 && bowl2 ? bowl1 + bowl2 + game[currentFrame].bowl1  : null;
            return score;  
    }
    
    return{
        newGame,
        getFrame,
        setBowl
   }
}

