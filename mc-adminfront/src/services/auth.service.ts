import http from "./http.service";
import { AppDispatch } from "redux/store";
import SocketService from "./socket.service";
import Promisable from "./promisable.service";
import { authActions } from "redux/slices/auth";
import OneSignalService from "./onesignal.service";
import { getAppDispatch } from "utils/dispatch.util";

const AuthService = {
	login: async (data: any, dispatch: AppDispatch) => {
		dispatch(authActions.setLoading(true));

		const [success, error]: any = await Promisable.asPromise(
			http.post(`/login`, data)
		);

		if (success) {
			const { admin, token } = success.data.data;

			localStorage.setItem("token", `Bearer ${token}`);
			dispatch(authActions.setUser(admin));

			OneSignalService.connect(admin._id);
			SocketService.connect(admin, dispatch);
		}

		dispatch(authActions.setLoading(false));
		return [success, error];
	},

	logout: () => {
		const dispatch = getAppDispatch();

		SocketService.disconnect();
		OneSignalService.disconnect();

		localStorage.removeItem("token");

		dispatch?.(authActions.logout());
		dispatch?.(authActions.setUser(null));
	},
};
export default AuthService;
