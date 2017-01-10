import * as React from 'react';
import { connect as reduxConnect } from 'react-redux';

import { Anchor, Position } from 'data/shared';
import { PopupState } from 'state';

import './Popup.less';

interface PopupProps {
	position: Position;
	anchor?: Anchor;
}

export default class extends React.PureComponent<PopupProps, void> {
	public render() {
		return <div className="popup">
			{ this.props.children }
		</div>;
	}
}
