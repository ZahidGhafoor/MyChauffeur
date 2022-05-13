import { required } from "utils/validate.util";
import InputRedux from "components/molecules/InputRedux";
import CheckboxRedux from "components/molecules/CheckboxRedux";
import { ReduxFormField } from "components/molecules/ReduxFormFields";

export { default } from "./CancelBookingForm";

export const fields: ReduxFormField[] = [
	{
		name: "cancellation_reason",
		label: "Reason",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 12 },
		InputProps: { multiline: true, rows: 3 },
	},
	{
		name: "isMail_user",
		label: "Mail User",
		component: CheckboxRedux,
		cellProps: { md: 6 },
	},
	{
		name: "isText_user",
		label: "Text User",
		component: CheckboxRedux,
		cellProps: { md: 6 },
	},
	{
		name: "is_refund",
		label: "Refund",
		component: CheckboxRedux,
		cellProps: { md: 6 },
	},
	{
		name: "isMail_driver",
		label: "Mail Driver",
		component: CheckboxRedux,
		cellProps: { md: 6 },
	},
];
