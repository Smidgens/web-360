const MAX_TIMEOUT = 5; // 10seconds
const MIN_TIMEOUT = 1; // 10seconds

export class AssetPreload {
	static async images(paths:string[], timeout:number = MAX_TIMEOUT){
		if(timeout < MIN_TIMEOUT){ timeout = MIN_TIMEOUT; }
		else if(timeout > MAX_TIMEOUT){ timeout = MAX_TIMEOUT; }
		const timeoutms = timeout * 1000;
		return Promise.all(paths.map(src => preloadImage(src, timeoutms)))
	}
}
const preloadImage = async(src:string, timeoutms:number) => {
	return new Promise<void>((res) => {
		let exited = false;
		const exit = () => {
			if(exited){ return; }
			exited = true;
			res();
		};
		try {
			const img = new Image();
			img.onload = exit;
			img.onerror = exit;
			img.src = src;
			// img is cached
			if(img.complete){ exit(); }
			else { setTimeout(exit, timeoutms); }
		}
		catch{ exit(); }
	});
};
