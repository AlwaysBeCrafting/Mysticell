import * as React from "react";
import { connect as reduxConnect } from "react-redux";

import { Sheet } from "common/types/document";

import { AppState } from "data";

import SheetComp from "components/molecules/Sheet";

import "./Playmat.less";

interface PlaymatProps {
	sheets: Map<number, Sheet>;
}

const PlaymatComp = ( props: PlaymatProps ) => (
	<div id="playmat">
		<menu type="toolbar" />
		<div id="display-area">{
			Array.from( props.sheets ).map(([ id, sheet ]) => <SheetComp sheet={ sheet } /> )
		}</div>
	</div>
);

export default reduxConnect<PlaymatProps, {}, {}>(
	state => ({ sheets: state.document.sheets.collection }),
)( PlaymatComp );
