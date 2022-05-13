import SelectCity from "components/organisms/SelectCity";
import InputRedux from "components/molecules/InputRedux";
import SelectRedux from "components/molecules/SelectRedux";
import CheckboxRedux from "components/molecules/CheckboxRedux";
import { ReduxFormField } from "components/molecules/ReduxFormFields";
import DateRangePickerRedux from "components/molecules/DateRangePickerRedux";
import {
	number,
	required,
	positive,
	dateRange,
	greaterThan0,
} from "utils/validate.util";

export { default } from "./AddCampaignForm";

export const fields: ReduxFormField[] = [
	{
		name: "status",
		label: "Active",
		component: CheckboxRedux,
		cellProps: { md: 12 },
	},
	{
		name: "title",
		label: "Name",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 6 },
	},
	{
		name: "city",
		label: "City",
		validate: [required],
		component: SelectCity,
		SelectProps: { disabledOnUpdate: true },
		cellProps: { md: 6 },
	},
	{
		name: "date",
		label: "Date",
		validate: [dateRange],
		component: DateRangePickerRedux,
		DateRangePickerProps: {
			onChange: () => {},
			minDate: new Date(),
			InputFieldProps: {},
			value: { date: ["", ""], error: ["", ""] },
		},
	},
	{
		name: "usage_type",
		label: "Campaign Usage Type",
		validate: [required],
		component: SelectRedux,
		SelectProps: {
			options: [
				{ label: "Unique Code", value: "Unique Code" },
				{
					label: "Common Code Single Use",
					value: "Common Code Single Use",
				},
			],
		},
		cellProps: { md: 6, lg: 6 },
	},
	{
		name: "minimum_price",
		label: "Minimum Price",
		validate: [required, number, positive, greaterThan0],
		component: InputRedux,
		cellProps: { md: 6, lg: 6 },
	},
	{
		name: "discount_type",
		label: "Discount Type",
		validate: [required],
		component: SelectRedux,
		SelectProps: {
			options: [
				{ label: "Percentage", value: "percentage" },
				{ label: "Amount", value: "amount" },
			],
		},
		cellProps: { md: 6, lg: 6 },
	},
	{
		name: "discount_value",
		label: "Discount",
		validate: [required, number, positive, greaterThan0],
		component: InputRedux,
		cellProps: { md: 6, lg: 6 },
	},
];
