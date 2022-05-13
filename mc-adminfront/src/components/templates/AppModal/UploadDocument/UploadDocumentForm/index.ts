import SelectExpiryDate from "./SelectExpiryDate";
import { date, file, required } from "utils/validate.util";
import FileUploadRedux from "components/molecules/FileUploadRedux";
import { ReduxFormField } from "components/molecules/ReduxFormFields";

export { default } from "./UploadDocumentForm";

export const fields: ReduxFormField[] = [
	{
		name: "image",
		label: "Document To Upload",
		validate: [required, file],
		component: FileUploadRedux,
		cellProps: { md: 12, lg: 12 },
		FileUploadProps: {
			maxSize: 5,
			accept: [".pdf", ".jpg", ".jpeg", ".png"],
		},
	},
	{
		name: "expiry_date",
		label: "Expiry Date",
		validate: [date],
		component: SelectExpiryDate,
		cellProps: { md: 12, lg: 12 },
		DatePickerProps: {
			onChange: () => {},
			minDate: new Date(),
			InputFieldProps: {},
			value: { date: "", error: false },
		},
	},
];
