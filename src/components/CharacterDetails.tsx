import { Character } from "../models/responseModel";

type PropsT = {
	character: Character | null;
};

export default function CharacterDetails(props: PropsT) {
	const { character } = props;

	if (!character) return null;

	return (
		<div className="CharacterDetails__container CharacterDetails__container--small">
			<div className="CharacterDetails__picture">
				<img
					className="CharacterDetails__image"
					src={character.image}
					alt="Image"
				/>
			</div>
			<div className="CharacterDetails__name">{character.name}</div>
			<div className="CharacterDetails__info info">
				<div className="info__title">Informations</div>
				<ul className="info__list">
					<li className="info__item">
						<span>Gender</span>
						{character.gender}
					</li>
					<li className="info__item">
						<span>Status</span>
						{character.status}
					</li>
					<li className="info__item">
						<span>Specie</span>
						{character.species}
					</li>
					<li className="info__item">
						<span>Origin</span>
						{character.origin.name}
					</li>
					<li className="info__item">
						<span>Type</span>
						{character?.type || "unknown"}
					</li>
				</ul>
			</div>
		</div>
	);
}
