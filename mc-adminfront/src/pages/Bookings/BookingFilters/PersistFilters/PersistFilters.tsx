import { useEffect } from "react";
import { change } from "redux-form";
import { PersistFiltersProps } from ".";
import useEffectOnce from "hooks/useEffectOnce";
import { bookingActions } from "redux/slices/booking";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function PersistFilters({
	form,
	type,
}: PersistFiltersProps) {
	const dispatch = useAppDispatch();
	const formValues = useAppSelector((state) => state.form?.[form]?.values);
	const current_filters = useAppSelector(
		(state) => state.booking[type].current_filters
	);

	useEffectOnce(() => {
		for (const key in current_filters) {
			if (Object.prototype.hasOwnProperty.call(current_filters, key)) {
				const element = current_filters[key];
				dispatch(change(form, key, element));
			}
		}
	});

	useEffect(() => {
		if (!formValues) return;

		dispatch(bookingActions.setCurrentFilters({ type, data: formValues }));
	}, [dispatch, form, formValues, type]);

	return null;
}
