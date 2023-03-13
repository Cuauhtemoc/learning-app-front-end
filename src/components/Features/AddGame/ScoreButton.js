const ScoreButton = ({frameToSet, setBowl, game, bowl, setGame, setScores, setGameOver}) => {

    return(
        <button className="p-4 m-3 border-2 border-indigo-700" onClick={() => setBowl({frameToSet, game, bowl, setGame, setScores, setGameOver})}>{bowl}</button>
    )

}

export default ScoreButton;