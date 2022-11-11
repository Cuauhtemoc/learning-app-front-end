const Frame = ({frameNum, bowl1, bowl2, bowl3, score}) => {
    return(
        <div className="flex flex-[2] flex-col">
            <div className="flex justify-center flex-1 font-bold">{frameNum}</div>
            <div className="flex justify-center flex-1  border-r border-blue-800">
                <div className="flex flex-1 justify-center"> {frameNum != 10 && bowl1 == 10 ? "": bowl1}</div>
                <div className="flex justify-center flex-1 border-l text-center border-b border-blue-800"> {bowl2 && bowl1 + bowl2 == 10 ? "/" : bowl2} </div>
                <div className={`${frameNum == 10 ? "flex flex-1": "hidden"} justify-center border-l border-b border-blue-800`}> {bowl3 == 10 ?  "X": bowl3} </div>
            </div>
            <div className="flex flex-1 justify-center border-b border-r border-blue-800">{score}</div>
        </div>
 
    )

}

export default Frame;
