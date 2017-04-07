import * as classNames from 'classnames';
import * as React from 'react';

import { Anchor, Position } from 'common/types/layout';

import { MenuItem } from 'components/atoms';

import Item from './Item';
import './PopupMenu.scss';


interface Props extends React.HTMLAttributes<HTMLDivElement> {
	position: Position;
	anchor?: Anchor;
	items: MenuItem[];
}


export default ({ position, anchor, items, ...attrs }: Props ) => {
	const style = {
		left: position.x,
		top: position.y,
	};

	const className = classNames(
		'popup',
		{
			'anchor-left': anchor && anchor.horizontal === 'left',
			'anchor-right': anchor && anchor.horizontal === 'right',
			'anchor-top': anchor && anchor.vertical === 'top',
			'anchor-bottom': anchor && anchor.vertical === 'bottom',
		},
	);

	return (
		<div { ...attrs } className={ className } style={ style }>
			{ items.map(( item ) => <Item item={ item } /> ) }
		</div>
	);
};
