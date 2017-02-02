import * as React from "react";
import { connect as reduxConnect } from "react-redux";

import { AppState, GridState } from "redux/state";

import Grid from "./Grid";

import "./Playmat.less";

interface PlaymatProps {
	grids: Map<number, GridState>;
}

const Playmat = ( props: PlaymatProps ) => <div id="playmat">
	<menu type="toolbar" />
	<div id="display-area">{
		Array.from( props.grids ).map(([ id, grid ]) => <Grid grid={ grid } /> )
	}</div>
</div>;

export default reduxConnect<PlaymatProps, {}, {}>(
	({ grids }) => ({ grids }),
)( Playmat );
