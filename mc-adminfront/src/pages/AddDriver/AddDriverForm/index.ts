import OptionService from "utils/option.util";
import InputRedux from "components/molecules/InputRedux";
import SelectRedux from "components/molecules/SelectRedux";
import ComboBoxRedux from "components/molecules/ComboBoxRedux";
import SelectPartner from "components/organisms/SelectPartner";
import PhoneInputRedux from "components/molecules/PhoneInputRedux";
import { ReduxFormField } from "components/molecules/ReduxFormFields/index";
import {
	email,
	phone,
	required,
	requiredPhone,
	requiredSelect,
} from "utils/validate.util";

export { default } from "./AddDriverForm";

export const fields: ReduxFormField[] = [
	{
		name: "partner_id",
		label: "Partner",
		validate: [required],
		component: SelectPartner,
		cellProps: { md: 6, lg: 6 },
	},
	{
		name: "title",
		label: "Title",
		validate: [required],
		component: SelectRedux,
		cellProps: { md: 6, lg: 6 },
		SelectProps: {
			options: [
				{ value: "Mr.", label: "Mr." },
				{ value: "Mrs.", label: "Mrs." },
				{ value: "Mx.", label: "Mx." },
			],
		},
	},
	{
		name: "first_name",
		label: "First Name",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 6, lg: 6 },
	},
	{
		name: "last_name",
		label: "Last Name",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 6, lg: 6 },
	},
	{
		name: "email",
		label: "Email",
		validate: [required, email],
		component: InputRedux,
		cellProps: { md: 6, lg: 6 },
		InputProps: { type: "email" },
	},
	{
		name: "phone",
		label: "Phone",
		validate: [requiredPhone, phone],
		component: PhoneInputRedux,
		cellProps: { md: 6, lg: 6 },
	},
	{
		name: "languages",
		label: "Languages",
		validate: [requiredSelect],
		component: ComboBoxRedux,
		cellProps: { md: 6, lg: 6 },
		ComboBoxProps: {
			multiple: true,
			freeSolo: false,
			options: OptionService.getLanguageOptions(),
		},
	},
];
