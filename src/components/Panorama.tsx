import { createRef, FC, useEffect } from "react";
import styled from "styled-components";
import { Box } from "@ui";
import * as Babylon from "babylonjs";
import { Engine, EngineOptions } from "babylonjs";


const roptions:EngineOptions = {
	preserveDrawingBuffer: true,
	stencil: true,
};

export const Panorama:FC = () => {

	const el = createRef<HTMLCanvasElement>();

	useEffect(() => {
		const canvas = el.current;
		if(!canvas){ return; }
		const e = new Engine(canvas, true, roptions);
		const scene = new Babylon.Scene(e);
		// const c = new Babylon.FreeCamera("c1", new Babylon.Vector3(0, 5, -10), scene);
		// const c = new Babylon.FreeCamera("c1", new Babylon.Vector3(0, 0,0), scene);
		const c = new Babylon.UniversalCamera("c1", new Babylon.Vector3(0, 0,0), scene);
		// console.log(c.fov);
		// c.fov = 2;
		
		// c.fovMode = Babylon.FOVMODE_

		// c.setTarget(Babylon.Vector3.Zero());
		c.attachControl(canvas, false);
		// scene.clearColor = new Babylon.Color4(0,0,0,0);
		
		// const light = new Babylon.HemisphericLight("l1", new Babylon.Vector3(0, 0, 0), scene);
		
		
		// const m = new Babylon.BackgroundMaterial("stuff", scene);

		// m.diffuseTexture = new Babylon.Texture("https://assets.babylonjs.com/environments/backgroundGround.png", scene);

		// const t = new Babylon.Texture("pano3.jpg", scene);;
		// m.diffuseTexture.hasAlpha = true;
		// m.opacityFresnel = false;
		// m.shadowLevel = 0.4;
		// m.primaryColor = new Babylon.Color3(1,0,0);

		// var m = new Babylon.StandardMaterial("myMaterial", scene);
		// m.diffuseTexture = t;
		// m.emissiveTexture = t;
		// m.disableLighting = true;

		// m.emissiveColor = new Babylon.Color3(1,0,0);

		const dome = new Babylon.PhotoDome("", "https://playground.babylonjs.com/textures/360photo.jpg", {}, scene);

		dome.imageMode = Babylon.PhotoDome.MODE_MONOSCOPIC;

		dome.fovMultiplier = 1;
		
		// const sphere = Babylon.MeshBuilder.CreateSphere("s1", {
		// 	segments: 8,
		// 	diameter: 20,
		// 	sideOrientation: BABYLON.Mesh.BACKSIDE,
			
		// }, scene);
		// sphere.scaling = new Babylon.Vector3(1,-1,1);
		// sphere.material = m;

		// sphere.position.y = 0;
		// sphere.position.y = 1;

		const handleResize = () => {
			e.resize();
		};

		const render = () => {
			scene.render();
		};

		window.addEventListener("resize", handleResize);

		e.runRenderLoop(render);
		e.renderEvenInBackground = true;

		return () => {
			window.removeEventListener("resize", handleResize);
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
`;


const StyledCanvas = styled.canvas`
	width:100%;
	height:100%;
`;