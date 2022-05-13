import { BookingType } from "redux/slices/booking";

export { default } from "./BookingsList";

export interface BookingsListProps {
	type: BookingType;
	showFilters?: Boolean;
}
