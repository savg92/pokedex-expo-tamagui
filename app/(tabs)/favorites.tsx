import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { H1, Text, View, Image } from 'tamagui';
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

	const queries = favoritePokemons.map((pokemon) => {
		return {
			queryKey: ['pokemon', pokemon],
			queryFn: () => getPokemon(pokemon),
		};
	});

	const results = useQueries({ queries });
	// console.log(favoritePokemons);
	console.log(results);

	return (
		<View>
			<H1>Favotites</H1>
			{results.map((result, index) => {
				if (result.isLoading) {
					return <Text key={index}>Loading...</Text>;
				} else if (result.error) {
					return <Text key={index}>Error: {result.error.message}</Text>;
				} else {
					return (
						<View key={index}>
						<Text key={index}>{result.data?.name}</Text>
						<Image
							key={index}
							source={{ uri: result.data?.img }}
							style={{ width: 150, height: 150 }}
						/>
						</View>
					);
				}
			})}

			{/* {
				results.map((result, index) => {
					if (result.isLoading) {
						return <Text key={index}>Loading...</Text>;
					} else if (result.error) {
						return <Text key={index}>Error: {result.error.message}</Text>;
					} else if (result.data) {
						return <PokemonCard key={index} item={result.data} />;
					} else {
						return null;
					}
				})
			} */}
		</View>
	);
};

export default favorites;
