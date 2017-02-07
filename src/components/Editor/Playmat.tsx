import * as React from "react";
import { connect as reduxConnect } from "react-redux";

import { Grid } from "data";

import { AppState } from "redux/reducers";

import GridComp from "./Grid";

import "./Playmat.less";

interface PlaymatProps {
	grids: Map<number, Grid>;
}

const PlaymatComp = ( props: PlaymatProps ) => <div id="playmat">
	<menu type="toolbar" />
	<div id="display-area">{
		Array.from( props.grids ).map(([ id, grid ]) => <GridComp grid={ grid } /> )
	}</div>
</div>;

export default reduxConnect<PlaymatProps, {}, {}>(
	state => ({ grids: state.document.grids.grids }),
)( PlaymatComp );
