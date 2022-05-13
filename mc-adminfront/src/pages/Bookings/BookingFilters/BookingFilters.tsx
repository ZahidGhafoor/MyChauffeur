import format from "date-fns/format";
import { useAppDispatch } from "redux/hooks";
import { bookingActions } from "redux/slices/booking";
import { BookingFiltersProps } from ".";
import BookingFiltersForm from "./BookingFiltersForm";
import PersistFilters from "./PersistFilters";

export default function BookingFilters({ type }: BookingFiltersProps) {
	const form = "BookingFiltersForm";
	const dispatch = useAppDispatch();

	const handleSubmit = (values: any) => {
		const default_page_size = Number(`${process.env.REACT_APP_PAGE_SIZE}`);
		let data: any = { page: 1, page_size: default_page_size };
		const { driver_id, page_size, booking_number, date } = values;

		if (driver_id) data.driver_id = driver_id;
		if (page_size) data.page_size = Number(page_size);
		if (booking_number) data.booking_number = Number(booking_number);
		if (date && date.date[0] && date.date[1]) {
			data.end_date = format(new Date(date.date[1]), "yyyy-MM-dd");
			data.start_date = format(new Date(date.date[0]), "yyyy-MM-dd");
		}

		dispatch(bookingActions.setFilters({ data, type }));
	};

	return (
		<div className="filters">
			<BookingFiltersForm onSubmit={handleSubmit} />
			<PersistFilters form={form} type={type} />
		</div>
	);
}
