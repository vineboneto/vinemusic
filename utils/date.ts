export const date = {
	diffInMinutes(date1: Date, date2: Date) {
		date1.setMilliseconds(0);
		date1.setSeconds(0);
		date2.setMilliseconds(0);
		date2.setSeconds(0);
		const differenceInMs = date2.getTime() - date1.getTime();

		return Math.floor(differenceInMs / 1000 / 60);
	},
};
