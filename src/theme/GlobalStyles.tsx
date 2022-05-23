import { createGlobalStyle, css } from "styled-components";
import * as FontFamilies from "#fonts";

const getFontCSS = (name:string, url:string) => {
	return css`
		@font-face {
			font-family:'${name}';
			font-style: normal;
			font-weight: 400;
			src: local('${name}'), url(${url}) format('woff');
		}
	`;
};

const fontFamilies = css`
	${getFontCSS("Futura", FontFamilies.Futura)};
`;

const fonts = css`
	${fontFamilies};
	font-family: Futura, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
		"Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
`;

export const GlobalStyles = createGlobalStyle`
	body {
		margin: 0;
		${fonts};
	}
`;