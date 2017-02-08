import * as React from "react";

import "./index.less";


interface FabProps {
	icon: string;
	onClick: (item: React.MouseEvent<HTMLButtonElement>) => void;
}


export default ( props: FabProps ) => (
	<button className="fab" onClick={ props.onClick }>
		<span className="icon">{ props.icon }</span>
	</button>
);
