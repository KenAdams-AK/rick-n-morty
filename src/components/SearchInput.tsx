import { ChangeEvent, InputHTMLAttributes, ReactEventHandler } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function SearchInput(props: IProps) {
	const { maxLength, placeholder, value, autoFocus, onChange, ...restProps } =
		props;

	return (
		<div className="SearchInput">
			<input
				type="search"
				className="SearchInput__input"
				placeholder={placeholder}
				maxLength={maxLength}
				autoFocus={autoFocus}
				onChange={onChange}
				{...restProps}
			/>
		</div>
	);
}
