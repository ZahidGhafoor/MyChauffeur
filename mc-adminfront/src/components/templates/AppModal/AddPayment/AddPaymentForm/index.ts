import InputRedux from "components/molecules/InputRedux";
import { ReduxFormField } from "components/molecules/ReduxFormFields";

export { default } from "./AddPaymentForm";

export const fields: ReduxFormField[] = [
	{
		name: "card_number",
		label: "Card Number",
		component: InputRedux,
		cellProps: { md: 12 },
	},
	{
		name: "expiry",
		label: "Expiry",
		component: InputRedux,
		cellProps: { md: 6 },
	},
	{
		name: "cvv",
		label: "Cvv",
		component: InputRedux,
		cellProps: { md: 6 },
	},
];
