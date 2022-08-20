import style from "./Cell.module.css";
import { set, ref } from "firebase/database";
import { db } from "../../Firebase/config";
import { useLocation, useNavigate } from "react-router-dom";
import { isWinner } from "../../helpers/isWinner";
import { useEffect, useMemo } from "react";

export default function Cell({ item, gameState }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
	let playerScore = useMemo(() => gameState.score[gameState.turn], [])
	let drawScore = useMemo(() => gameState.score.draw, [])
	
	useEffect(() => {
		(async () => {
			if (isWinner(gameState[gameState.turn].cells)) {
				await set(ref(db, "gameState/winner"), gameState.turn);
				await set(ref(db, `gameState/score/${gameState.turn}`), playerScore += 1);
				navigate(`/winner/${gameState.turn}`);
			} else {
				const boardIsFull = gameState.board.every((element) => element.value)
				if (boardIsFull) {
					await set(ref(db, "gameState/score/draw"), drawScore += 1)
					navigate("/winner/draw")
				}
			}
		})()
	})
	
    async function setCell() {
		if (
			!item.value &&
			gameState.player1.nick &&
			gameState.player2.nick &&
            pathname === `/board/${gameState.turn}/${gameState[gameState.turn].uid}`
			) {
			await set(ref(db, `gameState/board/${item.id}`), {...item, value: gameState.turn === "player1" ? "X" : "O"});
			await set(ref(db, `gameState/${gameState.turn}/cells`), [...gameState[gameState.turn].cells, item.id]);
			await set(ref(db, "gameState/turn"), gameState.turn === "player1" ? "player2" : "player1");
        }
    }

    return (
        <div className={style.cellWrapper} onClick={setCell}>
            <p>{item.value}</p>
        </div>
    );
}
