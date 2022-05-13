import moment from "moment";

const DateService = {
	getDuration: (value: number = 0) => {
		return value > 0
			? moment.duration(value, "seconds").humanize()
			: "0 seconds";
	},

	getDurationString: (seconds: number = 0) => {
		let hours = seconds / 3600;
		let mins = (seconds % 3600) / 60;
		let secs = (mins * 60) % 60;

		hours = Math.trunc(hours);
		mins = Math.trunc(mins);

		if (!hours && !mins && !secs) return "0 sec";

		if (hours) {
			if (mins)
				return secs
					? `${hours} hr ${mins} min & ${secs} sec`
					: `${hours} hr & ${mins} min`;
			else return secs ? `${hours} hr & ${secs} sec` : `${hours} hr`;
		} else {
			if (mins) return secs ? `${mins} min & ${secs} sec` : `${mins} min`;
			else return secs ? `${secs} sec` : `None`;
		}
	},

	getMonthString: (value: string = "") => {
		return moment(new Date(value)).format("MMMM-YYYY");
	},

	getDateRange: (value: any) => {
		return [
			value[0] ? new Date(value[0]).toString() : "",
			value[1] ? new Date(value[1]).toString() : "",
		];
	},

	getShortDateString: (value: any) => {
		return value
			? moment(value.replace("Z", "")).format("ddd, MMM DD")
			: "";
	},

	getDateString: (value: any) => {
		return value
			? moment(value.replace("Z", "")).format("ddd, MMM DD, YYYY")
			: "";
	},

	getTimeString: (value: any) => {
		return value ? moment(value.replace("Z", "")).format("HH:mm") : "";
	},

	getDateTimeString: (value: any) => {
		return value
			? moment(value.replace("Z", "")).format("ddd, MMM DD, YYYY, HH:mm")
			: "";
	},

	getFormattedDate: (value: any) => {
		return value
			? new Date(value).toLocaleDateString(undefined, {
					weekday: "short",
					year: "numeric",
					month: "short",
					day: "numeric",
			  })
			: "";
	},

	getFormattedDateTime: (value: any) => {
		return value
			? new Date(value).toLocaleDateString(undefined, {
					weekday: "short",
					year: "numeric",
					month: "short",
					day: "numeric",
					hour: "numeric",
					minute: "numeric",
					hour12: false,
			  })
			: "";
	},
};

export default DateService;
