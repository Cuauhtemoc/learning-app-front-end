import ScoreButton from "./ScoreButton"

const ScoreBoard = (props) => {

    return (
        [...Array(props.scores)].map((button, index) => 
            <ScoreButton 
                {...props}
                key={'button-'+index}
                bowl={index + 1}
            />
        )
    )
}

export default ScoreBoard