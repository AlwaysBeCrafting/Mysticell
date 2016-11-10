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
					buttons={ child.buttons }
					mapItem={ props.mapItem }
				/> )
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
				{ this.props.buttons.map( button => <img
					src={ button.img }
					onClick={ button.onClick }
					alt={ button.alt }
				/> ) }
			</a>
			{ hasChildren && (
				<ul>
					{ item.children
						.map( this.props.mapItem )
						.map( child => <TreeItem
							item={ child }
							key={ child.value }
							buttons={ child.buttons }
							mapItem={ this.props.mapItem } />
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
