import { Link } from "react-router-dom";
import { Character } from "../models/responseModel";

type PropsT = {
	character: Character;
};

// TODO: Add animation on loading

export default function CharacterCard(props: PropsT) {
	const { character } = props;

	if (!character) return null;

	return (
		<Link className="CharacterCard" to={`/character/${character.id}`}>
			<div className="CharacterCard__picture">
				<img
					className="CharacterCard__image"
					src={character.image}
					alt="Image"
					loading="lazy"
				/>
			</div>
			<div className="CharacterCard__info">
				<div className="CharacterCard__name">{character.name}</div>
				<div className="CharacterCard__species">{character.species}</div>
			</div>
		</Link>
	);
}
