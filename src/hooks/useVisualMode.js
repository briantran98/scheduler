import { useState } from 'react'

export function useVisualMode (initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);
	
	function transition(newMode, replace = false) {
		setHistory(prev => {
			const newHistory = replace ?  [...prev.slice(0,prev.length -1), newMode]: [...prev, newMode]
			return newHistory;
		});
		setMode(newMode);
	}

	function back() {
		if (history.length > 1) {
			setHistory(prev => {
				const newHistory = prev.filter(historyMode => historyMode !== mode)
				setMode(newHistory[newHistory.length - 1]);
				return newHistory;
			});
		}
	}
  return { mode, transition, back };
};