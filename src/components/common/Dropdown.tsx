import * as React from 'react';

import './Dropdown.less';

export interface DropdownItem {
	value: any;
	text: string;
}

export interface DropdownProps extends React.Props<Dropdown> {
	items: DropdownItem[];
	selection: DropdownItem;
	open: boolean;
	onOpen: (item: React.MouseEvent<HTMLButtonElement>) => void;
	onClose: (item: React.MouseEvent<HTMLButtonElement>) => void;
	onSelect: (item: DropdownItem) => void;
}

export class Dropdown extends React.Component<DropdownProps, {}> {
	public render(): JSX.Element {
		const { items, selection, open, onOpen, onClose, onSelect } = this.props;
		return (
			<button
				className={ open ? 'open dropdown' : 'dropdown' }
				data-value={ selection.value }
				onClick={ open ? onClose : onOpen }
				onBlur={ onClose }
				tabIndex={ 0 }>

				<span className="value">{ selection.text }</span>
				<ol>{
					items.map( item => <li
						data-value={ item.value }
						key={ item.value }>
						<a
							tabIndex={ 0 }
							onClick={ () => onSelect( item ) }>
							{ item.text }
						</a>
					</li> )
				}</ol>
				<div className="hidden-child">{
					items.map( ({ text, value }) => <span key={ value }>{ text }</span> )
				}</div>
			</button>
		);
	}
}

export default Dropdown;
