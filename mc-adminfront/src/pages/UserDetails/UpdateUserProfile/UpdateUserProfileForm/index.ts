import { email, required } from "utils/validate.util";
import InputRedux from "components/molecules/InputRedux";
import SelectRedux from "components/molecules/SelectRedux";
import PhoneInputRedux from "components/molecules/PhoneInputRedux";
import { ReduxFormField } from "components/molecules/ReduxFormFields";

export { default } from "./UpdateUserProfileForm";

export const fields: ReduxFormField[] = [
	{
		name: "title",
		label: "Title",
		validate: [required],
		component: SelectRedux,
		SelectProps: {
			options: [
				{ value: "Mr.", label: "Mr." },
				{ value: "Mrs.", label: "Mrs." },
				{ value: "Mx.", label: "Mx." },
			],
		},
		cellProps: { lg: 12 },
	},
	{
		name: "first_name",
		label: "First Name",
		validate: [required],
		component: InputRedux,
		cellProps: { lg: 12 },
	},
	{
		name: "last_name",
		label: "Last Name",
		validate: [required],
		component: InputRedux,
		cellProps: { lg: 12 },
	},
	{
		name: "email",
		label: "Email",
		validate: [required, email],
		component: InputRedux,
		cellProps: { lg: 12 },
		InputProps: {
			type: "email",
		},
	},
	{
		name: "phone",
		label: "Phone",
		validate: [required],
		component: PhoneInputRedux,
		cellProps: { lg: 12 },
	},
];
