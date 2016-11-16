import React from 'react';

import './Dropdown.less';



export default ({ items, selection, open, onOpen, onClose, onSelect }) => <button
	className={ open ? 'open dropdown' : 'dropdown' }
	data-value={ selection.value }
	onClick={ open ? onClose : onOpen }
	onBlur={ onClose }
	tabIndex="0">
	
	<span className="value">{ selection.text }</span>
	<ol>{
		items.map( item => <li
			data-value={ item.value }
			key={ item.value }>
			<a
				tabIndex="0"
				onClick={ () => onSelect( item ) }>
				{ item.text }
			</a>
		</li> )
	}</ol>
	<div className="hidden-child">{
		items.map( ({ text, value }) => <span key={ value }>{ text }</span> )
	}</div>
</button>;
