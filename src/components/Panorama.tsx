import React, { createRef, FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Box } from "@ui";
import * as Babylon from "babylonjs";
import { Engine, EngineOptions } from "babylonjs";

const roptions:EngineOptions = {
	preserveDrawingBuffer: true,
	stencil: true,
};
type PanoramaOptions = {
	src:string;
};


const DEFAULT_FOV = 65;
const FOV_STEP = 5;

const MIN_FOV = 40;
const MAX_FOV = 100;

const ROT_SPEED = 1;

const MIN_SPEED = 0.5;
const MAX_SPEED = 1.25;
const CAM_INERTIA = 0.7;

class Mathf {

	static readonly DEG_2_RAD:number = 0.01745329;
	static readonly RAD_2_DEG:number = 57.29578;

	static clamp = (v:number, min:number, max:number) => {
		if(v < min){ return min; }
		if(v > max){ return max; }
		return v;
	};

	static lerp = (a:number, b:number, t:number) => {
		return a + (b - a) * Mathf.clamp(t, 0, 1);
	};

	static inverseLerp = (a:number, b:number, v:number) => {
		if(a != b){
			return Mathf.clamp((v - a) / (b - a), 0, 1);
		}
		return 0;
	};

	private constructor(){}
}

// get camera speed for given fov value
const speedForFOV = (fov:number) => {
	var t = Mathf.inverseLerp(MIN_FOV, MAX_FOV, fov);
	const speed = Mathf.lerp(MIN_SPEED, MAX_SPEED, t);
	return speed;
};

export const Panorama:FC<PanoramaOptions> = props => {

	const {
		src
	} = props;

	const el = createRef<HTMLCanvasElement>();
	useEffect(() => {
		const canvas = el.current;
		if(!canvas){ return; }

		// init render context
		const e = new Engine(canvas, true, roptions);
		e.renderEvenInBackground = true;
		const scene = new Babylon.Scene(e);

		// init camera
		const c = createCamera({
			canvas,
			scene
		});

		// movement smoothing
		c.inertia = CAM_INERTIA;
	
		// make it drag-y
		c.invertRotation = true;
		c.inverseRotationSpeed = ROT_SPEED;

		// init panorama dome
		const dome = createImageDome({ src, scene });
		
		// update cam rotation speed
		const refreshSpeed = () => {
			var fov = c.fov * Mathf.RAD_2_DEG;
			c.inverseRotationSpeed = speedForFOV(fov);
		};

		const zoom = (sign:number) => {
			const step = sign > 0 ? FOV_STEP : -FOV_STEP;
			const cfov = c.fov * Mathf.RAD_2_DEG;
			const nfov = Mathf.clamp(cfov + step, MIN_FOV, MAX_FOV);
			c.fov = nfov * Mathf.DEG_2_RAD;
		};

		// window resize handler
		const handleResize = () => {
			e.resize();
		};

		// render update
		const handleRender = () => {
			refreshSpeed();
			scene.render();
		};

		// wheel / zoom
		const handleWheel = (e:WheelEvent) => {
			zoom(e.deltaY);
		};

		// bind handlers
		window.addEventListener("resize", handleResize);
		window.addEventListener("wheel", handleWheel);

		// start rendering
		e.runRenderLoop(handleRender);

		// remove handlers / cleanup
		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("wheel", handleWheel);
			e.stopRenderLoop();
		};
	}, []);

	return (
		<Root>
			<StyledCanvas ref={ el }/>
		</Root>
	);
};

const Root = styled(Box.Abs)`
	overflow:hidden;
	cursor:move;
`;

const StyledCanvas = styled.canvas`
	width:100%;
	height:100%;
`;



// create and add panorama image dome to scene
const createImageDome = (opts:{
	src:string,
	scene:Babylon.Scene
}):Babylon.PhotoDome => {
	const dome = new Babylon.PhotoDome("", opts.src, {}, opts.scene);
	dome.imageMode = Babylon.PhotoDome.MODE_MONOSCOPIC;
	return dome;
};

// create and add camera to scene
const createCamera = (opts:{
	canvas:HTMLCanvasElement,
	scene:Babylon.Scene
}):Babylon.UniversalCamera => {

	const c = new Babylon.UniversalCamera("c1", new Babylon.Vector3(0, 0,0), opts.scene);
	c.attachControl(opts.canvas, false);
	c.fov = DEFAULT_FOV * Mathf.DEG_2_RAD;
	return c;
};