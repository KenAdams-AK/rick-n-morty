import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { fetchCharacters } from "../redux/slices/charactersSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import CharactersList from "../components/CharactersList";
import CharactersLoadingFallback from "../components/CharactersLoadingFallback";
import ErrorContainer from "../components/ErrorContainer";
import HomePageLogo from "../assets/imgs/rick-n-morty-logo.png";
import SearchInput from "../components/SearchInput";
import useSessionStorage from "../hooks/useSessionStorage";
import { Character } from "../models/responseModel";
import debounce from "lodash.debounce";

export default function HomePage() {
	const dispatch = useAppDispatch();
	const { isLoading, characters, error } = useAppSelector(
		(state) => state.characters
	);
	const [query, setQuery] = useState<string | null>(null);
	const [charactersSS, setCharactersSS] = useSessionStorage<Character[]>(
		"characters",
		[]
	);

	console.log({ charactersSS });
	console.log({ characters });

	const debouncedSearch = useMemo(
		() =>
			debounce(
				(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value.trim()),
				800
			),
		[]
	);

	useEffect(() => {
		if (!characters) return;
		setCharactersSS(characters);
	}, [characters]);

	useEffect(() => {
		if (query == null) return;
		const promise = dispatch(fetchCharacters(query));
		return () => {
			promise.abort();
			debouncedSearch.cancel();
		};
	}, [query]);

	return (
		<main className="HomePage">
			<div className="HomePage__container">
				<div className="HomePage__logo">
					<img className="HomePage__image" src={HomePageLogo} alt="Image" />
				</div>
				<SearchInput
					// It was said to implement a filter, I was curious to try implementing search by name according to the API documentation
					placeholder="Search by name..."
					maxLength={15}
					onChange={debouncedSearch}
					// onEnterUp={onEnterUp}
					autoFocus
				/>
				{/* Ignoring errors from purposely aborted calls */}
				{error && error !== "Aborted" ? (
					<ErrorContainer error={error} />
				) : isLoading ? (
					<CharactersLoadingFallback />
				) : (
					<CharactersList data={characters} />
				)}
			</div>
		</main>
	);
}
