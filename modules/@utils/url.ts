

export class URLUtility {
	static isURL = (path:string) => {
		return path.startsWith("https:");
	};
}