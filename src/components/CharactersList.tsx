import { Character } from "../models/responseModel";
import CharacterCard from "./CharacterCard";

type PropsT = {
	data: Character[];
};

export default function CharactersList(props: PropsT) {
	const { data } = props;

	if (!data) return null;

	return (
		<ul className="CharactersList">
			{data.map((item: Character) => (
				<li className="CharactersList__item" key={item.id}>
					<CharacterCard character={item} />
				</li>
			))}
		</ul>
	);
}
