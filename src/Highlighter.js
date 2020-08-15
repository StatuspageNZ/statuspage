import React from "react";

function Highlighter({ text, highlight }) {
	const hl = highlight.trim().toLowerCase()
	const start = text.toLowerCase().indexOf(hl)
	if (start === -1) {
		return <span>{text}</span>
	}
	else if (start === 0) {
		return (
			<>
				<i>{text.substr(0, hl.length)}</i>
				<span>{text.substr(hl.length)}</span>
			</>
		)
	}
	else {
		return (
			<>
				<span>{text.substr(0, start)}</span>
				<i>{text.substr(start, hl.length)}</i>
				<span>{text.substr(start + hl.length)}</span>
			</>
		)		
	}
}

export default Highlighter;
