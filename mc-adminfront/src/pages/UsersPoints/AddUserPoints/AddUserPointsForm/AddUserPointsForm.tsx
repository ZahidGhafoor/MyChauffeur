import { fields } from ".";
import { reduxForm } from "redux-form";
import Button from "components/atoms/Button";
import ReduxFormFields from "components/molecules/ReduxFormFields";
import { Grid } from "@mui/material";
import CircleLoader from "components/atoms/CircleLoader";
import { useAppSelector } from "redux/hooks";

function AddUserPointsForm({ handleSubmit }: any) {
	const loading = useAppSelector((state) => state.user.loading);

	return (
		<div>
			<form onSubmit={handleSubmit} style={{ position: "relative" }}>
				{loading && <CircleLoader />}
				<Grid container spacing={2}>
					<Grid item md={7}>
						<ReduxFormFields fields={fields} />
					</Grid>
					<Grid item md={2}>
						<Button
							fullWidth
							color="primary"
							variant="contained"
							disableElevation
							type="submit"
							sx={{ padding: "15px" }}
						>
							Add
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
}

export default reduxForm({ form: "AddUserPointsForm" })(AddUserPointsForm);
