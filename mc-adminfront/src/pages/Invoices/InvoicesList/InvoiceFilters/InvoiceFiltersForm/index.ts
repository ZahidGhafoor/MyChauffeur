import { date } from "utils/validate.util";
import DatePickerRedux from "components/molecules/DatePickerRedux";
import { ReduxFormField } from "components/molecules/ReduxFormFields";

export { default } from "./InvoiceFiltersForm";

export const fields: ReduxFormField[] = [
	{
		name: "invoice_month",
		label: "Invoice Month",
		validate: [date],
		component: DatePickerRedux,
		cellProps: { sm: 6 },
		InputProps: { size: "small" },
		DatePickerProps: {
			mask: "___ ____",
			onChange: () => {},
			InputFieldProps: {},
			inputFormat: "MMM yyyy",
			views: ["month", "year"],
			value: { date: "", error: false },
		},
	},
];
