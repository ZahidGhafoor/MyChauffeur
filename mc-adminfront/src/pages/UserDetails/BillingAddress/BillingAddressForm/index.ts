import { required } from "utils/validate.util";
import InputRedux from "components/molecules/InputRedux";
import { ReduxFormField } from "components/molecules/ReduxFormFields";

export { default } from "./BillingAddressForm";

export const fields: ReduxFormField[] = [
	{
		name: "name",
		label: "Name",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 12 },
	},
	{
		name: "street_address",
		label: "Street",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 12 },
	},
	{
		name: "postal_number",
		label: "Postal code",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 12 },
	},
	{
		name: "city",
		label: "City",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 12 },
	},
	{
		name: "country",
		label: "Country",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 12 },
	},
];
