import Game from "@/components/Features/AddGame/Game";
import AppLayout from "@/components/Layouts/AppLayout";
import { useAuth } from "@/hooks/auth";
import Head from "next/head";

const AddGame = () => {
    const { user } = useAuth({ middleware: 'auth' })

    return(
        <AppLayout >
             <Head>
                <title>Laravel - Add Score</title>
            </Head>
            <Game />
        </AppLayout>
    )

}

export default AddGame;