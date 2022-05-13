import { useEffect } from "react";
import { unregisterField } from "redux-form";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import DatePickerRedux from "components/molecules/DatePickerRedux";

export default function SelectExpiryDate(props: any) {
	const form = "UploadDocumentForm";
	const dispatch = useAppDispatch();
	const expiry_date_required = useAppSelector(
		(state) => state.modal.data?.expiry_date_required
	);

	useEffect(() => {
		if (!expiry_date_required)
			dispatch(unregisterField(form, "expiry_date"));
	}, [dispatch, expiry_date_required]);

	return expiry_date_required ? <DatePickerRedux {...props} /> : null;
}
