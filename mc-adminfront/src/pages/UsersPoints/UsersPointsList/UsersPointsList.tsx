import {
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableContainer,
} from "@mui/material";
import DateService from "utils/date.util";
import { useAppSelector } from "redux/hooks";
import TableLoadingWrapper from "components/templates/TableLoadingWrapper";
import {
	StyledTableCell,
	StyledTableRow,
} from "components/templates/Tables";

export default function UsersPointsList() {
	const user = useAppSelector((state) => state.user.user);
	const loading = useAppSelector((state) => state.user.loading);

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
					length={user?.mc_points.length || 0}
					message="No points given to this user"
				>
					<TableHead>
						<TableRow>
							<StyledTableCell>Points</StyledTableCell>
							<StyledTableCell>Date</StyledTableCell>
							<StyledTableCell>Added by</StyledTableCell>
							<StyledTableCell>Reason</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{user?.mc_points.map((points: any, index: any) => (
							<StyledTableRow key={index}>
								<StyledTableCell>
									{points.points.toFixed(2)}
								</StyledTableCell>
								<StyledTableCell>
									{DateService.getFormattedDate(points.date)}
								</StyledTableCell>
								<StyledTableCell>Admin</StyledTableCell>
								<StyledTableCell>{points.reason}</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</TableLoadingWrapper>
			</Table>
		</TableContainer>
	);
}
