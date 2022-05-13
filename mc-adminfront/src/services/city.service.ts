import http from "./http.service";
import { AppDispatch } from "redux/store";
import Promisable from "./promisable.service";
import { cityActions } from "redux/slices/city";
import { NavigateFunction } from "react-router-dom";
import { loaderActions } from "redux/slices/loader";
import { formLoaderActions } from "redux/slices/formLoader";

const url = "/city";

const CityService = {
	addCity: async (
		data: any,
		dispatch?: AppDispatch,
		navigate?: NavigateFunction
	) => {
		dispatch?.(formLoaderActions.setLoading(true));
		http.setJWT();
		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}`, data)
		);
		if (success) {
			const { city } = success.data.data;
			dispatch?.(cityActions.addCity(city));
			navigate?.("/city");
		}
		dispatch?.(formLoaderActions.setLoading(false));
		return [success, error];
	},
	updateCity: async (
		id: string,
		data: any,
		dispatch?: AppDispatch,
		navigate?: NavigateFunction
	) => {
		dispatch?.(formLoaderActions.setLoading(true));
		http.setJWT();
		const [success, error]: any = await Promisable.asPromise(
			http.patch(`${url}/${id}`, data)
		);
		if (success) {
			const { city } = success.data.data;
			dispatch?.(cityActions.updateCity({ id, city }));
			navigate?.("/city");
		}
		dispatch?.(formLoaderActions.setLoading(false));
		return [success, error];
	},
	getCity: async (id: string, dispatch?: AppDispatch) => {
		dispatch?.(loaderActions.setLoading(true));
		http.setJWT();
		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}/${id}`)
		);
		if (success) {
			const { city } = success.data.data;
			dispatch?.(cityActions.setCity(city));
		} else dispatch?.(cityActions.setCity({ data: "Not Found" }));
		dispatch?.(loaderActions.setLoading(false));
		return [success, error];
	},
	getAllCities: async (dispatch?: AppDispatch) => {
		dispatch?.(cityActions.setLoading(true));
		http.setJWT();
		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}`)
		);
		if (success) {
			const { cities } = success.data.data;
			dispatch?.(cityActions.setCities(cities));
		}
		dispatch?.(cityActions.setLoading(false));
		return [success, error];
	},
};

export default CityService;
