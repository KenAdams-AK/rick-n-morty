import { ChangeEvent, InputHTMLAttributes, ReactEventHandler } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	// onEnterUp: React.KeyboardEventHandler<HTMLInputElement>;
}

export default function SearchInput(props: IProps) {
	const {
		maxLength,
		placeholder,
		value,
		autoFocus,
		onChange,
		// onEnterUp,
		...restProps
	} = props;

	return (
		<div className="SearchInput">
			<input
				type="search"
				className="SearchInput__input"
				placeholder={placeholder}
				maxLength={maxLength}
				autoFocus={autoFocus}
				onChange={onChange}
				// onKeyUp={onEnterUp}
				{...restProps}
			/>
		</div>
	);
}
