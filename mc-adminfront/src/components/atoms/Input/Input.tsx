import { useState } from "react";
import { InputOwnProps } from ".";
import TextField from "@mui/material/TextField";
import styled from "@mui/material/styles/styled";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export type InputProps = InputOwnProps &
	React.ComponentProps<typeof TextField>;

const CssTextField = styled(TextField)({
	// Filled Input
	"& .MuiFilledInput-root": {
		backgroundColor: "#fafafa",
		borderRadius: "4px",
	},
	"& .MuiFilledInput-root:after, .MuiFilledInput-root:before": {
		display: "none",
	},
	"& .Mui-disabled": {
		backgroundColor: "#fafafa",
		opacity: "0.5",
	},
	"& .Mui-focused": {
		backgroundColor: "#f7f7f7 !important",
	},
	"& .MuiFilledInput-root:hover": {
		backgroundColor: "#f7f7f7 !important",
	},
	"& .MuiInputLabel-root.Mui-focused": {
		color: "rgba(0, 0, 0, 0.6)",
	},
	// Outline Input
	// "& label.Mui-focused": {
	//   color: "rgba(0, 0, 0, 0.53) !important",
	// },
	// "& .MuiInput-underline:after": {
	//   borderBottomColor: "rgba(0, 0, 0, 0.53) !important",
	// },
	// "& .MuiOutlinedInput-root": {
	//   "& fieldset": {
	//     borderColor: "#1e2731",
	//     transition: "all 0.3s ease",
	//   },
	//   "&:hover fieldset": {
	//     borderColor: "#f5d312",
	//   },
	//   "&.Mui-focused fieldset": {
	//     borderColor: "rgba(0, 0, 0, 0.53) !important",
	//     fontWeight: "500 !important",
	//   },
	// },
});

export default function Input({ showIcon, type, ...rest }: InputProps) {
	const [show, setShow] = useState(false);

	return (
		<CssTextField
			fullWidth
			variant="filled"
			{...rest}
			type={show && showIcon && type === "password" ? "text" : type}
			InputProps={{
				endAdornment: showIcon && type === "password" && (
					<InputAdornment position="end">
						<IconButton
							edge="end"
							onClick={() => setShow(!show)}
							onMouseDown={(e) => e.preventDefault()}
							aria-label="toggle password visibility"
						>
							{show ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				),
				...rest.InputProps,
			}}
		/>
	);
}
