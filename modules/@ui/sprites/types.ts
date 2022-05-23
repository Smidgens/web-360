
const cellSizes = [ 32, 64, 128, 256, 512, 1024 ] as const;
const imageSizes = [ 256, 512, 1024, 2048, 4096 ] as const;
const regionSizes = [ 756, ...cellSizes, ...imageSizes ] as const;

export type AtlasSize = typeof imageSizes[number];
export type BlockSize = typeof cellSizes[number];
export type RegionSizes = typeof regionSizes[number];

export type AtlasOptions = {
	src:string;
	size:AtlasSize;
};

export type Vector2D = { x:number; y:number; }