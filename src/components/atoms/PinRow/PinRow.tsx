import classNames from "classnames";
import React from "react";

import { Param } from "data/common";

import "./PinRow.scss";


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

class PinRow extends React.PureComponent<Props> {
	public render() {
		const { className, name, source, takesInput } = this.props;
		const type = source ? "source" : "target";
		return (
			<div
				className={classNames(`pinRow ${type}PinRow`, className)}
				key={name}
			>
				<div className={`pinRow-pin ${type}PinRow-pin`} />
				<label className="pinRow-label">{name}</label>
				{
					!source && takesInput &&
					<input
						className="pinRow-value"
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


export { PinRow };
