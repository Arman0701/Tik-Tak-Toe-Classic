import style from "./App.module.scss";

import ContentWrapper from "./components/ContentWrapper";
import Header from "./components/Header";

import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { setInitialState } from "./helpers/setInitialState";

export default function App() {

	useEffect(() => {
		window.addEventListener('beforeunload', setInitialState)
		return () => window.removeEventListener("beforeunload", setInitialState)
	}, [])

    return <div className={style.App}>
		<Header />
		<BrowserRouter>
			<ContentWrapper />
		</BrowserRouter>
		<p className={style.footer}>Made by Arman Tadevosyan</p>
	</div>;
}