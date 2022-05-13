import http from "./http.service";
import { AppDispatch } from "redux/store";
import Promisable from "./promisable.service";
import { modalActions } from "redux/slices/modal";
import { NavigateFunction } from "react-router-dom";
import { loaderActions } from "redux/slices/loader";
import { vehicleActions } from "redux/slices/vehicle";
import { formLoaderActions } from "redux/slices/formLoader";

const url = "/vehicle";

const VehicleService = {
	addVehicle: async (
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
			const { vehicle } = success.data.data;
			dispatch?.(vehicleActions.addVehicle(vehicle));

			navigate?.(`/vehicle-details/${success.data.data.vehicle._id}`);
		}
		dispatch?.(formLoaderActions.setLoading(false));
		return [success, error];
	},
	updatevehicle: async (
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
			const { vehicle } = success.data.data;
			dispatch?.(vehicleActions.updateVehicle({ id, vehicle }));
			navigate?.(`/vehicle-details/${id}`);
		}
		dispatch?.(formLoaderActions.setLoading(false));
		return [success, error];
	},
	getVehicle: async (id: string, dispatch?: AppDispatch) => {
		dispatch?.(loaderActions.setLoading(true));
		http.setJWT();
		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}/${id}`)
		);
		if (success) {
			const { vehicle } = success.data.data;
			dispatch?.(vehicleActions.setVehicle(vehicle));
		} else dispatch?.(vehicleActions.setVehicle({ data: "Not Found" }));
		dispatch?.(loaderActions.setLoading(false));
		return [success, error];
	},
	getAllVehicles: async (dispatch?: AppDispatch) => {
		dispatch?.(vehicleActions.setLoading(true));
		http.setJWT();
		const [success, error]: any = await Promisable.asPromise(
			http.get(`${url}`)
		);
		if (success) {
			const { vehicles } = success.data.data;
			dispatch?.(vehicleActions.setVehicles(vehicles));
		}
		dispatch?.(vehicleActions.setLoading(false));
		return [success, error];
	},
	uploadVehicleDocs: async (
		id: string,
		data: any,
		dispatch?: AppDispatch
	) => {
		dispatch?.(modalActions.setLoading(true));
		http.setJWT();
		http.setMultiPart();
		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}/upload/${id}`, data)
		);
		if (success) {
			const { vehicle } = success.data.data;
			dispatch?.(vehicleActions.setVehicle(vehicle));
			dispatch?.(modalActions.closeModal());
		}
		dispatch?.(modalActions.setLoading(false));
		return [success, error];
	},
	updateVehicleStatus: async (
		id: string,
		data: any,
		dispatch?: AppDispatch
	) => {
		dispatch?.(modalActions.setLoading(true));
		http.setJWT();
		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}/status/${id}`, data)
		);
		if (success) {
			const { vehicle } = success.data.data;
			dispatch?.(vehicleActions.setVehicle(vehicle));
			dispatch?.(modalActions.closeModal());
		}
		dispatch?.(modalActions.setLoading(false));
		return [success, error];
	},
	updateVehicleDocsStatus: async (
		id: string,
		data: any,
		dispatch?: AppDispatch
	) => {
		dispatch?.(modalActions.setLoading(true));
		http.setJWT();
		const [success, error]: any = await Promisable.asPromise(
			http.post(`${url}/document/status/${id}`, data)
		);
		if (success) {
			const { vehicle } = success.data.data;
			dispatch?.(vehicleActions.setVehicle(vehicle));
			dispatch?.(modalActions.closeModal());
		}
		dispatch?.(modalActions.setLoading(false));
		return [success, error];
	},
};

export default VehicleService;
