import style from "./ContentWrapper.module.scss";

import Board from "../Board";
import StartWindow from "../StartWindow";
import Loader from "../Loader";
import WinnerPage from "../WinnerPage"

import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { onValue, ref } from "firebase/database";
import { Route, Routes, useNavigate } from "react-router-dom";

export default function ContentWrapper() {
    const [gameState, setGameState] = useState({});
    const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

    useEffect(() => {
		const gameStateRef = ref(db, "gameState/");
		onValue(gameStateRef, (snapshot) => {
			setGameState(snapshot.val());
			setIsLoading(false);
		})
    }, [gameState.turn]);

	useEffect(() => {
		navigate('/start')
	}, [])

    return (
        <div className={style.contentWrapper}>
            <Loader trigger={isLoading} />
				<Routes>
					<Route path="/start" element={!gameState.started && <StartWindow gameState={gameState} />} />
					<Route path={`/board/player1/${gameState.player1?.uid}`} element={<Board gameState={gameState} />} />
					<Route path={`/board/player2/${gameState.player2?.uid}`} element={<Board gameState={gameState} />} />
					<Route path={`/winner/:id`} element={<WinnerPage gameState={gameState} />} />
				</Routes>
        </div>
    );
}
