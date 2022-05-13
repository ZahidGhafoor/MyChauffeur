import UserService from "services/user.service";
import AddUserPointsForm from "./AddUserPointsForm";
import TableBanner from "components/atoms/TableBanner";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { useParams } from "react-router-dom";

export default function AddUserPoints() {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user.user);
	const heading = user
		? `${user.title} ${user.first_name} ${
				user.last_name
		  } (${user.mc_points_balance.toFixed(2)}€)`
		: "";

	const handleSubmit = async (values: any) => {
		let data = { ...values, user_id: id, points: Number(values.points) };
		UserService.addPoints(data, dispatch);
	};

	return (
		<TableBanner heading={heading}>
			<AddUserPointsForm onSubmit={handleSubmit} />
		</TableBanner>
	);
}
