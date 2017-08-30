import classNames from "classnames";
import React from "react";

import { Card } from "components/atoms";

import "./NodeMenu.scss";


interface Props {
	className: string;
	onItemSelected: (item: string) => void;
}


interface State {
	open: boolean;
}


class NodeMenu extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { open: false };
	}

	public render() {
		const { className } = this.props;
		const { open } = this.state;
		const openClass = { "is-open": open };
		return (
			<Card className={ classNames("nodeMenu", className) }>
				<button className={ classNames("nodeMenu-toggle", openClass) } onClick={ this.toggleOpen }>
					Add node
				</button>
				<div  className={ classNames("nodeMenu-body", openClass) }>
					<div className="nodeMenu-body-categories">
						<div className="nodeMenu-body-categories-category">
							<button className="nodeMenu-body-categories-category-toggle">Math</button>
						</div>
						<div className="nodeMenu-body-categories-category">
							<button className="nodeMenu-body-categories-category-toggle">Text</button>
						</div>
						<div className="nodeMenu-body-categories-category">
							<button className="nodeMenu-body-categories-category-toggle">List</button>
						</div>
						<div className="nodeMenu-body-categories-category">
							<button className="nodeMenu-body-categories-category-toggle">Custom</button>
						</div>
					</div>
					<div className="nodeMenu-body-search">
						<button className="nodeMenu-body-search-button icon">search</button>
						<div className="nodeMenu-body-search-input" />
					</div>
				</div>
			</Card>
		);
	}

	public toggleOpen = () => {
		this.setState({
			open: !this.state.open,
		});
	}
}


export { NodeMenu };
export default NodeMenu;
