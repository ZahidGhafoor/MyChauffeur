import http from "./http.service";
import { reset } from "redux-form";
import { AppDispatch } from "redux/store";
import Promisable from "./promisable.service";
import { userActions } from "redux/slices/user";

const url = "/users";

const UserService = {
	updateUser: async (id: string, data: any, dispatch?: AppDispatch) => {
		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.patch(`${url}/${id}`, data)
		);

		if (success) {
			const { user } = success.data.data;
			dispatch?.(userActions.setUser(user));
		}

		return [success, error];
	},

	updateBillingAddress: async (
		id: string,
		data: any,
		dispatch?: AppDispatch
	) => {
		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}/updatebillingaddress/${id}`, data)
		);

		if (success) {
			const { user } = success.data.data;
			dispatch?.(userActions.setUser(user));
		}

		return [success, error];
	},

	getUser: async (id: string, dispatch?: AppDispatch) => {
		dispatch?.(userActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}/${id}`)
		);

		if (success) {
			const { user } = success.data.data;
			dispatch?.(userActions.setUser(user));
			dispatch?.(userActions.setLoading(false));
		} else dispatch?.(userActions.setUser({ data: "Not Found" }));

		dispatch?.(userActions.setLoading(false));
		return [success, error];
	},

	getUsers: async (dispatch?: AppDispatch) => {
		dispatch?.(userActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}`)
		);

		if (success) {
			const { users } = success.data.data;
			dispatch?.(userActions.setUsers(users));
		}

		dispatch?.(userActions.setLoading(false));
		return [success, error];
	},

	addPoints: async (data: any, dispatch?: AppDispatch) => {
		dispatch?.(userActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.post(`mcpoints`, data)
		);

		if (success) {
			const { user } = success.data.data;
			dispatch?.(userActions.setUser(user));
			dispatch?.(userActions.setLoading(false));
			dispatch?.(reset("AddUserPointsForm"));
		}

		dispatch?.(userActions.setLoading(false));
		return [success, error];
	},
};

export default UserService;
