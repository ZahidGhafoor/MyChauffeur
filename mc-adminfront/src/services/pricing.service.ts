import http from "./http.service";
import { AppDispatch } from "redux/store";
import Promisable from "./promisable.service";
import { NavigateFunction } from "react-router-dom";
import { loaderActions } from "redux/slices/loader";
import { pricingActions } from "redux/slices/pricing";
import { formLoaderActions } from "redux/slices/formLoader";

const url = "/prices";

const PricingService = {
	addPricing: async (
		data: any,
		dispatch?: AppDispatch,
		navigate?: NavigateFunction
	) => {
		dispatch?.(formLoaderActions.setLoading(true));
		http.setJWT();
		http.setMultiPart();
		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}`, data)
		);
		if (success) {
			const { price: pricing } = success.data.data;
			dispatch?.(pricingActions.addPricing(pricing));
			navigate?.("/pricing");
		}
		dispatch?.(formLoaderActions.setLoading(false));
		return [success, error];
	},
	updatePricing: async (
		id: string,
		data: any,
		dispatch?: AppDispatch,
		navigate?: NavigateFunction
	) => {
		dispatch?.(formLoaderActions.setLoading(true));
		http.setJWT();
		http.setMultiPart();
		const [success, error]: any = await Promisable.asPromise(
			http.patch(`${url}/${id}`, data)
		);
		if (success) {
			const { price: pricing } = success.data.data;
			dispatch?.(pricingActions.updatePricing({ id, pricing }));
			navigate?.("/pricing");
		}
		dispatch?.(formLoaderActions.setLoading(false));
		return [success, error];
	},
	getPricing: async (id: string, dispatch?: AppDispatch) => {
		dispatch?.(loaderActions.setLoading(true));
		http.setJWT();
		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}/${id}`)
		);
		if (success) {
			const { price: pricing } = success.data.data;
			dispatch?.(pricingActions.setPricing(pricing));
		} else dispatch?.(pricingActions.setPricing({ data: "Not Found" }));
		dispatch?.(loaderActions.setLoading(false));
		return [success, error];
	},
	getPricingByClass: async (class_id: string, dispatch?: AppDispatch) => {
		dispatch?.(loaderActions.setLoading(true));

		http.setJWT();

		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}/class/${class_id}`)
		);

		if (success) {
			const { price: pricing } = success.data.data;

			dispatch?.(pricingActions.setPricing(pricing));
		} else dispatch?.(pricingActions.setPricing({ data: "Not Found" }));

		dispatch?.(loaderActions.setLoading(false));

		return [success, error];
	},
	getAllPricings: async (dispatch?: AppDispatch) => {
		dispatch?.(pricingActions.setLoading(true));
		http.setJWT();
		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}`)
		);
		if (success) {
			const { prices: pricings } = success.data.data;
			dispatch?.(pricingActions.setPricings(pricings));
		}
		dispatch?.(pricingActions.setLoading(false));
		return [success, error];
	},
};
export default PricingService;
