import classNames from "classnames";
import React from "react";

import { Param } from "data/common";

import "./Pin.scss";


interface CommonProps {
	name: string;
	className?: string;
	takesInput?: boolean;
	userValue?: string;
	onChange?: (index: number, value: string) => void;
	index: number;
	param: Param;
}

interface SrcProps extends CommonProps {
	source: true;
	target?: undefined;
}

interface DstProps extends CommonProps {
	source?: undefined;
	target: true;
}

type Props = SrcProps | DstProps;

class Pin extends React.PureComponent<Props> {
	public render() {
		const { className, name, source, takesInput } = this.props;
		const type = source ? "source" : "target";
		return (
			<div
				className={classNames(`pin ${type}Pin`, className)}
				key={name}
			>
				<div className={`pin-dot ${type}Pin-dot`} />
				<label className="pin-label">{name}</label>
				{
					takesInput &&
					<input
						className={`pin-value ${type}Pin-value`}
						defaultValue={this.props.userValue}
						onChange={this.onChange}
					/>
				}
			</div>
		);
	}

	private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (this.props.onChange) {
			this.props.onChange(this.props.index, event.currentTarget.value);
		}
	}
}


export { Pin };
