import OneSignal from "react-onesignal";
import { log } from "../utils/logger.util";
import Notification from "assets/audio/Notification.mp3";

const audio = new Audio(Notification);
const url = `${process.env.REACT_APP_URL}`;
const appId = `${process.env.REACT_APP_ONE_SIGNAL_APP_ID}`;

const OneSignalService = {
	init: async () => {
		if (process.env.NODE_ENV !== "production") return;

		await OneSignal.init({ appId });
		await OneSignal.setDefaultNotificationUrl(url);
		log("one signal init");

		OneSignal.on("notificationDisplay", () => {
			OneSignalService.playSound();
			log("one signal notificationDisplay");
		});
	},

	connect: async (id: string) => {
		if (process.env.NODE_ENV !== "production") return;

		await OneSignal.setExternalUserId(id);
		log("one signal connected");
	},

	disconnect: async () => {
		if (process.env.NODE_ENV !== "production") return;

		await OneSignal.removeExternalUserId();
		log("one signal disconnected");
	},

	playSound: () => {
		try {
			log("playing sound");
			audio.play();
			log("sound played");
		} catch (err) {
			log({ err });
		}
	},
};

export default OneSignalService;
