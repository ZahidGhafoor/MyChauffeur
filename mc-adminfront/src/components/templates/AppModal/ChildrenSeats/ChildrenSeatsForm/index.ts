import OptionService from "utils/option.util";
import { childrenSeats } from "utils/validate.util";
import SelectRedux from "components/molecules/SelectRedux";
import { ReduxFormField } from "components/molecules/ReduxFormFields";

export { default } from "./ChildrenSeatsForm";

const options = OptionService.getOptions(3);

export const fields: ReduxFormField[] = [
	{
		name: "one_to_three_years",
		label: "1-3 years (9-18kg)",
		validate: [childrenSeats],
		component: SelectRedux,
		hideError: true,
		SelectProps: {
			options: options,
		},
		cellProps: { md: 12 },
	},
	{
		name: "three_to_six_years",
		label: "3-6 years (15-25kg)",
		component: SelectRedux,
		SelectProps: {
			options: options,
		},
		cellProps: { md: 12 },
	},
	{
		name: "six_to_twelve_years",
		label: "6-12 years (22-36kg)",
		component: SelectRedux,
		SelectProps: {
			options: options,
		},
		cellProps: { md: 12 },
	},
];
