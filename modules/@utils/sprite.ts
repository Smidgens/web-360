
// type Rect2D = { x:number; y:number; }

// export type SlicedSprite = {
// 	readonly rect:Readonly<Rect2D>;
// } | null;

// export type SlicedAtlas = {
// 	readonly image:HTMLImageElement;
// 	readonly rows:number;
// 	readonly columns:number;
// 	readonly sprites:SlicedSprite[];
// 	readonly spriteCount:number;
// };

// type ImgEl = HTMLImageElement;

// type LoadAtlasProps = {
// 	path:string;
// 	columns:number;
// 	count?:number;
// 	indices?:number;
// }

// export class Sprite {

// 	static async loadAtlas(props:LoadAtlasProps):Promise<SlicedAtlas>{
// 		const {
// 			path,
// 			columns
// 		} = props;
// 		const rows = columns;
// 		return new Promise((res, rej) => {
// 			const image = new Image();
// 			image.onload = async () => {
// 				const sprites = await slice(image, rows, columns, props.count);
// 				const atlas:SlicedAtlas = {
// 					image,
// 					sprites,
// 					rows,
// 					columns,
// 					spriteCount:sprites.length,
// 				};
// 				res(atlas);
// 			};
// 			image.onerror = rej;
// 			image.src = path;
// 		});
// 	}
// }

// /*
// todo later: skip cells if they're marked empty
// */
// const slice = async (_img:ImgEl, r:number, c:number, n?:number):Promise<SlicedSprite[]> => {
// 	const sprites:SlicedSprite[] = [];
// 	if(n != undefined){
// 		for(let i = 0; i < n; i++){
// 			var y = Math.floor(i / c)
// 			var x = i % c;
// 			sprites.push({
// 				rect:{
// 					x: x * -100,
// 					y: y * -100
// 				}
// 			})
// 		}
// 		return sprites;
// 	}

// 	// row * col
// 	for(let ri = 0; ri < r; ri++){
// 		for(let ci = 0; ci < c; ci++){
// 			var si = ri * r + ci;
// 			sprites[si] = {
// 				rect: {
// 					y: ci * -100,
// 					x: ri * -100
// 				}
// 			};
// 		}
// 	}
// 	return sprites;
// };

export default {}