import { useEffect } from "react";
import DriverService from "services/driver.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
	StyledTableCell,
	StyledTableRow,
} from "components/templates/Tables";
import {
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableContainer,
} from "@mui/material";
import Chip from "components/atoms/Chip";
import TableLoadingWrapper from "components/templates/TableLoadingWrapper";
import { Link } from "react-router-dom";

export default function DriversList() {
	const dispatch = useAppDispatch();
	const drivers = useAppSelector((state) => state.driver.drivers);
	const loading = useAppSelector((state) => state.driver.loading);

	useEffect(() => {
		DriverService.getAllDrivers(dispatch);
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
					coloumns={7}
					loading={loading}
					length={drivers.length}
					message="There are no chauffeurs currently available"
				>
					<TableHead>
						<TableRow>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell>Phone</StyledTableCell>
							<StyledTableCell>Email</StyledTableCell>
							<StyledTableCell>Status</StyledTableCell>
							<StyledTableCell align="center">Action</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{drivers.map((driver) => (
							<StyledTableRow key={driver._id}>
								<StyledTableCell>
									{`${driver.title} ${driver.first_name} ${driver.last_name}`}
								</StyledTableCell>
								<StyledTableCell>{driver.phone}</StyledTableCell>
								<StyledTableCell>{driver.email}</StyledTableCell>
								<StyledTableCell>
									<Chip status={driver.status} />
								</StyledTableCell>
								<StyledTableCell align="center">
									<Link
										className="detail-link"
										to={`/chauffeur-details/${driver._id}`}
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
