import * as React from 'react';

import './FAB.less';

export interface FABProps extends React.Props<FAB> {
	icon: string;
	onClick: (item: React.MouseEvent<HTMLButtonElement>) => void;
}

export class FAB extends React.Component<FABProps, {}> {
	public render(): JSX.Element {
		return (
			<button className="fab" onClick={ this.props.onClick }>
				<span className="icon">{ this.props.icon }</span>
			</button>
		);
	}
}

export default FAB;
