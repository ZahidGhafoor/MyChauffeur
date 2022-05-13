import { SelectOption } from "components/atoms/Select";

export { default, classActions, classSlice } from "./classSlice";

export interface ClassState {
	classs: any;
	classes: any[];
	loading: boolean;
	modelsDetails: any;
	classesByCity: any;
	modelOptions: SelectOption[];
	classesOptions: SelectOption[];
}
