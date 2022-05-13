import InputRedux from "components/molecules/InputRedux";
import { ReduxFormField } from "components/molecules/ReduxFormFields";
import {
	digit,
	number,
	positive,
	required,
	greaterThan0,
} from "utils/validate.util";

export { default } from "./AddRandomCouponForm";

export const fields: ReduxFormField[] = [
	{
		name: "coupon_count",
		label: "Coupon Count",
		validate: [required, number, positive, digit, greaterThan0],
		component: InputRedux,
		cellProps: { md: 12 },
		InputProps: { size: "small" },
	},
];
