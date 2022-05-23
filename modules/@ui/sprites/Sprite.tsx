import React, { FC } from "react";
import styled, { css } from "styled-components";
import { Box } from "../layout";

import {
	AtlasOptions,
	BlockSize,
	RegionSizes,
	Vector2D,
} from "./types";


const clampPixelOffset = (v:number|undefined, imgSize:number) => {
	v = v || 0;
	return v >= 0 ? v : imgSize + v;
};

export class Sprite {

	static getMany(props:ManyOptions):SpriteComponent[]{
		const atlas = props.atlas;
		const sprites:SpriteComponent[] = [];
		const regionSize = props.wrap || atlas.size;
		const csize = props.cellSize;
		for(let i = 0; i < props.count; i++){
			const offset = i * csize;
			var x = (offset % regionSize);
			var y = Math.floor(offset / regionSize) * csize; // row wrap
			var s = this.getOne({
				atlas,
				x,y,
				w:csize,
			});
			sprites.push(s);
		}
		return sprites;
	}

	static getOne(props:OneOptions){
		const tileSize = props.w;
		const src = props.atlas.src;
		const imgSize = props.atlas.size;

		const pixelPos = {
			x:clampPixelOffset(props.x, imgSize),
			y:clampPixelOffset(props.y, imgSize),
		};

		const CustomSprite = createSprite({
			...pixelPos,
			src,
			imgSize,
			tileSize:tileSize,
		});

		const c:SpriteComponent = (props) => {
			return (
				<SpriteRoot
				className={ props.className }
				style={ props.style }
				>
					<CustomSprite/>
				</SpriteRoot>
			);
		};
		return c;
	}
}

type DivProps = React.AllHTMLAttributes<HTMLDivElement>;
type SpriteComponent = FC<DivProps>;

type ManyOptions = {
	atlas:AtlasOptions;
	count:number;
	cellSize:BlockSize;
	wrap?:RegionSizes; // row wrapping
} & Partial<Vector2D>;

type OneOptions = {
	atlas:AtlasOptions;
	w:BlockSize;
	flipX?:boolean;
	flipY?:boolean;
} & Partial<Vector2D>;

type TiledBGOptions = {
	atlas:AtlasOptions;
	tileSize:BlockSize;
} & Partial<Vector2D>;

/* Tiled background canvas */
const TiledRoot = styled.div`
	position:relative;
	overflow: hidden;
`;

/*
sprite hierarchy:
- root (pointer muted)
	- viewport (overflow hidden)
		- image (cropped)
*/
const SpriteRoot = styled(Box.fixedRatio(100))`
	pointer-events:none;
`;

const SpriteViewport = styled(Box.Abs)`
	overflow: hidden;
	user-select: none;
`;

interface IBGSprite {
	src:string;
	imgSize:number;
	tileSize:number;
	x:number;
	y:number;
	flipX?:boolean;
	flipY?:boolean;
}

const getSpriteCSS = (s:IBGSprite) => {
	const {
		imgSize,
		x,y,
		src,
		tileSize: ts
	} = s;
	const px = (100 * x) / Math.abs(ts - imgSize);
	const py = (100 * y) / Math.abs(ts - imgSize);
	const size = (1 / (ts / imgSize)) * 100;
	const pb = 100; // tileHeight / tileWidth * 100
	return css`
		max-width: ${imgSize}px;
		max-height: ${imgSize}px;
		&::after{
			content: ' ';
			display: inline-block;
			max-width: 100%;
			background-image: url(${src});
			background-position: ${px}% ${py}%;
			background-size: ${size}% auto;
			padding-bottom: ${pb}%; 
			width:${size}%;
		}
	`;
};

const createSprite = (s:IBGSprite) => {

	const Img = styled.i`
		${getSpriteCSS(s)};
	`;

	const scale = {
		x:s.flipX ? -1 : 1,
		y:s.flipY ? -1 : 1,
	};

	const flipAny = scale.x < 0 || scale.y < 0;

	const Viewport = flipAny ? styled(SpriteViewport)`
		transform:scale(${scale.x},${scale.y});
	` : SpriteViewport;

	const c:FC = () => {
		return (
			<Viewport>
				<Img/>
			</Viewport>
		)
	};
	return c;
};