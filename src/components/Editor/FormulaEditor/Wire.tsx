import * as React from 'react';

import './Wire.less';

const Wire = (props: any) =>
<div className="wire">
	<svg viewBox="0 0 1 1" preserveAspectRatio="none">
		<path className="line" d="M 0,0 C 0.5,0 0.5,1 1,1"/>
	</svg>
</div>;

export default Wire;
