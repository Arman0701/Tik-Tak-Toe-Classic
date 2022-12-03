import style from './WinnerPage.module.scss';
import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from 'react';
import { setInitialState } from '../../helpers/setInitialState';

export default function WinnerPage({ gameState }) {
	const { id } = useParams();
	const navigate = useNavigate();
	
	const goTomainMenu = useCallback(async () => {
		await setInitialState()
		navigate("/start")
	}, [])
	
	return <div className={style.winnerPageWrapper}>
		<div className={style.score}>
			<p>Player1 score: {gameState.score.player1}</p>
			<p>Player2 score: {gameState.score.player2}</p>
		</div>
		<div>
		{
			id === "draw"
			? <p>The game ended in draw. Good job!</p>
			: <p>Winner is {id} {gameState[id].nick}</p> 
		}
		</div>
		<div className={style.buttons}>
			<button className={style.button} onClick={goTomainMenu}>Main Menu</button>
		</div>
	</div> 

}