import { couponCode } from "utils/normalize.util";
import InputRedux from "components/molecules/InputRedux";
import { required, maxLength8 } from "utils/validate.util";
import { ReduxFormField } from "components/molecules/ReduxFormFields";

export { default } from "./AddCouponForm";

export const fields: ReduxFormField[] = [
	{
		name: "coupon_code",
		label: "Coupon Code",
		normalize: couponCode,
		validate: [required, maxLength8],
		component: InputRedux,
		cellProps: { md: 12 },
		InputProps: { size: "small" },
	},
];
