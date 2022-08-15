import style from "./ContentWrapper.module.css";
import Board from "../Board";
import StartWindow from "../StartWindow";
import Loader from "../Loader";

import { useEffect, useState } from "react";
import { db } from "../../Firebase/config";
import { onValue, ref } from "firebase/database";

export default function ContentWrapper() {
    const [gameState, setGameState] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const gameStateRef = ref(db, "gameState/");
            onValue(gameStateRef, (snapshot) => {
                setGameState(snapshot.val());
                setIsLoading(false);
                console.log("Log snapshot.val() ::: ", snapshot.val());
            });
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <div className={style.contentWrapper}>
            <Loader trigger={isLoading} />
            {!gameState.started && !isLoading && (
                <StartWindow gameState={gameState} />
            )}
            {gameState.started && !isLoading && (
				<Board gameState={gameState} />
			)}
        </div>
    );
}
