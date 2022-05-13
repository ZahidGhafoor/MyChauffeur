import { useAppSelector } from "redux/hooks";
import InputRedux from "components/molecules/InputRedux";

export default function FlightNumber(props: any) {
	const form = "AddBookingForm";
	const airport = useAppSelector(
		(state) => state.form?.[form]?.values?.pickup?.details?.airport
	);

	return airport ? <InputRedux {...props} /> : null;
}
