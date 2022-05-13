import { useEffect } from "react";
import Chip from "components/atoms/Chip";
import DateService from "utils/date.util";
import { useNavigate } from "react-router";
import Button from "components/atoms/Button";
import CityService from "services/city.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import TableLoadingWrapper from "components/templates/TableLoadingWrapper";
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

export default function CityList() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const cities = useAppSelector((state) => state.city.cities);
	const loading = useAppSelector((state) => state.city.loading);

	useEffect(() => {
		CityService.getAllCities(dispatch);
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
					coloumns={4}
					loading={loading}
					message="Our services are not available in any city yet"
					length={cities.length}
				>
					<TableHead>
						<TableRow>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell>Status</StyledTableCell>
							<StyledTableCell>Date</StyledTableCell>
							<StyledTableCell align="center">Action</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{cities.map((city) => (
							<StyledTableRow key={city._id}>
								<StyledTableCell>{city.name}</StyledTableCell>
								<StyledTableCell>
									<Chip status={city.is_active ? "active" : "On hold"} />
								</StyledTableCell>
								<StyledTableCell>
									{DateService.getFormattedDate(city.createdAt)}
								</StyledTableCell>
								<StyledTableCell align="center">
									<Button
										size="small"
										variant="text"
										color="primary"
										onClick={() => navigate(`/update-city/${city._id}`)}
									>
										Edit
									</Button>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</TableLoadingWrapper>
			</Table>
		</TableContainer>
	);
}
