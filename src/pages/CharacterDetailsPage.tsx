import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CharacterDetails from "../components/CharacterDetails";
import useSessionStorage from "../hooks/useSessionStorage";
import { Character } from "../models/responseModel";
import { useAppSelector } from "../redux/store";

type CharacterParamsT = {
	id: string;
};

export default function CharacterDetailsPage() {
	const navigate = useNavigate();
	const { id } = useParams<CharacterParamsT>();
	const { characters } = useAppSelector((state) => state.characters);
	const [characterSS, setCharacterSS] = useSessionStorage<Character | null>(
		"character",
		null
	);

	useEffect(() => {
		if (!id) return;
		const currentCharacter = characters.find(
			(character) => character.id == parseInt(id)
		);

		if (currentCharacter) {
			setCharacterSS(currentCharacter);
		}
	}, [characters, id]);

	return (
		<main className="CharacterDetailsPage">
			<button
				className="CharacterDetailsPage__button"
				type="button"
				onClick={() => navigate(-1)}
			>
				GO BACK
			</button>
			<CharacterDetails character={characterSS} />
		</main>
	);
}
