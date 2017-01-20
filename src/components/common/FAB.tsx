import * as React from "react";

import "./FAB.less";

export interface FabProps {
	icon: string;
	onClick: (item: React.MouseEvent<HTMLButtonElement>) => void;
}

export default ( props: FabProps ) => <button className="fab" onClick={ props.onClick }>
	<span className="icon">{ props.icon }</span>
</button>;
