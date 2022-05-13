import { Grid } from "@mui/material";
import Button from "components/atoms/Button";
import ReduxFormFields from "components/molecules/ReduxFormFields";
import { change, reduxForm, reset } from "redux-form";
import { useAppDispatch } from "redux/hooks";
import { bookingActions } from "redux/slices/booking";
import { fields } from ".";

const BookingFiltersForm = ({ form, handleSubmit }: any) => {
	const dispatch = useAppDispatch();

	return (
		<form onSubmit={handleSubmit}>
			<Grid container spacing={2}>
				<Grid item xs={12} lg={9}>
					<ReduxFormFields fields={fields} />
				</Grid>
				<Grid item xs={4} sm={2} md={1}>
					<Button
						color="primary"
						variant="outlined"
						type="reset"
						fullWidth
						sx={{ height: "100%" }}
						onClick={() => {
							const default_page_size = Number(
								`${process.env.REACT_APP_PAGE_SIZE}`
							);
							dispatch(bookingActions.resetFilters());
							dispatch(reset(form));
							dispatch(change(form, "page_size", default_page_size));
						}}
					>
						Reset
					</Button>
				</Grid>
				<Grid item xs={5} sm={3} md={2}>
					<Button
						color="primary"
						variant="contained"
						type="submit"
						fullWidth
						sx={{ height: "100%" }}
					>
						Submit
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default reduxForm({ form: "BookingFiltersForm" })(
	BookingFiltersForm
);
