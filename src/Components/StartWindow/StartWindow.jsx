import { ref, set } from "firebase/database";
import { useState } from "react";
import { db, auth } from "../../Firebase/config";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import Loader from "../Loader";
import style from "./StartWindow.module.css";

export default function StartWindow({ gameState }) {
    const [inputValue, setInputValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

	let userUID;

	onAuthStateChanged(auth, (user) => {
		if (user) {
			userUID = user.uid
		}
		else {
			// User is signed out
		}
	})

    function changeInput(e) {
        setInputValue(e.target.value);
    }
	function handleKeyDown(e) {
		if (e.key === "Enter") connect()
	}

    async function updateField(field, value) {
        setIsLoading(true);

        set(ref(db, field), value)

        setIsLoading(false);
    }
    async function connect() {
        if (!inputValue) {
            const error = new Error("Nickname field can't be empty.");
            setErrorMessage(error.message);
            throw error;
        } else {
			setErrorMessage('');
            if (!gameState.player1.nick) {
				await signInAnonymously(auth)

				await updateField('gameState/player1/uid', userUID)
				await updateField('gameState/player1/nick', inputValue)
				await updateField('gameState/turn', 'player1')
            } else if (!gameState.player2.nick) {
				await signInAnonymously(auth)
				
				await updateField('gameState/player2/uid', userUID)
				await updateField("gameState/player2/nick", inputValue)
				await updateField("gameState/started", true)
            }
        }
    }

    return (
        <>
            <Loader trigger={isLoading} />
            <div className={style.startWindowWrapper}>
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
                <div onClick={connect} className={style.connectButton}>
                    <p>Connect to playground</p>
                </div>
                {errorMessage && (
                    <p className={style.errorMessage}>{errorMessage}</p>
                )}
            </div>
        </>
    );
}
