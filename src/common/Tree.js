import React from 'react';

import './Tree.less';



const Tree = props => {
	return (
		<ul className="tree">
			{ props.items
				.map( props.mapItem )
				.map( child => <TreeItem
					item={ child }
					key={ child.value }
					mapItem={ props.mapItem }
					makeControls={ props.makeControls } />
				)
			}
		</ul>
	);
}

class TreeItem extends React.Component {
	constructor() {
		super();
		this.state = { expanded: false };
	}
	
	render() {
		let item = this.props.item;
		let hasChildren = item.children && ( item.children.length > 0 );
		
		let className = [
			( hasChildren ? 'parent' : '' ),
			( this.state.expanded ? 'expanded' : '' )
		].join( ' ' );
		
		return <li className={ className }>
			<a onClick={ () => this.toggleExpanded() }>
				<label>{ item.text }</label>
				{ this.props.makeControls && this.props.makeControls( item ) }
			</a>
			{ hasChildren && (
				<ul>
					{ item.children
						.map( this.props.mapItem )
						.map( child => <TreeItem
							item={ child }
							key={ child.value }
							mapItem={ this.props.mapItem }
							makeControls={ this.props.makeControls } />
						)
					}
				</ul>
			) }
		</li>
	}
	
	toggleExpanded() {
		this.setState( oldState => {
			return { ...oldState, expanded: !oldState.expanded };
		} );
	}
}



export default Tree;
