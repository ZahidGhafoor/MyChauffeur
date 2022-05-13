import { required } from "utils/validate.util";
import InputRedux from "components/molecules/InputRedux";
import CheckboxRedux from "components/molecules/CheckboxRedux";
import { ReduxFormField } from "components/molecules/ReduxFormFields";

export { default } from "./AddCityForm";

export const fields: ReduxFormField[] = [
	{
		name: "is_active",
		label: "Active",
		component: CheckboxRedux,
		cellProps: { md: 12 },
	},
	{
		name: "name",
		label: "Name",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 6, lg: 6 },
	},
];
