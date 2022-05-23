import styled from "styled-components";
import React, { FC, CSSProperties } from "react";

export class Box {
	static get Abs(){ return AbsBox; }
	static get Rel(){ return RelBox; }
	static get FlexFill(){ return FlexBox; }
	static get Ratio(){ return RatioBox; }
	static fixedRatio(ratio:number, dir:RatioDir = "y"){
		return defineRatio(ratio, dir);
	}

	static customStretchBox(ptype:PosType, options:CustomBoxOptions = {}){
		const pos = posNames[ptype];
		const BoxRoot:any = styled(StretchBox)`
			position:${pos};
		`;
		const c:FC<DefaultProps> = (props) => {
			return (
				<BoxRoot {...props}>
					{ props.children }
				</BoxRoot>
			);
		};
		return c;
	}
}

type CustomBoxOptions = {
	clip?:ClipType;
};

type ClipType = "rhombus"|"circle";
type PosType = "a"|"r"|"f";

const posNames:Record<PosType,string> = {
	"a":"absolute",
	"r":"relative",
	"f":"fixed"
};

const StretchBox = styled.div`
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const AbsBox = styled(StretchBox)`
	position: absolute;
`;

const RelBox = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
`;

interface IFlexBox {
	className?:string;
	style?:CSSProperties;
	children?:React.ReactNode;
};

const FlexBox:FC<IFlexBox> = ({ className, style, children }) => {
	return (
		<FlexFill>
			<AbsBox className={ className } style={ style }>
				{ children }
			</AbsBox>
		</FlexFill>
	);
};

const FlexFill = styled.div`
	flex: 1 1 auto;
	width:100%;
	height:100%;
	position:relative;
`;

type RatioDir = "x"|"y";

interface IRatioBox extends React.AllHTMLAttributes<HTMLDivElement> {
	ratio?: number;
	direction?: RatioDir;
	className?:string;
	children?:React.ReactNode;
}

type DefaultProps = React.AllHTMLAttributes<HTMLDivElement>;

const RatioBox: FC<IRatioBox> = ({ className, children, ratio, direction }) => {
	const Wrapper:any = direction == "x" ? RatioX : RatioY;
	return (
		<Wrapper ratio={ratio || 100}>
			<AbsBox className={className || ""}>{children}</AbsBox>
		</Wrapper>
	);
};

const defineRatio = (ratio:number, dir:RatioDir) => {
	const c:FC<DefaultProps> = (props) => {
		return (
			<RatioBox ratio={ratio} {...props}/>
		);
	}
	return c;
};

interface IRatioWrapper {
	ratio:number;
}

const RatioWrapper = styled.div<IRatioWrapper>`
	position: relative;
`;

const RatioX = styled(RatioWrapper)`
	padding-left: ${({ ratio }) => ratio}%;
	height:100%;
`;

const RatioY = styled(RatioWrapper)`
	padding-top: ${({ ratio }) => ratio}%;
	width:100%;
`;