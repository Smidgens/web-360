import { FC } from "react";
import styled from "styled-components";
import { Box } from "@ui";
import { Panorama } from "$components";

class QueryUtils {
	static getNumber = (p:URLSearchParams, key:string, d:number):number => {
		const v = p.get(key);
		if(!v){ return d; }
		var pv = Number(v);
		if(Number.isNaN(pv)){ return d; }
		return pv;
	};
	private constructor(){}
}

export const App:FC = () => {

	const x = new URLSearchParams(window.location.search);

	const src = x.get("src");

	if(!src){
		return <DefaultSplash/>
	}

	return (
		<Root>
			<Panorama
			src={src}
			/>
		</Root>
	);
};

const Root = styled(Box.Abs)`
	overflow:hidden;
`;

const DefaultSplash = styled(Box.Abs)`
	background:#2e5150;
`;