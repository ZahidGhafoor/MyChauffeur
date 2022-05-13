import SameAsAddress from "./SameAsAddress";
import SelectCities from "./SelectCities/SelectCities";
import InputRedux from "components/molecules/InputRedux";
import PhoneInputRedux from "components/molecules/PhoneInputRedux";
import ReduxFormSection from "components/organisms/ReduxFormSection";
import { ReduxFormField } from "components/molecules/ReduxFormFields/index";
import {
	email,
	phone,
	required,
	phoneSimple,
	requiredPhone,
	requiredSelect,
} from "utils/validate.util";
import SelectRedux from "components/molecules/SelectRedux";

export { default } from "./AddPartnerForm";

const address: ReduxFormField[] = [
	{
		name: "street",
		label: "Street Address",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 6, lg: 6 },
	},
	{
		name: "postal_code",
		label: "Postal Code",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 6, lg: 6 },
	},
	{
		name: "city",
		label: "City",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 6, lg: 6 },
	},
	{
		name: "country",
		label: "Country",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 6, lg: 6 },
	},
];
export const fields: ReduxFormField[] = [
	{
		name: "city_ids",
		label: "Cities",
		validate: [requiredSelect],
		component: SelectCities,
		cellProps: { md: 6, lg: 6 },
		ComboBoxProps: {
			multiple: true,
			freeSolo: false,
			options: [],
		},
	},
	{
		name: "company_details",
		label: "Company",
		reduxFormComponent: "FormSection",
		component: ReduxFormSection,
		fieldsArray: [
			{
				name: "company_name",
				label: "Company Name",
				validate: [required],
				component: InputRedux,
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
				InputProps: {
					type: "email",
				},
			},
			{
				name: "phone",
				label: "Primary Phone",
				validate: [requiredPhone, phone],
				component: PhoneInputRedux,
				cellProps: { md: 6, lg: 6 },
			},
			{
				name: "mobile",
				label: "Secondary Phone",
				validate: [phoneSimple],
				component: InputRedux,
				cellProps: { md: 6, lg: 6 },
				InputProps: {
					type: "tel",
				},
			},
			{
				name: "VAT_number",
				label: "VAT (DE XXX XXX XX)",
				validate: [required],
				component: InputRedux,
				cellProps: { md: 6, lg: 6 },
			},
			{
				name: "registration_number",
				label: "Registration (HRB XXX XXX) (Optional)",
				component: InputRedux,
				cellProps: { md: 6, lg: 6 },
			},
		],
	},
	{
		name: "address",
		label: "Address",
		reduxFormComponent: "FormSection",
		component: ReduxFormSection,
		fieldsArray: address,
	},
	{
		name: "billing_address",
		label: "Billing Address",
		reduxFormComponent: "FormSection",
		component: ReduxFormSection,
		fieldsArray: [
			{
				name: "same",
				label: "Same as Address",
				component: SameAsAddress,
				cellProps: { md: 12 },
			},
			...address,
		],
	},
	{
		name: "bank_details",
		label: "Bank",
		reduxFormComponent: "FormSection",
		component: ReduxFormSection,
		fieldsArray: [
			{
				name: "account_title",
				label: "Account Title",
				validate: [required],
				component: InputRedux,
				cellProps: { md: 6, lg: 6 },
			},
			{
				name: "iban",
				label: "IBAN",
				validate: [required],
				component: InputRedux,
				cellProps: { md: 6, lg: 6 },
			},
			{
				name: "bic",
				label: "BIC (Optional)",
				component: InputRedux,
				cellProps: { md: 6, lg: 6 },
			},
		],
	},
];
