import { statuses } from ".";
import { Grid } from "@mui/material";
import Button from "components/atoms/Button";
import { Field, reduxForm } from "redux-form";
import { decimal } from "utils/normalize.util";
import { required } from "utils/validate.util";
import { modalActions } from "redux/slices/modal";
import InputRedux from "components/molecules/InputRedux";
import SelectRedux from "components/molecules/SelectRedux";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import CheckboxRedux from "components/molecules/CheckboxRedux";

function UpdateBookingStatusForm({ form, handleSubmit }: any) {
	const dispatch = useAppDispatch();
	const status = useAppSelector(
		(state) => state.booking.booking?.current_status
	);
	const isPay_driver = useAppSelector(
		(state) => state.form?.[form]?.values?.isPay_driver
	);
	const current_status = useAppSelector(
		(state) => state.form?.[form]?.values?.current_status
	);
	const options = statuses.filter(({ value }) => value !== status);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Field
							name="current_status"
							label="Status"
							component={SelectRedux}
							validate={[required]}
							SelectProps={{ options }}
						/>
					</Grid>
					{current_status === "finished" && (
						<>
							<Grid item xs={12}>
								<Field
									name="isPay_driver"
									label="Pay Driver"
									component={CheckboxRedux}
								/>
							</Grid>
							{isPay_driver && (
								<Grid item xs={12}>
									<Field
										name="driver_price"
										label="Price"
										normalize={decimal}
										validate={[required]}
										component={InputRedux}
										InputProps={{ InputProps: { endAdornment: "€" } }}
									/>
								</Grid>
							)}
						</>
					)}
				</Grid>
				<br />
				<Button
					variant="outlined"
					onClick={() => dispatch(modalActions.closeModal())}
					sx={{ marginRight: "10px" }}
				>
					Cancel
				</Button>
				<Button type="submit" variant="contained">
					Submit
				</Button>
			</form>
		</div>
	);
}

export default reduxForm({ form: "UpdateBookingStatusForm" })(
	UpdateBookingStatusForm
);
