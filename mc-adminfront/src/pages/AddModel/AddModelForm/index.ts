import {
	digit,
	number,
	positive,
	required,
	greaterThan0,
} from "utils/validate.util";
import InputRedux from "components/molecules/InputRedux";
import SelectCity from "components/organisms/SelectCity";
import SelectClass from "components/organisms/SelectClass";
import CheckboxRedux from "components/molecules/CheckboxRedux";
import { ReduxFormField } from "components/molecules/ReduxFormFields";

export { default } from "./AddModelForm";

export const fields: ReduxFormField[] = [
	{
		name: "is_active",
		label: "Active",
		component: CheckboxRedux,
		cellProps: { md: 12 },
	},
	{
		name: "city_id",
		label: "City",
		validate: [required],
		component: SelectCity,
		cellProps: { md: 6, lg: 6 },
		SelectProps: { disabledOnUpdate: true },
	},
	{
		name: "class_id",
		label: "Class",
		validate: [required],
		component: SelectClass,
		cellProps: { md: 6, lg: 6 },
		SelectProps: { disabledOnUpdate: true },
	},
	{
		name: "name",
		label: "Name",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 6, lg: 6 },
	},
	{
		name: "max_age",
		label: "Max Age",
		validate: [required, number, positive, greaterThan0, digit],
		component: InputRedux,
		cellProps: { md: 6, lg: 6 },
	},
];
