import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'tamagui';
import { getPokemon } from '../../services/pokeApi';
import { useQueries, useQuery } from '@tanstack/react-query';
import PokemonCard from '../../components/pokemonCard';
import { FlatList } from 'react-native';
import { Stack } from 'expo-router';

const TabTreeScreen = () => {
	const [favoritePokemons, setFavoritePokemons] = useState<string[]>([]);

	console.log(favoritePokemons);

	const getFavoritePokemons = async() => {
		await AsyncStorage.getItem('favoritePokemons')
			.then((data) => {
				if (data !== null) {
					setFavoritePokemons(JSON.parse(data));
				}
			})
			.catch((e) => {
				console.log('Error:', e);
			});
	};
	
	useEffect(() => {
		getFavoritePokemons();
	}, []);
	
	console.log(favoritePokemons);

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
			<Stack.Screen
				options={{
					title: 'Favorites',
					headerShown: true,
				}}
			/>
			{favoritePokemons.length === 0 && <Text>No favorite pokemons found.</Text>}
			{favoritePokemons.length > 0 && 
			<FlatList
				data={pokemonQueries.map((query) => query.data)}
				keyExtractor={(item, index) => item?.name + item?.id || `item-${index}`}
				renderItem={({ item }) => (item ? <PokemonCard item={item} /> : null)}
			/>
			}
		</View>
	);
};

export default TabTreeScreen;
