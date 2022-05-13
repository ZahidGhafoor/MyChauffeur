import SelectModel from "./SelectModel";
import { required } from "utils/validate.util";
import InputRedux from "components/molecules/InputRedux";
import SelectProductionYear from "./SelectProductionYear";
import SelectPartner from "components/organisms/SelectPartner";
import { ReduxFormField } from "components/molecules/ReduxFormFields";

export { default } from "./AddVehicleForm";

export const fields: ReduxFormField[] = [
	{
		name: "partner_id",
		label: "Partner",
		validate: [required],
		component: SelectPartner,
		cellProps: { md: 6, lg: 6 },
	},
	{
		name: "model_id",
		label: "Model",
		validate: [required],
		component: SelectModel,
		cellProps: { md: 6, lg: 6 },
	},
	{
		name: "year",
		label: "Production Year",
		component: SelectProductionYear,
		cellProps: { md: 6, lg: 6 },
	},
	{
		name: "color",
		label: "Color",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 6, lg: 6 },
	},
	{
		name: "license_plate",
		label: "License Plate",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 6, lg: 6 },
	},
	{
		name: "class",
		label: "Class",
		component: InputRedux,
		InputProps: { disabled: true },
		cellProps: { md: 6, lg: 6 },
	},
];
