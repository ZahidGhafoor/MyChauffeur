import {
	BookingLoadingPayload,
	BookingState,
	BookingType,
	NewBookingPayload,
	RemoveBookingPayload,
	SetBookingsPayload,
	SetFiltersPayload,
	SetPagePayload,
	UpdateBookingPayload,
} from ".";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const default_page_size = Number(`${process.env.REACT_APP_PAGE_SIZE}`);
const arr: BookingType[] = [
	"admin",
	"market",
	"planned",
	"completed",
	"review",
];
const initialBooking = {
	count: 0,
	bookings: [],
	loading: true,
	current_filters: {},
	filters: { page: 1, page_size: default_page_size },
};
const initialState: BookingState = {
	tab: 0,
	refresh: 0,
	booking: null,
	loading: true,
	refreshLoader: false,
	admin: initialBooking,
	market: initialBooking,
	review: initialBooking,
	planned: initialBooking,
	completed: initialBooking,
};

export const bookingSlice = createSlice({
	name: "booking",
	initialState,
	reducers: {
		refresh: (state) => {
			state.refresh += 1;
			state.refreshLoader = true;
		},
		setTab: (state, action: PayloadAction<number>) => {
			state.tab = action.payload;
		},
		setPage: (state, action: PayloadAction<SetPagePayload>) => {
			const { type, page } = action.payload;
			state[type].filters.page = page;
			state.refresh += 1;
			state.refreshLoader = true;
		},
		resetPage: (state, action: PayloadAction<BookingType>) => {
			const type = action.payload;
			state[type].filters.page = 1;
		},
		setFilters: (state, action: PayloadAction<SetFiltersPayload>) => {
			const { type, data } = action.payload;
			state[type].filters = data;
			state.refreshLoader = true;
		},
		resetFilters: (state) => {
			state.refresh += 1;
			state.refreshLoader = true;
			state[arr[state.tab]].filters = initialBooking.filters;
			state[arr[state.tab]].current_filters =
				initialBooking.current_filters;
		},
		setCurrentFilters: (
			state,
			action: PayloadAction<SetFiltersPayload>
		) => {
			const { type, data } = action.payload;
			state[type].current_filters = data;
		},
		setLoader: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setLoading: (state, action: PayloadAction<BookingLoadingPayload>) => {
			const { type, loading } = action.payload;
			state[type].loading = loading;
		},
		newBooking: (state, action: PayloadAction<NewBookingPayload>) => {
			const { type, booking } = action.payload;
			state[type].count += 1;
			state[type].bookings.unshift(booking);
		},
		updateBooking: (
			state,
			action: PayloadAction<UpdateBookingPayload>
		) => {
			const { id, type, booking } = action.payload;
			state[type].bookings.every(({ _id }, i) => {
				if (id === _id) {
					state[type].bookings[i] = booking;
					return false;
				}
				return true;
			});
		},
		removeBooking: (
			state,
			action: PayloadAction<RemoveBookingPayload>
		) => {
			const { id, type } = action.payload;
			state[type].bookings.every(({ _id }, i) => {
				if (id === _id) {
					state[type].count -= 1;
					state[type].bookings.splice(i, 1);
					return false;
				}
				return true;
			});
		},
		setBooking: (state, action) => {
			state.booking = action.payload;
		},
		updateBookingDetails: (state, action) => {
			const booking = action.payload;
			if (booking?._id === state.booking?._id) state.booking = booking;
		},
		setBookings: (state, action: PayloadAction<SetBookingsPayload>) => {
			const { type, count, bookings } = action.payload;

			state.refreshLoader = false;

			state[type].count = count;
			state[type].bookings = bookings;
		},
		sendMarket: (state, action: PayloadAction<UpdateBookingPayload>) => {
			const { id, type, booking } = action.payload;

			state[type].bookings.every(({ _id }, i) => {
				if (id === _id) {
					state[type].count -= 1;
					state["market"].count += 1;
					state[type].bookings.splice(i, 1);
					state["market"].bookings.unshift(booking);
					return false;
				}
				return true;
			});
		},
		acceptMarket: (state, action: PayloadAction<UpdateBookingPayload>) => {
			const { id, type, booking } = action.payload;
			state[type].bookings.every(({ _id }, i) => {
				if (id === _id) {
					state[type].count -= 1;
					state["planned"].count += 1;
					state[type].bookings.splice(i, 1);
					state["planned"].bookings.unshift(booking);
					return false;
				}
				return true;
			});
		},
	},
});

const bookingReducer = bookingSlice.reducer;

export const bookingActions = bookingSlice.actions;
export default bookingReducer;
