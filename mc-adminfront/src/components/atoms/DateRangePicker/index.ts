import { DateRangePicker } from "@mui/lab";
import { InputProps } from "components/atoms/Input/Input";
import { CellProps } from "components/molecules/ReduxFormFields";

export { default } from "./DateRangePicker";

export interface DateRangePickerOwnProps {
	editable?: boolean;
	InputCellProps?: CellProps;
	InputFieldProps: InputProps;
	onChange: (date: any) => void;
	value: { date: [any, any]; error: [any, any] };
}

export type DateRangePickerProps = DateRangePickerOwnProps &
	Omit<
		React.ComponentProps<typeof DateRangePicker>,
		"renderInput" | "value"
	>;
