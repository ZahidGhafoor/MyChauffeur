import { ClassState } from ".";
import ToasterService from "utils/toaster.util";
import { SelectOption } from "components/atoms/Select";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ClassState = {
	classes: [],
	classs: null,
	loading: true,
	modelOptions: [],
	modelsDetails: {},
	classesByCity: {},
	classesOptions: [],
};

export const classSlice = createSlice({
	name: "class",
	initialState,
	reducers: {
		clear: (state) => {
			state.modelOptions = [];
			state.modelsDetails = {};
			state.classesOptions = [];
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		addClass: (state, action) => {
			let classesByCity: any = {};
			let classes = state.classes;
			classes.unshift(action.payload);
			classes.forEach((classs: any) => {
				const { city_id } = classs;
				let city_name = city_id?._id || "Undefined";
				if (classesByCity[city_name])
					classesByCity[city_name].classes.push(classs);
				else
					classesByCity[city_name] = {
						classes: [classs],
						city_name: city_id?.name,
					};
			});
			state.classes = classes;
			state.classesByCity = classesByCity;
		},
		updateClass: (state, action) => {
			const { id, classs } = action.payload;
			let classesByCity = state.classesByCity;
			state.classes.every(({ _id }, i) => {
				if (id === _id) {
					state.classes[i] = classs;
					return false;
				}
				return true;
			});
			for (const city in classesByCity) {
				if (Object.prototype.hasOwnProperty.call(classesByCity, city)) {
					let done = false;
					let element = classesByCity[city];
					element.classes.every(({ _id }: any, i: number) => {
						if (id === _id) {
							done = true;
							element.classes[i] = classs;
							return false;
						}
						return true;
					});
					if (done) break;
				}
			}
		},
		setClass: (state, action) => {
			state.classs = action.payload;
		},
		setClasses: (state, action) => {
			let details: any = {};
			let classesByCity: any = {};
			const classes = action.payload;
			let options: SelectOption[] = [];

			classes.forEach((classs: any) => {
				const { city_id } = classs;
				let city_name = city_id?._id || "Undefined";

				if (classesByCity[city_name])
					classesByCity[city_name].classes.push(classs);
				else
					classesByCity[city_name] = {
						models_length: 0,
						classes: [classs],
						city_name: city_id?.name,
					};
			});

			Object.keys(classesByCity).forEach((city_name) => {
				classesByCity[city_name].classes.forEach((classs: any) => {
					classesByCity[city_name].models_length += classs.models.length;
					classs.models.forEach((model: any) => {
						options.push({ label: model.name, value: model._id });
						details[model._id] = {
							...model,
							class_id: classs._id,
							class_name: classs.name,
						};
					});
				});
			});

			state.classes = classes;
			state.modelOptions = options;
			state.modelsDetails = details;
			state.classesByCity = classesByCity;
		},
		setClassesOptions: (state, action) => {
			const classes = action.payload;
			let options: SelectOption[] = [];

			classes.forEach(({ _id, name }: any) => {
				options.push({ value: _id, label: name });
			});

			state.classesOptions = options;
		},
		setClassesOptionsByCity: (state, action) => {
			let found = false;
			const cities = action.payload;
			let options: SelectOption[] = [];
			const classesByCity = state.classesByCity;

			for (const city of cities) {
				for (const key in classesByCity) {
					if (Object.prototype.hasOwnProperty.call(classesByCity, key)) {
						const element = classesByCity[key];

						if (city === element.city_name) {
							found = true;
							options = element.classes.map(({ _id, name }: any) => ({
								value: _id,
								label: name,
							}));
							break;
						}
					}
				}
				if (found) break;
			}

			state.classesOptions = options;

			if (options.length === 0)
				ToasterService.showError(
					"We are not Operational in selected Zone"
				);
		},

		setClassesOptionsByCityId: (state, action) => {
			const city_id = action.payload;
			const classes = state.classesByCity?.[city_id]?.["classes"] || [];

			state.classesOptions = classes.map(({ _id, name }: any) => ({
				value: _id,
				label: name,
			}));
		},
	},
});

const classReducer = classSlice.reducer;

export const classActions = classSlice.actions;
export default classReducer;
