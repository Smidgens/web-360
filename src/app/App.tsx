import { FC } from "react";
import styled from "styled-components";
import { Box } from "@ui";
import { Panorama } from "$components";
export const App:FC = () => {
	return (
		<Root>
			<Panorama/>
		</Root>
	);
};

const Root = styled(Box.Abs)`
	overflow:hidden;
`;
