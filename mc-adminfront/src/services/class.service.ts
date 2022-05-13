import http from "./http.service";
import { AppDispatch } from "redux/store";
import Promisable from "./promisable.service";
import { NavigateFunction } from "react-router-dom";
import { classActions } from "redux/slices/class";
import { loaderActions } from "redux/slices/loader";
const url = "/class";
const ClassService = {
	addClass: async (
		data: any,
		dispatch?: AppDispatch,
		navigate?: NavigateFunction
	) => {
		dispatch?.(loaderActions.setLoading(true));
		http.setJWT();
		http.setMultiPart();
		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}`, data)
		);
		if (success) {
			const { classs } = success.data.data;
			dispatch?.(classActions.addClass(classs));
			navigate?.("/class");
		}
		dispatch?.(loaderActions.setLoading(false));
		return [success, error];
	},
	updateClass: async (
		id: string,
		data: any,
		dispatch?: AppDispatch,
		navigate?: NavigateFunction
	) => {
		dispatch?.(loaderActions.setLoading(true));
		http.setJWT();
		http.setMultiPart();
		const [success, error]: any = await Promisable.asPromise(
			http.patch(`${url}/${id}`, data)
		);
		if (success) {
			const { classs } = success.data.data;
			dispatch?.(classActions.updateClass({ id, classs }));
			navigate?.("/class");
		}
		dispatch?.(loaderActions.setLoading(false));
		return [success, error];
	},
	getClass: async (id: string, dispatch?: AppDispatch) => {
		dispatch?.(loaderActions.setLoading(true));
		http.setJWT();
		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}/${id}`)
		);
		if (success) {
			const { classs } = success.data.data;
			dispatch?.(classActions.setClass(classs));
		} else dispatch?.(classActions.setClass({ data: "Not Found" }));
		dispatch?.(loaderActions.setLoading(false));
		return [success, error];
	},
	getAllClasses: async (dispatch?: AppDispatch) => {
		dispatch?.(classActions.setLoading(true));
		http.setJWT();
		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}`)
		);
		if (success) {
			const { classes } = success.data.data;
			dispatch?.(classActions.setClasses(classes));
		}
		dispatch?.(classActions.setLoading(false));
		return [success, error];
	},

	getAllClassesByCity: async (data: any, dispatch?: AppDispatch) => {
		dispatch?.(classActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}/city`, data)
		);

		if (success) {
			const { classes } = success.data.data;
			dispatch?.(classActions.setClassesOptions(classes));
		}

		dispatch?.(classActions.setLoading(false));

		return [success, error];
	},
};
export default ClassService;
