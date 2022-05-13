export { default, bookingActions, bookingSlice } from "./bookingSlice";

export enum BOOKING {
	admin = "admin",
	market = "market",
	planned = "planned",
	completed = "completed",
	review = "review",
}

export type BookingType = keyof typeof BOOKING;

export interface BookingLoadingPayload {
	loading: boolean;
	type: BookingType;
}

export interface SetPagePayload {
	page: number;
	type: BookingType;
}

export interface SetFiltersPayload {
	data: any;
	type: BookingType;
}

export interface NewBookingPayload {
	booking: any;
	type: BookingType;
}

export interface UpdateBookingPayload {
	id: any;
	booking: boolean;
	type: BookingType;
}

export interface SetBookingsPayload {
	count: number;
	bookings: any[];
	type: BookingType;
}

export interface RemoveBookingPayload {
	id: any;
	type: BookingType;
}

export interface IBookings {
	filters: any;
	count: number;
	bookings: any[];
	loading: boolean;
	current_filters: any;
}

export interface BasicBookingState {
	tab: number;
	booking: any;
	refresh: number;
	loading: boolean;
	refreshLoader: boolean;
}

export type BookingState = BasicBookingState & {
	[key in BOOKING]: IBookings;
};
