import http from "./http.service";
import { AppDispatch } from "redux/store";
import Promisable from "./promisable.service";
import { modelActions } from "redux/slices/model";
import { NavigateFunction } from "react-router-dom";
import { loaderActions } from "redux/slices/loader";
import { formLoaderActions } from "redux/slices/formLoader";

const url = "/models";

const ModelService = {
	addModel: async (
		data: any,
		dispatch?: AppDispatch,
		navigate?: NavigateFunction
	) => {
		dispatch?.(formLoaderActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}`, data)
		);

		if (success) navigate?.("/models");

		dispatch?.(formLoaderActions.setLoading(false));
		return [success, error];
	},

	updateModel: async (
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

		if (success) navigate?.("/models");

		dispatch?.(formLoaderActions.setLoading(false));
		return [success, error];
	},

	getModel: async (id: string, dispatch?: AppDispatch) => {
		dispatch?.(loaderActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}/${id}`)
		);

		if (success) {
			const { model } = success.data.data;
			dispatch?.(modelActions.setModel(model));
		} else dispatch?.(modelActions.setModel({ data: "Not Found" }));

		dispatch?.(loaderActions.setLoading(false));
		return [success, error];
	},
};

export default ModelService;
