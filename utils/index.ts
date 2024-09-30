export function formatTime(timeInMinutes: number) {
	if (timeInMinutes < 60) {
		return `${timeInMinutes}m`;
	}
	if (timeInMinutes < 1440) {
		return `${Math.floor(timeInMinutes / 60)}h`;
	}

	return `${Math.floor(timeInMinutes / 1440)}d`;
}

export function formatText(text: string) {
	if (text.length <= 8) return text;
	return `${text.slice(0, 8)}...`;
}

export function formatTextWithEllipsis(text: string) {
	if (text.length <= 8) return `${text}...`;
	return `${text.slice(0, 8)}...`;
}
