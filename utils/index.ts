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

export function formatTextWithEllipsis(text?: string) {
	if (!text) return "";
	if (text.length <= 8) return `${text}...`;
	return `${text.slice(0, 8)}...`;
}

export function formatDate(d: Date) {
	return d.toLocaleString("pt-BR", {
		dateStyle: "short",
		timeStyle: "short",
	});
}

export function formatDateOnly(d: Date) {
	return d.toLocaleString("pt-BR", {
		dateStyle: "short",
	});
}
export function formatTimeOnly(d: Date) {
	return d.toLocaleString("pt-BR", {
		timeStyle: "short",
	});
}
