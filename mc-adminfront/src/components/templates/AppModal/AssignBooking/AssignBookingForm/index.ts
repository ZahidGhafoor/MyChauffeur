import { required } from "utils/validate.util";
import SelectDriver from "components/organisms/SelectDriver";
import SelectPartner from "components/organisms/SelectPartner";
import { ReduxFormField } from "components/molecules/ReduxFormFields";

export { default } from "./AssignBookingForm";

export const fields: ReduxFormField[] = [
	{
		name: "partner",
		label: "Partner",
		validate: [required],
		component: SelectPartner,
		cellProps: { md: 12 },
	},
	{
		name: "driver",
		label: "Chauffeur",
		validate: [required],
		component: SelectDriver,
		cellProps: { md: 12 },
	},
];
