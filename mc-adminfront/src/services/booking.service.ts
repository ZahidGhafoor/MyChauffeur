import http from "./http.service";
import { AppDispatch } from "redux/store";
import Promisable from "./promisable.service";
import { modalActions } from "redux/slices/modal";
import { BookingType } from "redux/slices/booking";
import { NavigateFunction } from "react-router-dom";
import { bookingActions } from "redux/slices/booking";

const url = "/trip";

const BookingService = {
	addBooking: async (
		data: any,
		dispatch?: AppDispatch,
		navigate?: NavigateFunction
	) => {
		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}`, data)
		);

		if (success) {
			const { trip } = success.data.data;
			dispatch?.(
				bookingActions.newBooking({ type: "admin", booking: trip })
			);
			navigate?.("/bookings");
		}

		return [success, error];
	},

	updateBooking: async (
		id: string,
		data: any,
		dispatch?: AppDispatch,
		navigate?: NavigateFunction
	) => {
		dispatch?.(modalActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}/update/${id}`, data)
		);

		if (success) {
			const { trip } = success.data.data;
			dispatch?.(bookingActions.setBooking(trip));
			navigate?.(`/booking-details/${id}`);
		}

		dispatch?.(modalActions.setLoading(false));
		return [success, error];
	},

	getBooking: async (id: string, dispatch?: AppDispatch) => {
		dispatch?.(bookingActions.setLoader(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}/${id}`)
		);

		if (success) {
			const { trip } = success.data.data;
			dispatch?.(bookingActions.setBooking(trip));
		} else dispatch?.(bookingActions.setBooking({ data: "Not Found" }));

		dispatch?.(bookingActions.setLoader(false));
		return [success, error];
	},

	getBookings: async (
		type: BookingType,
		data: any,
		dispatch?: AppDispatch
	) => {
		dispatch?.(bookingActions.setLoading({ type, loading: true }));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}/${type}`, data)
		);

		if (success) {
			const { trips, count } = success.data.data;
			dispatch?.(
				bookingActions.setBookings({ type, count, bookings: trips })
			);
		}

		dispatch?.(bookingActions.setLoading({ type, loading: false }));

		return [success, error];
	},

	sendToMarket: async (
		id: string,
		type: BookingType,
		dispatch?: AppDispatch
	) => {
		dispatch?.(modalActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}/sendtomarket/${id}`)
		);

		if (success) {
			const { trip } = success.data.data;
			dispatch?.(modalActions.closeModal());
			dispatch?.(bookingActions.setBooking(trip));
			dispatch?.(bookingActions.sendMarket({ id, type, booking: trip }));
		}
		dispatch?.(modalActions.setLoading(false));
		return [success, error];
	},

	acceptFromMarket: async (
		id: string,
		type: BookingType,
		dispatch?: AppDispatch
	) => {
		dispatch?.(modalActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}/acceptfrommarket/${id}`)
		);

		if (success) {
			const { trip } = success.data.data;
			dispatch?.(modalActions.closeModal());
			dispatch?.(bookingActions.setBooking(trip));
			dispatch?.(bookingActions.acceptMarket({ id, type, booking: trip }));
		}
		dispatch?.(modalActions.setLoading(false));
		return [success, error];
	},

	assignBooking: async (id: any, data: any, dispatch?: AppDispatch) => {
		dispatch?.(modalActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}/assign/${id}`, data)
		);

		if (success) {
			const { trip } = success.data.data;
			dispatch?.(modalActions.closeModal());
			dispatch?.(bookingActions.setBooking(trip));
		}

		dispatch?.(modalActions.setLoading(false));
		return [success, error];
	},

	unassignBooking: async (id: any, dispatch?: AppDispatch) => {
		dispatch?.(modalActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}/unassign/${id}`)
		);

		if (success) {
			const { trip } = success.data.data;
			dispatch?.(modalActions.closeModal());
			dispatch?.(bookingActions.setBooking(trip));
		}

		dispatch?.(modalActions.setLoading(false));
		return [success, error];
	},

	cancelBooking: async (id: any, data: any, dispatch?: AppDispatch) => {
		dispatch?.(modalActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}/cancel/${id}`, data)
		);

		if (success) {
			const { trip } = success.data.data;
			dispatch?.(modalActions.closeModal());
			dispatch?.(bookingActions.setBooking(trip));
		}

		dispatch?.(modalActions.setLoading(false));
		return [success, error];
	},

	updateBookingStatus: async (
		id: any,
		data: any,
		dispatch?: AppDispatch
	) => {
		dispatch?.(modalActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}/update-status/${id}`, data)
		);

		if (success) {
			const { trip } = success.data.data;
			dispatch?.(modalActions.closeModal());
			dispatch?.(bookingActions.setBooking(trip));
		}

		dispatch?.(modalActions.setLoading(false));
		return [success, error];
	},

	addBookingNotes: async (
		id: string,
		data: any,
		dispatch?: AppDispatch
	) => {
		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}/note/${id}`, data)
		);

		if (success) {
			const { trip } = success.data.data;
			dispatch?.(bookingActions.setBooking(trip));
		}

		return [success, error];
	},
};

export default BookingService;
