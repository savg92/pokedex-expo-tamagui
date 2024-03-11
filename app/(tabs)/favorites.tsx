import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { H1, Text, View, Image, ListItem, H2, Card } from 'tamagui';
import { getPokemon } from '../../services/pokeApi';
import { useQueries, useQuery } from '@tanstack/react-query';
import PokemonCard from '../../components/pokemonCard';
import { FlatList } from 'react-native';

const favorites = () => {
	const [favoritePokemons, setFavoritePokemons] = useState<string[]>([]);

	useEffect(() => {
		const getFavoritePokemons = async () => {
			try {
				const value = await AsyncStorage.getItem('favoritePokemons');
				if (value !== null) {
					setFavoritePokemons(JSON.parse(value));
				}
			} catch (e) {
				console.log('Error:', e);
			}
		};

		getFavoritePokemons();
	}, []);

	const pokemonQueries = useQueries({
		queries: favoritePokemons.map((pokemon) => ({
			queryKey: ['pokemon', pokemon],
			queryFn: () => getPokemon(pokemon),
		})),
	});

	const isLoading = pokemonQueries.some((query) => query.isLoading);
	const anyErrors = pokemonQueries.some((query) => query.error);

	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	if (anyErrors) {
		return <Text>An error occurred while fetching data.</Text>;
	}

	return (
		<View
			flex={1}
			alignItems='center'
		>
			<FlatList
				data={pokemonQueries.map((query) => query.data)}
				keyExtractor={(item, index) => item?.name + item?.id || `item-${index}`}
				renderItem={({ item }) => (item ? <PokemonCard item={item} /> : null)}
			/>
		</View>
	);
};

export default favorites;