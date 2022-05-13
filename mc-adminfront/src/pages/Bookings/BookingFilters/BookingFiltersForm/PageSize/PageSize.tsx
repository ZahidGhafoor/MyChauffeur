import { useEffect } from "react";
import { change } from "redux-form";
import { useAppDispatch } from "redux/hooks";
import InputRedux from "components/molecules/InputRedux";

export default function PageSize(props: any) {
	const form = "BookingFiltersForm";
	const dispatch = useAppDispatch();
	const default_page_size = Number(`${process.env.REACT_APP_PAGE_SIZE}`);

	useEffect(() => {
		dispatch(change(form, "page_size", default_page_size));
	}, [default_page_size, dispatch, form]);

	return (
		<InputRedux
			{...props}
			handleBlur={(e: any) => {
				if (!e.target.value)
					dispatch(change(form, "page_size", default_page_size));
			}}
		/>
	);
}
