import { SelectOwnProps } from ".";
import { useParams } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import styled from "@mui/material/styles/styled";
import { useState } from "react";

export type SelectProps = SelectOwnProps &
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
  "& .MuiFilledInput-input:focus": {
    backgroundColor: "#f7f7f7 !important",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "rgba(0, 0, 0, 0.6)",
  },
  // Outlined Input
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

export default function Select({
  disabled,
  disabledOnUpdate,
  options = [],
  ...rest
}: SelectProps) {
  const { id } = useParams();
  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <CssTextField
      select
      fullWidth
      variant="filled"
      SelectProps={{ MenuProps: { sx: { maxHeight: "300px" } } }}
      {...rest}
      disabled={disabledOnUpdate && id ? true : disabled}
    >
      {options.map(({ value, label }, index) => (
        <MenuItem
          key={index}
          value={value}
          selected={index === selectedIndex}
          onClick={() => setSelectedIndex(index)}
        >
          {label}
        </MenuItem>
      ))}
    </CssTextField>
  );
}
