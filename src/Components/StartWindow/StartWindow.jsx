import Loader from "../Loader";

import style from "./StartWindow.module.scss";

import { ref, set } from "firebase/database";
import { db } from "../../firebase/config";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v1 as genID } from "uuid";

export default function StartWindow({ gameState }) {
    const [inputValue, setInputValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	let uuid;

    function changeInput(e) {
        setInputValue(e.target.value);
    }
	function handleKeyDown(e) {
		if (e.key === "Enter") helper()
	}

    async function updateField(field, value) {
        setIsLoading(true);

        await set(ref(db, field), value)

        setIsLoading(false);
    }
    async function connect() {
        if (!inputValue) {
            setErrorMessage("Nickname field can't be empty.");
		} else {
			setErrorMessage('');
            if (!gameState.player1.nick) {
				uuid = genID()
				await updateField('gameState/player1/uid', uuid)
				await updateField('gameState/player1/nick', inputValue)
				await updateField('gameState/turn', 'player1')
            } else if (!gameState.player2.nick) {
				uuid = genID()		
				await updateField('gameState/player2/uid', uuid)
				await updateField("gameState/player2/nick", inputValue)
				await updateField("gameState/started", true)
            }
        }
    }

	async function helper() {
		await connect();
		const player = !gameState.player1.nick ? "player1" : "player2"
		navigate(`/board/${player}/${uuid}`);
	}

    return (
        
		<div className={style.startWindowWrapper}>
			<Loader trigger={isLoading} customStyles={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)"
			}} />
			<p className={style.description}>
				Welcome to Tik Tak Toe Classic playground. Just relax and
				enjoy the game.
			</p>
			<label>
				<p>Type your nickname</p>
				<input
					type="text"
					autoFocus
					value={inputValue}
					onKeyDown={handleKeyDown}
					onChange={changeInput}
					style={
						errorMessage
							? {
								border: "2px solid crimson",
								borderRadius: "4px",
							}
							: {}
					}
				/>
			</label>
			<button onClick={helper} className={style.connectButton}>
				Connect to playground
			</button>
			{errorMessage && (
				<p className={style.errorMessage}>{errorMessage}</p>
			)}
			{
				gameState.player1?.nick && <div className={style.players}>
					<p>{gameState.player1.nick} is waiting</p>
				</div>
			}
		</div>
    );
}
