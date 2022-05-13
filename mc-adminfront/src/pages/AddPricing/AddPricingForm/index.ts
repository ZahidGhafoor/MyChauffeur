import SelectCity from "components/organisms/SelectCity";
import InputRedux from "components/molecules/InputRedux";
import SelectClass from "components/organisms/SelectClass";
import { number, positive, required } from "utils/validate.util";
import ReduxFormSection from "components/organisms/ReduxFormSection";
import { ReduxFormField } from "components/molecules/ReduxFormFields";

export { default } from "./AddPricingForm";

export const fields: ReduxFormField[] = [
	{
		name: "city_id",
		label: "City",
		validate: [required],
		component: SelectCity,
		cellProps: { md: 4, lg: 4 },
		SelectProps: { disabledOnUpdate: true },
	},
	{
		name: "class_id",
		label: "Class",
		validate: [required],
		component: SelectClass,
		cellProps: { md: 4, lg: 4 },
	},
	{
		name: "tax",
		label: "Tax",
		validate: [required, number, positive],
		component: InputRedux,
		cellProps: { md: 4, lg: 4 },
		InputProps: { InputProps: { endAdornment: "%" } },
	},
	{
		name: "trip_rates",
		label: "Trip Rates",
		component: ReduxFormSection,
		reduxFormComponent: "FormSection",
		fieldsArray: [
			{
				name: "zero_to_ten",
				label: "Upto 10 km fixed price",
				validate: [required, number, positive],
				component: InputRedux,
				cellProps: { md: 6 },
				InputProps: { InputProps: { endAdornment: "€" } },
			},
			{
				name: "ten_to_thirty",
				label: "10 to 30 km",
				validate: [required, number, positive],
				component: InputRedux,
				cellProps: { md: 6 },
				InputProps: { InputProps: { endAdornment: "€/km" } },
			},
			{
				name: "thirty_to_fifty",
				label: "30 to 50 km",
				validate: [required, number, positive],
				component: InputRedux,
				cellProps: { md: 6 },
				InputProps: { InputProps: { endAdornment: "€/km" } },
			},
			{
				name: "fifty_to_hundred",
				label: "50 km to 100 km",
				validate: [required, number, positive],
				component: InputRedux,
				cellProps: { md: 6 },
				InputProps: { InputProps: { endAdornment: "€/km" } },
			},
			{
				name: "more_than_hundred",
				label: "more then 100 km",
				validate: [required, number, positive],
				component: InputRedux,
				cellProps: { md: 6 },
				InputProps: { InputProps: { endAdornment: "€/km" } },
			},
		],
	},
	{
		name: "hourly_rates",
		label: "Hourly Rates",
		component: ReduxFormSection,
		reduxFormComponent: "FormSection",
		fieldsArray: [
			{
				name: "price",
				label: "Price",
				validate: [required, number, positive],
				component: InputRedux,
				cellProps: { md: 6, lg: 6 },
				InputProps: { InputProps: { endAdornment: "€/hr" } },
			},
		],
	},
	{
		name: "extra",
		label: "Extra",
		component: ReduxFormSection,
		reduxFormComponent: "FormSection",
		fieldsArray: [
			{
				name: "waiting_cost_per_min",
				label: "Waiting time price",
				validate: [required, number, positive],
				component: InputRedux,
				cellProps: { md: 6, lg: 6 },
				InputProps: { InputProps: { endAdornment: "€/min" } },
			},
			{
				name: "airport_pickup_cost",
				label: "Airport pickup price",
				validate: [required, number, positive],
				component: InputRedux,
				cellProps: { md: 6, lg: 6 },
				InputProps: { InputProps: { endAdornment: "€" } },
			},
		],
	},
];
