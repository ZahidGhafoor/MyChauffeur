import { required } from "utils/validate.util";
import InputRedux from "components/molecules/InputRedux";
import { ReduxFormField } from "components/molecules/ReduxFormFields";

export { default } from "./AddRemarksForm";

export const fields: ReduxFormField[] = [
	{
		name: "status_reason",
		label: "Remarks",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 12 },
		InputProps: { multiline: true, rows: 3 },
	},
];
