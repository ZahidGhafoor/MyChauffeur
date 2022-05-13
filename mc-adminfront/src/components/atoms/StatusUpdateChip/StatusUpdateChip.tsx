import React from "react";
import Chip from "../Chip";
import { useAppDispatch } from "redux/hooks";
import { Menu, MenuItem } from "@mui/material";
import { modalActions } from "redux/slices/modal";
import { MODAL } from "redux/slices/modal";

export default function StatusUpdateChip({ label, menu, data }: any) {
	const dispatch = useAppDispatch();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (event: any) => {
		setAnchorEl(null);

		if (event.target.textContent)
			dispatch(
				modalActions.openModal({
					width: "500px",
					type: MODAL.HANDLE_STATUS,
					data: { form: event.target.textContent, ...data },
				})
			);
	};

	return (
		<div>
			<Chip
				id="basic-button"
				aria-controls={open ? "basic-menu" : "undefined"}
				aria-haspopup="true"
				aria-expanded={open ? "true" : "undefined"}
				status={label}
				size="small"
				onClick={(e: any) => handleClick(e)}
				style={{ cursor: "pointer" }}
			/>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				{menu.map((item: any, index: any) => (
					<MenuItem key={index} onClick={handleClose}>
						{item}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}
