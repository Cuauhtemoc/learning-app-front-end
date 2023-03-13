import Button from "@/components/Utils/Button";
import { useGame } from "@/hooks/game";
import { useState } from "react";

const SaveGame =  ({game}) => {

    const {onSave} = useGame();
    const [status, setStatus] = useState("");
        
    return(
        
        <div className="mx-auto">
            <div className="ml-auto">{status}</div>
            <div className="ml-auto">
                <Button onClick={() => onSave({game, setStatus})} >
                        Save
                </Button>
            </div>
            
        </div>
    )


}

export default SaveGame;