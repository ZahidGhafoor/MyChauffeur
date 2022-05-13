import Empty from "assets/empty.svg";
import { TableBody } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../Tables";

export default function NoResult({ message }: any) {
	return (
		<TableBody>
			<StyledTableRow>
				<StyledTableCell align="center">
					<div
						style={{
							minHeight: "50vh",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<img
							src={Empty}
							loading="lazy"
							alt="No results"
							style={{ width: "150px" }}
						/>
						<br />
						<h3>Sorry! No results found :&#40;</h3>
						<p style={{ margin: 0 }}>{message}.</p>
					</div>
				</StyledTableCell>
			</StyledTableRow>
		</TableBody>
	);
}
