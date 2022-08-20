const combinations = [ '012', '345', '678', '036', '147', '258', '048', '246' ];

export function isWinner(cells) {
	for (let i = 0; i < combinations.length; i++) {
		let n = 0;
		for (let j = 0; j < cells.length; j++) {
			if (combinations[i].includes(cells[j])) n += 1;
		}
		if (n === 3) return true;
	}
	return false;
}