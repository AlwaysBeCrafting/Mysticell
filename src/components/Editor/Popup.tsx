import * as React from "react";
import { connect as reduxConnect } from "react-redux";

import { Anchor, Position } from "data/shared";
import { PopupState } from "redux/reducers/popup";

import "./Popup.less";

interface PopupProps {
	position: Position;
	anchor?: Anchor;
}

export default class extends React.PureComponent<PopupProps, void> {
	public render() {
		const className = [ "popup" ];
		if ( this.props.anchor ) {
			className.push( `anchor-${ this.props.anchor.horizontal }` );
			className.push( `anchor-${ this.props.anchor.vertical }` );
		}
		return <div
			className={ className.join( " " )}
			style={{
				left: this.props.position.x,
				top: this.props.position.y,
			}}
		>
			{ this.props.children }
		</div>;
	}
}
