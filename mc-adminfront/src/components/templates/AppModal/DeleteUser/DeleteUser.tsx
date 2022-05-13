import Button from "components/atoms/Button";
import { useAppDispatch } from "redux/hooks";
import { modalActions } from "redux/slices/modal";

export default function DeleteUser() {
	const dispatch = useAppDispatch();

	return (
		<div>
			<h3>Delete User</h3>
			<p>Do you really want to delete this user?</p>

			<Button
				variant="outlined"
				onClick={() => dispatch(modalActions.closeModal())}
				sx={{ marginRight: "10px" }}
			>
				No
			</Button>
			<Button
				variant="contained"
				onClick={() => dispatch(modalActions.closeModal())}
			>
				Yes
			</Button>
		</div>
	);
}
