import LoginForm from "./LoginForm";
import Logo from "assets/logo.png";
import { Navigate } from "react-router-dom";
import Container from "@mui/material/Container";
import AuthService from "services/auth.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import "./Login.css";
import CircleLoader from "components/atoms/CircleLoader";

export default function Login() {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.auth.user);
	const loading = useAppSelector((state) => state.auth.loading);

	const handleSubmit = (values: any) => {
		AuthService.login(values, dispatch);
	};

	if (user) return <Navigate to="/bookings" />;

	return (
		<div className="login-container">
			<Container maxWidth="sm">
				<div className="wrap-login">
					{loading && <CircleLoader />}
					<span className="login-form-logo">
						<img
							alt="logo"
							src={Logo}
							loading="lazy"
							width={"80px"}
							height={"89px"}
						/>
					</span>
					<span className="login-form-title">Log in</span>
					<div style={{ padding: "35px" }}>
						<LoginForm onSubmit={handleSubmit} />
					</div>
				</div>
			</Container>
		</div>
	);
}
