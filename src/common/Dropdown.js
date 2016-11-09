import React from 'react';

import './Dropdown.less';



class Dropdown extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedItem: { text: '', value: '' },
			active: false
		};
	}
	
	render() {
		let selectedItem = this.state.selectedItem;
		let className = this.state.active ? 'dropdown active' : 'dropdown';
		
		return (
			<div
				data-value={ selectedItem.value }
				className={ className }
				onClick={ this.handleClick.bind( this ) }
				onBlur={ this.handleBlur.bind( this ) }
				tabIndex={ 0 }>
				
				<label>{ selectedItem.text }</label>
					<ol>
						{ this.props.items.map( item => <li
							data-value={ item.value }
							key={ item.value }
							onClick={ () => this.handleSelectItem( item ) }>
							
							{ item.text }
						</li> ) }
					</ol>
					<div className="hidden-child">
						{ this.props.items.map( item => <span
							key={ item.value }>
							
							{ item.text }
						</span> ) }
					</div>
			</div>
		);
	}
	
	componentDidMount() {
		this.setState( oldState => ( { ...oldState, selectedItem: this.props.items[0] } ));
	}
	
	handleClick( e ) {
		this.setState( oldState => ( { ...oldState, active: !oldState.active } ));
	}
	
	handleBlur( e ) {
		this.setState( oldState => ( { ...oldState, active: false } ));
	}
	
	handleSelectItem( item ) {
		this.setState(
			oldState => ( { ...oldState, selectedItem: item } ),
	 		() => {
				this.props.onChange && this.props.onChange( item );
			} );
	}
};



export default Dropdown;
