import InputRedux from "components/molecules/InputRedux";
import { decimal, required, greaterThan0 } from "utils/validate.util";
import { ReduxFormField } from "components/molecules/ReduxFormFields";

export { default } from "./AddUserPointsForm";

export const fields: ReduxFormField[] = [
	{
		name: "points",
		label: "Points",
		validate: [required, greaterThan0, decimal],
		component: InputRedux,
		cellProps: { md: 4 },
	},
	{
		name: "reason",
		label: "Reason",
		component: InputRedux,
		cellProps: { md: 8 },
	},
];
