import ScoreButton from "./ScoreButton"

const ScoreBoard = (props) => {

    return (
        <div>

            {
                [...Array(props.scores + 1)].map((button, index) => 
                    <ScoreButton 
                        {...props}
                        key={'button-'+index}
                        bowl={index}
                    />
                )
                }
        </div>
    )
}

export default ScoreBoard