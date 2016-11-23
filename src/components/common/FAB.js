import React from 'react';

import './FAB.less';

export default props => <button className="fab" onClick={ props.onClick }>
	<span className="icon">{ props.icon }</span>
</button>;
