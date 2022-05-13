import {
	date,
	minLength3,
	phone,
	required,
	requiredPhone,
	requiredSelect,
} from "utils/validate.util";
import FlightNumber from "./FlightNumber";
import { flight } from "utils/normalize.util";
import InputRedux from "components/molecules/InputRedux";
import SelectRedux from "components/molecules/SelectRedux";
import CheckboxRedux from "components/molecules/CheckboxRedux";
import DatePickerRedux from "components/molecules/DatePickerRedux";
import PhoneInputRedux from "components/molecules/PhoneInputRedux";
import TimePickerRedux from "components/molecules/TimePickerRedux";
import SelectClass from "../../../components/organisms/SelectClass";
import { ReduxFormField } from "components/molecules/ReduxFormFields";

export { default } from "./AddBookingForm";

export const fields: ReduxFormField[] = [
	{
		name: "hourly",
		label: "Hourly",
		component: CheckboxRedux,
		cellProps: { md: 12 },
	},
];

export const fieldsAfter: ReduxFormField[] = [
	{
		name: "date",
		label: "Date",
		validate: [date],
		component: DatePickerRedux,
		cellProps: { md: 6, lg: 6 },
		DatePickerProps: {
			onChange: () => {},
			minDate: new Date(),
			InputFieldProps: {},
			value: { date: "", error: false },
		},
	},
	{
		name: "time",
		label: "Time",
		validate: [date],
		component: TimePickerRedux,
		cellProps: { md: 6, lg: 6 },
	},
	{
		name: "class_id",
		label: "Class",
		validate: [required],
		component: SelectClass,
		cellProps: { md: 6, lg: 6 },
	},
	{
		name: "price",
		label: "Price",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 6, lg: 6 },
		InputProps: { InputProps: { endAdornment: "€" } },
	},
];

export const additional_fields_left: ReduxFormField[] = [
	{
		name: "title",
		label: "Title",
		component: SelectRedux,
		validate: [requiredSelect],
		SelectProps: {
			options: [
				{ label: "Mr.", value: "Mr." },
				{ label: "Mrs.", value: "Mrs." },
				{ label: "Mx.", value: "Mx." },
			],
		},
		cellProps: { md: 12 },
	},
	{
		name: "first_name",
		label: "First Name",
		component: InputRedux,
		validate: [required],
		cellProps: { md: 12 },
	},
	{
		name: "last_name",
		label: "Last Name",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 12 },
	},
	{
		name: "pickup_sign",
		label: "Pickup Sign",
		component: InputRedux,
		cellProps: { md: 12 },
	},
	{
		name: "flight_number",
		label: "Flight Number",
		normalize: flight,
		component: FlightNumber,
		cellProps: { md: 12 },
		validate: [minLength3],
	},
];

export const additional_fields_right: ReduxFormField[] = [
	{
		name: "phone",
		label: "Phone",
		component: PhoneInputRedux,
		validate: [requiredPhone, phone],
		cellProps: { md: 12 },
	},
	{
		name: "email",
		label: "Email",
		component: InputRedux,
		cellProps: { md: 12 },
	},
	{
		name: "notes",
		label: "Notes for Chauffeur",
		component: InputRedux,
		cellProps: { md: 12 },
		InputProps: { multiline: true, rows: 3 },
	},
];
