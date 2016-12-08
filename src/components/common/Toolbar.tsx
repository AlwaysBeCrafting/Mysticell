import * as React from 'react';

import './Toolbar.less';

export interface ToolbarProps extends React.Props<Toolbar> {
}

export class Toolbar extends React.Component<ToolbarProps, {}> {
	public render(): JSX.Element {
		return <menu type="toolbar">{ this.props.children }</menu>;
	}
}

export default Toolbar;
