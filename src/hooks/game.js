import axios from "@/lib/axios";

export const useGame = () => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')
    
    const onSave = async ({game, setStatus}) => {
        
        await csrf();
        axios
        .post('/api/game',  {game:game} )
        .then(response => setStatus(response.status == 200 ? "Success": ""))
        .catch(error => {
            if (error.response !== 422) throw error

            setErrors(Object.values(error.response.data.errors).flat())
        })
    }

    return {onSave};
        
}