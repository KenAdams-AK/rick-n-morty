import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CharacterDetails from "../components/CharacterDetails";
import ErrorContainer from "../components/ErrorContainer";
import LoaderFallback from "../components/LoaderFallback";
import useSessionStorage from "../hooks/useSessionStorage";
import { Character } from "../models/responseModel";
import {
	fetchSingleChar,
	setSingleChar,
} from "../redux/slices/singleCharSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

type CharacterParamsT = {
	id: string;
};

export default function CharacterDetailsPage() {
	const navigate = useNavigate();
	const { id } = useParams<CharacterParamsT>();
	const dispatch = useAppDispatch();
	const { isLoading, singleChar, error } = useAppSelector(
		(state) => state.singleChar
	);
	const [singleCharSS, setSingleCharSS] = useSessionStorage<Character | null>(
		"single-character",
		null
	);

	useEffect(() => {
		if (!id) return;
		if (parseInt(id) === singleCharSS?.id) {
			// Setting up the existing character from Session Storage to Refux store on page reload otherwise sending request
			dispatch(setSingleChar(singleCharSS));
			return;
		}
		const promise = dispatch(fetchSingleChar(id));

		// return () => promise.abort();
	}, [id]);

	useEffect(() => {
		if (!singleChar) return;
		setSingleCharSS(singleChar);
	}, [singleChar]);

	return (
		<main className="CharacterDetailsPage">
			<button
				className="CharacterDetailsPage__button"
				type="button"
				onClick={() => navigate(-1)}
			>
				GO BACK
			</button>
			{isLoading ? (
				<LoaderFallback />
			) : error && error !== "Aborted" ? (
				<ErrorContainer error={error} />
			) : (
				<CharacterDetails character={singleChar} />
			)}
		</main>
	);
}
