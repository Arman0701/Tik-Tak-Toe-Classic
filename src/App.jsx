import style from "./App.module.css";
import ContentWrapper from "./Components/ContentWrapper";
import Header from "./Components/Header";
import { ref, set } from "firebase/database";
import { useEffect } from "react";
import { db } from "./Firebase/config";

const initialState = {
	board: [
		{
			id: '0',
			value: ''
		},
		{
			id: '1',
			value: ''
		},
		{
			id: '2',
			value: ''
		},
		{
			id: '3',
			value: ''
		},
		{
			id: '4',
			value: ''
		},
		{
			id: '5',
			value: ''
		},
		{
			id: '6',
			value: ''
		},
		{
			id: '7',
			value: ''
		},
		{
			id: '8',
			value: ''
		},
	],
	player1: {
		cells: Array(0),
		nick: '',
	},
	player2: {
		cells: Array(0),
		nick: '',
	},
	started: false,
	turn: ''
}

function App() {

	useEffect(() => {
		window.addEventListener('beforeunload', beforeUnloadListener)
		return () => window.removeEventListener("beforeunload", beforeUnloadListener)
	}, [])

	function beforeUnloadListener() {
		const gameRef = ref(db, "gameState/");
		set(gameRef, initialState);
	}

    return <div className={style.App}>
		<Header />
		<ContentWrapper />
		<p className={style.footer}>Made by Arman Tadevosyan</p>
	</div>;
}

export default App;