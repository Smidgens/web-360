export class Async {
	static async catch(fn:() => Promise<any>, then?:(err:Error|null) => any){
		let err:any = null;
		try { await fn(); }
		catch(e:any){ err = e; }
		if(!then){ return; }
		try { then(err); }
		catch{}
	};

	static wait(t:number){
		return new Promise((r) => setTimeout(r, t));
	};

	private constructor(){}
}