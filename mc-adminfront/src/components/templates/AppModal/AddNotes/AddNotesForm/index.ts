import { required } from "utils/validate.util";
import InputRedux from "components/molecules/InputRedux";
import { ReduxFormField } from "components/molecules/ReduxFormFields";

export { default } from "./AddNotesForm";

export const fields: ReduxFormField[] = [
	{
		name: "notes",
		label: "Notes",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 12 },
		InputProps: { multiline: true, rows: 5 },
	},
];
