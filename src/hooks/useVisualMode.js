import { useState } from 'react'

export function useVisualMode (initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);
	
	function transition(newMode, replace = false) {
		setHistory(prev => {
			replace && back()
			return ([...prev, newMode]);
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