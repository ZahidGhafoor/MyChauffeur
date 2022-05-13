import { useEffect } from "react";
import { change } from "redux-form";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import CheckboxRedux from "components/molecules/CheckboxRedux";

export default function SameAsAddress(props: any) {
	const form = "AddPartnerForm";
	const dispatch = useAppDispatch();
	const address = useAppSelector(
		(state) => state.form?.[form]?.values?.address
	);

	useEffect(() => {
		if (!address || props.input.value !== true) return;
		dispatch(change(form, "billing_address.street", address.street));
		dispatch(change(form, "billing_address.city", address.city));
		dispatch(change(form, "billing_address.country", address.country));
		dispatch(
			change(form, "billing_address.postal_code", address.postal_code)
		);
	}, [dispatch, address, props.input.value]);

	return <CheckboxRedux {...props} />;
}
