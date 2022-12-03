import { set, ref } from "firebase/database";
import { db } from "../firebase/config";

export const initialState = {
    board: [
        {
            id: "0",
            value: "",
        },
        {
            id: "1",
            value: "",
        },
        {
            id: "2",
            value: "",
        },
        {
            id: "3",
            value: "",
        },
        {
            id: "4",
            value: "",
        },
        {
            id: "5",
            value: "",
        },
        {
            id: "6",
            value: "",
        },
        {
            id: "7",
            value: "",
        },
        {
            id: "8",
            value: "",
        },
    ],
    player1: {
        nick: "",
        uid: "",
        cells: "",
		disconnected: false,
		playAgain: false,
    },
    player2: {
        nick: "",
        uid: "",
        cells: "",
		disconnected: false,
		playAgain: false,
    },
    started: false,
    turn: "",
    score: {
        player1: 0,
        player2: 0,
        draw: 0,
    },
    winner: "",
};

export async function setInitialState() {
    await set(ref(db, "gameState/"), initialState);
}
