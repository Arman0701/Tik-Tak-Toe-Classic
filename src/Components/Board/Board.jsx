import style from './Board.module.scss';
import Cell from "../Cell";

export default function Board({ gameState }) {
	
	return <>
		<div className={style.playersBlock}>
			<div className={style.player1Block}>
				<p title={gameState.player1?.uid}>Player1 {gameState.player1.nick}</p>
			</div>
			<div className={style.player1Block}>
				<p title={gameState.player2?.uid}>Player2 {gameState.player2.nick}</p>
			</div>
		</div>
		<div className={style.boardWrapper}>
			{
				gameState.board.map((item, index) => <Cell key={index} item={item} gameState={gameState} />)
			}
		</div>
	</>
}