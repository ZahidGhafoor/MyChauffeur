import { date } from "utils/validate.util";
import DatePickerRedux from "components/molecules/DatePickerRedux";
import RadioGroupRedux from "components/molecules/RadioGroupRedux";
import { ReduxFormField } from "components/molecules/ReduxFormFields";

export { default } from "./PayInvoiceForm";

export const fields: ReduxFormField[] = [
	{
		name: "payment_date",
		label: "Payment Date",
		validate: [date],
		component: DatePickerRedux,
		DatePickerProps: {
			onChange: () => {},
			minDate: new Date(),
			InputFieldProps: {},
			value: { date: "", error: false },
		},
	},
	{
		name: "payment_method",
		label: "Payment Method",
		component: RadioGroupRedux,
		RadioGroupProps: {
			values: [
				{ value: "Bank", label: "Bank" },
				{ value: "Card", label: "Card" },
				{ value: "PayPal", label: "PayPal" },
				{ value: "Cash", label: "Cash" },
			],
		},
	},
];
