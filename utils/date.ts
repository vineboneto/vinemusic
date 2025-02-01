export const date = {
	diffInMinutes(date1: Date, date2: Date) {
		date1.setMilliseconds(0);
		date1.setSeconds(0);
		date2.setMilliseconds(0);
		date2.setSeconds(0);
		const differenceInMs = date2.getTime() - date1.getTime();

		return Math.floor(differenceInMs / 1000 / 60);
	},

	combineDateTime: (date: Date, time: Date) => {
		const combinedDate = new Date(date); // Cria uma nova instância de Date com a data
		combinedDate.setHours(
			time.getHours(),
			time.getMinutes(),
			time.getSeconds(),
			time.getMilliseconds(),
		); // Define horas, minutos, segundos e milissegundos
		return combinedDate;
	},
	fromUTC: (date: Date | string, hours = 3) => {
		const fuso = new Date(date);
		fuso.setHours(fuso.getHours() + hours);
		return fuso;
	},
	start: (date: Date, { firstDayMonth = false, utc = false } = {}) => {
		const startOfDay = new Date(date);
		if (firstDayMonth) {
			if (utc) {
				startOfDay.setUTCDate(1);
			} else {
				startOfDay.setDate(1);
			}
		}

		if (utc) {
			startOfDay.setUTCHours(0, 0, 0, 0);
		} else {
			startOfDay.setHours(0, 0, 0, 0);
		}
		return startOfDay;
	},
	end: (date: Date, { lastDayMonth = false, utc = false } = {}) => {
		const endOfDay = new Date(date);
		if (lastDayMonth) {
			if (utc) {
				endOfDay.setUTCMonth(endOfDay.getMonth() + 1);
				endOfDay.setUTCDate(0);
			} else {
				endOfDay.setMonth(endOfDay.getMonth() + 1);
				endOfDay.setDate(0);
			}
		}
		if (utc) {
			endOfDay.setUTCHours(23, 59, 59, 999);
		} else {
			endOfDay.setHours(23, 59, 59, 999);
		}
		return endOfDay;
	},
};
