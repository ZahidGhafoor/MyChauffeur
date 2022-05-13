import "./Header.css";
import { links } from ".";
import { Grid } from "@mui/material";
import logo from "assets/logo-light.png";
import AuthService from "services/auth.service";
import useEffectOnce from "hooks/useEffectOnce";
import BasicMenu from "components/atoms/BasicMenu";
import SocketService from "services/socket.service";
import { Link, useLocation } from "react-router-dom";
import OneSignalService from "services/onesignal.service";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function Header() {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const user = useAppSelector((state) => state.auth.user);

	useEffectOnce(() => {
		if (!user) return;

		OneSignalService.connect(user._id);
		SocketService.connect(user, dispatch);
	});

	if (!user || pathname === "/") return <></>;

	return (
		<header>
			<div className="navbar">
				<Grid container alignItems="center">
					<Grid item xs={12} lg={2}>
						<Link to="/bookings">
							<div className="logo">
								<img
									src={logo}
									alt="logo"
									loading="lazy"
									width={"200px"}
									height={"100%"}
								/>
							</div>
						</Link>
					</Grid>
					<Grid item xs={12} lg={10}>
						<ul>
							{links.map(({ to, text, active }, i) => (
								<li key={i}>
									<Link
										to={to}
										className={pathname.includes(active) ? "active" : ""}
									>
										{text}
									</Link>
								</li>
							))}
							<li>
								<div style={{ padding: "10px 0" }}>
									<BasicMenu
										avatar={true}
										list={[
											{ text: `${user.first_name} ${user.last_name}` },
											{
												text: "Logout",
												onClick: () => AuthService.logout(),
											},
										]}
									>
										{user.first_name.charAt() + user.last_name.charAt()}
									</BasicMenu>
								</div>
							</li>
						</ul>
					</Grid>
				</Grid>
			</div>
		</header>
	);
}
