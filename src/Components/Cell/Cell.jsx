import style from "./Cell.module.css";
import { set, ref } from "firebase/database";
import { db } from "../../Firebase/config";

export default function Cell({ item, gameState }) {
	
    function setCell() {
        if (!item.value) {
            set(ref(db, `gameState/board/${item.id}`), {
                ...item,
                value: gameState.turn === "player1" ? "X" : "O",
            });
			set(ref(db, "gameState/turn"), gameState.turn === "player1" ? "player2" : "player1")
        }
    }

    return (
        <div className={style.cellWrapper} onClick={setCell}>
			<p>{item.value}</p>
        </div>
    );
}
