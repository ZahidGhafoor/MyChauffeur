import DateRangePickerRedux from "components/molecules/DateRangePickerRedux";
import InputRedux from "components/molecules/InputRedux";
import { ReduxFormField } from "components/molecules/ReduxFormFields";
import { digits, pageSize } from "utils/normalize.util";
import { dateRangeFilter } from "utils/validate.util";
import PageSize from "./PageSize";
import SelectDriver from "./SelectDriver";

export { default } from "./BookingFiltersForm";

export const fields: ReduxFormField[] = [
	{
		name: "page_size",
		label: "Page Size",
		normalize: pageSize,
		component: PageSize,
		cellProps: { sm: 6, md: 2 },
		InputProps: { size: "small" },
	},
	{
		name: "booking_number",
		label: "Id",
		normalize: digits,
		component: InputRedux,
		cellProps: { sm: 6, md: 2 },
		InputProps: { size: "small" },
	},
	{
		name: "driver_id",
		label: "Chauffeur",
		component: SelectDriver,
		cellProps: { md: 3 },
		InputProps: { size: "small" },
	},
	{
		name: "date",
		label: "Date",
		validate: [dateRangeFilter],
		component: DateRangePickerRedux,
		cellProps: { md: 5 },
		DateRangePickerProps: {
			onChange: () => {},
			InputFieldProps: {},
			value: { date: ["", ""], error: ["", ""] },
		},
		InputProps: { size: "small" },
	},
];
