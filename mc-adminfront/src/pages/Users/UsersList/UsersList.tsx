import { useEffect } from "react";
import DateService from "utils/date.util";
import Button from "components/atoms/Button";
import { Link, useNavigate } from "react-router-dom";
import UserService from "services/user.service";
import { MODAL } from "redux/slices/modal";
import { modalActions } from "redux/slices/modal";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import TableLoadingWrapper from "components/templates/TableLoadingWrapper";
import {
	StyledTableRow,
	StyledTableCell,
} from "components/templates/Tables";
import {
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableContainer,
} from "@mui/material";

export default function UsersList() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const users = useAppSelector((state) => state.user.users);
	const loading = useAppSelector((state) => state.user.loading);

	useEffect(() => {
		UserService.getUsers(dispatch);
	}, [dispatch]);

	return (
		<TableContainer>
			<Table
				aria-label="customized table"
				sx={{
					minWidth: "100%",
					borderSpacing: "0 10px",
					borderBottomWidth: "0px",
					borderCollapse: "separate",
				}}
			>
				<TableLoadingWrapper
					coloumns={5}
					loading={loading}
					length={users.length}
					message="No one has connected with our chauffeur services yet"
				>
					<TableHead>
						<TableRow>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell>Phone</StyledTableCell>
							<StyledTableCell>Email</StyledTableCell>
							<StyledTableCell>Signup date</StyledTableCell>
							<StyledTableCell align="center">Action</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user, index) => (
							<StyledTableRow key={index}>
								<StyledTableCell>
									{`${user.title} ${user.first_name} ${user.last_name}`}
								</StyledTableCell>
								<StyledTableCell>{user.phone}</StyledTableCell>
								<StyledTableCell>{user.email}</StyledTableCell>
								<StyledTableCell>
									{DateService.getFormattedDate(user.createdAt)}
								</StyledTableCell>
								<StyledTableCell align="center">
									<Button
										size="small"
										variant="text"
										color="error"
										onClick={() =>
											dispatch(
												modalActions.openModal({
													type: MODAL.DELETE_USER,
													data: "",
													width: "500px",
												})
											)
										}
									>
										Delete
									</Button>
									<Button
										size="small"
										variant="text"
										color="info"
										onClick={() => navigate(`/user-points/${user._id}`)}
									>
										Add Points
									</Button>
									<Link
										className="detail-link"
										to={`/user-details/${user._id}`}
									>
										Details
									</Link>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</TableLoadingWrapper>
			</Table>
		</TableContainer>
	);
}
