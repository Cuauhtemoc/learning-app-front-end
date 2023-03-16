const Frame = ({frame_num, bowl_1, bowl_2, bowl_3, score, edit, setEditMode, frameToEdit, setFrameToEdit, strike, spare}) => {
    
    const onEdit = (frame_num = null, editMode = false) => {
        setEditMode(editMode);
        setFrameToEdit(frame_num);
    }
    return(
        <div className="flex flex-[2] flex-col">
            <div className="flex justify-center flex-1 font-bold">{frame_num}</div>
            <div onClick = {() => onEdit(frame_num, true)} className="flex justify-center flex-1  border-r border-blue-800">
                <div className="flex flex-1 justify-center"> {strike ? "": bowl_1}</div>
                <div className="flex justify-center flex-1 border-l text-center border-b border-blue-800"> {strike ? "X" : spare ? "/" : bowl_2} </div>
                <div className={`${frame_num == 10 ? "flex flex-1": "hidden"} justify-center border-l border-b border-blue-800`}> {strike ?  "X": bowl_3} </div>
            </div>
            <div className="flex flex-1 justify-center border-b border-r border-blue-800">{score}</div>
            <div onClick={() => onEdit(null, false)} className={`${edit && frameToEdit == frame_num? "": "invisible"} flex flex-1 justify-center border border-red-800`}>Save</div>
        </div>

    )

}

export default Frame;
