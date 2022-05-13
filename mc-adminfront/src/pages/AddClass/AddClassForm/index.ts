import {
	file,
	digit,
	number,
	positive,
	required,
	greaterThan0,
} from "utils/validate.util";
import SelectCity from "components/organisms/SelectCity";
import InputRedux from "components/molecules/InputRedux";
import CheckboxRedux from "components/molecules/CheckboxRedux";
import FileUploadRedux from "components/molecules/FileUploadRedux";
import { ReduxFormField } from "components/molecules/ReduxFormFields";

export { default } from "./AddClassForm";

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
		name: "name",
		label: "Name",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 6, lg: 6 },
	},
	{
		name: "text",
		label: "Text",
		validate: [required],
		component: InputRedux,
		cellProps: { md: 12 },
	},
	{
		name: "max_persons",
		label: "Max Persons",
		validate: [required, number, positive, greaterThan0, digit],
		component: InputRedux,
		cellProps: { md: 4, lg: 4 },
	},
	{
		name: "max_bags",
		label: "Max Bags",
		validate: [required, number, positive, greaterThan0, digit],
		component: InputRedux,
		cellProps: { md: 4, lg: 4 },
	},
	{
		name: "rank",
		label: "Rank",
		validate: [required, number, positive, greaterThan0, digit],
		component: InputRedux,
		cellProps: { md: 4, lg: 4 },
	},
	{
		name: "image",
		label: "Class Image",
		validate: [required, file],
		component: FileUploadRedux,
		cellProps: { md: 12, lg: 12 },
		FileUploadProps: {
			maxSize: 5,
			accept: [".jpg", ".jpeg", ".png"],
		},
	},
];
