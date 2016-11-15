import React from 'react';

import './Dropdown.less';



export default ({ items, selection, open, onOpen, onClose, onSelect }) => <div
	data-value={ selection.value }
	className={ open ? 'open dropdown' : 'dropdown' }
	onClick={ open ? onClose : onOpen }
	onBlur={ onClose }
	tabIndex="0">
	
	<label>{ selection.text }</label>
		<ol>{
			items.map( item => <li
				data-value={ item.value }
				key={ item.value }
				onClick={ () => onSelect( item ) }>
				
				{ item.text }
			</li> )
		}</ol>
		<div className="hidden-child">{
			items.map( ({ text, value }) => <span key={ value }>{ text }</span> )
		}</div>
</div>
