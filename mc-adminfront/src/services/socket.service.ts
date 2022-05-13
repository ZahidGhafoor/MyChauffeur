import io from "socket.io-client";
import { AppDispatch } from "redux/store";
import { log } from "../utils/logger.util";
import { bookingActions } from "redux/slices/booking";

let socket: any;

const SocketService = {
	connect: (
		{ _id, first_name, last_name }: any,
		dispatch: AppDispatch
	) => {
		let data = JSON.stringify({
			id: _id,
			role: "admin",
			name: `${first_name} ${last_name}`,
		});

		socket = io(`${process.env.REACT_APP_SOCKET_URL}`, {
			query: { data },
		});

		log("socket init");

		socket.on("connect", () => {
			log("socket connected", socket.id);
		});

		socket.on("disconnect", (reason: any) => {
			log("socket disconnected", reason);
		});

		socket.on("connect_error", (e: any) => {
			log("socket connect_error", e.message);
			// socket.connect();
		});

		socket.onAny((event: any, ...args: any) => {
			log("socket event", { event, args });
		});

		socket.on("new_order_market", (booking: any) => {
			if (booking) {
				dispatch(bookingActions.updateBookingDetails(booking));
				dispatch(bookingActions.newBooking({ type: "market", booking }));
			}
		});

		socket.on("remove_order_market", (id: any) => {
			if (id)
				dispatch(bookingActions.removeBooking({ type: "market", id }));
		});

		socket.on("new_planned_order", (booking: any) => {
			if (booking) {
				dispatch(bookingActions.updateBookingDetails(booking));
				dispatch(bookingActions.newBooking({ type: "planned", booking }));
			}
		});

		socket.on("remove_planned_order", (id: any) => {
			if (id)
				dispatch(bookingActions.removeBooking({ type: "planned", id }));
		});

		socket.on("finished_planned_order", (booking: any) => {
			if (booking?._id) {
				dispatch(bookingActions.updateBookingDetails(booking));
				dispatch(
					bookingActions.newBooking({ type: "completed", booking })
				);
				dispatch(
					bookingActions.removeBooking({
						type: "planned",
						id: booking._id,
					})
				);
			}
		});

		socket.on("update_status_order", (booking: any) => {
			if (booking?._id) {
				dispatch(bookingActions.updateBookingDetails(booking));
				dispatch(
					bookingActions.updateBooking({
						booking,
						id: booking._id,
						type: "planned",
					})
				);
			}
		});
	},

	disconnect: () => {
		if (!socket) return;

		socket.disconnect();
	},
};

export default SocketService;
