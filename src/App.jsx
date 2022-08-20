import style from "./App.module.css";
import ContentWrapper from "./Components/ContentWrapper";
import Header from "./Components/Header";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { setInitialState } from "./helpers/setInitialState";

function App() {

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

export default App;