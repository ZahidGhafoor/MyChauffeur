import PinImg from "assets/pin1.png";
import PinImgEnd from "assets/pin.png";
import ToasterService from "../utils/toaster.util";

const mapOptions = {
	zoom: 12,
	mapTypeControl: false,
	clickableIcons: false,
	gestureHandling: "none",
	disableDefaultUI: true,
	keyboardShortcuts: false,
	backgroundColor: "#f8f8f8",
	center: { lat: -33.8688, lng: 151.2195 },
};

const MapService = {
	calculateDistance: async function (
		originPlaceId: any,
		destinationPlaceId: any
	) {
		if (!originPlaceId || !destinationPlaceId) return false;

		return new Promise((resolve) => {
			let google = (window as any).google;
			let directionsService = new google.maps.DistanceMatrixService();

			directionsService.getDistanceMatrix(
				{
					origins: [{ placeId: originPlaceId }],
					destinations: [{ placeId: destinationPlaceId }],
					travelMode: google.maps.TravelMode.DRIVING,
				},
				(response: any, status: any) => {
					let msg = status;
					let element = response.rows[0].elements[0];

					if (status === "OK") {
						if (element.status === "OK") {
							let distance = element.distance.value / 1000;
							return resolve(distance);
						}

						msg = element.status;
					}

					ToasterService.showError(`${msg} Failed To calculate Distance`);
					resolve(false);
				}
			);
		});
	},

	calculateDirections: async function (
		originPlaceId: any,
		destinationPlaceId: any
	) {
		if (!originPlaceId || !destinationPlaceId) return false;

		return new Promise((resolve) => {
			let google = (window as any).google;
			let directionsService = new google.maps.DirectionsService();

			directionsService.route(
				{
					origin: { placeId: originPlaceId },
					destination: { placeId: destinationPlaceId },
					travelMode: google.maps.TravelMode.DRIVING,
				},
				(response: any, status: any) => {
					if (status === "OK") {
						return resolve(response);
					} else {
						window.alert("Directions request failed due to " + status);
					}

					resolve(null);
				}
			);
		});
	},

	renderDirections: (
		response: any,
		map_id: string,
		location: any,
		pick: string,
		drop: string,
		options?: any
	) => {
		if (!response) return;

		let google = (window as any).google;
		if (!google) return;

		const map = new google.maps.Map(document.getElementById(map_id), {
			...mapOptions,
			center: location,
			...options,
		});

		let directionsRenderer = new google.maps.DirectionsRenderer({
			map,
			directions: response,
			suppressMarkers: true,
		});

		directionsRenderer.setOptions({
			polylineOptions: {
				strokeColor: "#1f2c34",
			},
		});

		const start_marker = new google.maps.Marker({
			position: response?.routes[0]?.legs[0]?.start_location,
			map,
			icon: PinImg,
		});
		const end_marker = new google.maps.Marker({
			position: response?.routes[0]?.legs[0]?.end_location,
			map,
			icon: PinImgEnd,
		});

		const start_infowindow = new google.maps.InfoWindow({
			maxWidth: 230,
			content: pick,
		});
		const end_infowindow = new google.maps.InfoWindow({
			maxWidth: 230,
			content: drop,
		});

		start_infowindow.open({
			anchor: start_marker,
			map,
			shouldFocus: false,
		});
		end_infowindow.open({
			anchor: end_marker,
			map,
			shouldFocus: false,
		});
	},

	renderMap: (
		title: any,
		address: any,
		location: any,
		map_id: string,
		options?: any
	) => {
		let google = (window as any).google;
		if (!google) return;

		const map = new google.maps.Map(document.getElementById(map_id), {
			...mapOptions,
			zoom: 16,
			center: location,
			...options,
		});

		const marker = new google.maps.Marker({
			position: location,
			map,
			title: address,
			icon: PinImg,
		});

		const infowindow = new google.maps.InfoWindow({
			content: title,
		});

		infowindow.open({
			anchor: marker,
			map,
			shouldFocus: false,
		});
	},
};

export default MapService;
