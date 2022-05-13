import { Container } from "@mui/material";
import GoBack from "components/atoms/GoBack";
import AddUserPoints from "./AddUserPoints";
import Banner from "components/templates/Banner";
import UsersPointsList from "./UsersPointsList";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";
import UserService from "services/user.service";

export default function UsersPoints() {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		UserService.getUser(`${id}`, dispatch);
	}, [id, dispatch]);

	return (
		<div>
			<Container maxWidth="lg">
				<GoBack path="/users" title="Back to Users" />
				<Banner heading="User Points"></Banner>
				<AddUserPoints />
				<UsersPointsList />
			</Container>
		</div>
	);
}
