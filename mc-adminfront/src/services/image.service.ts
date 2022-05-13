const ImageService = {
	getImageFileFromBlob: async ({ blob, name, type }: any) => {
		const response = await fetch(blob);
		const data = await response.blob();
		return new File([data], name, {
			type: response.headers.get("content-type") || type,
		});
	},
};

export default ImageService;
