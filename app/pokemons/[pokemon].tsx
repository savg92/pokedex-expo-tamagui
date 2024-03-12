import React, { useEffect, useState } from 'react';
import { useGlobalSearchParams, useNavigation } from 'expo-router';
import { getPokemon } from '../../services/pokeApi';
import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { Button, H2, H4, Image, ScrollView, Text, View } from 'tamagui';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Pokemon = () => {
	const { pokemon } = useGlobalSearchParams();
	const {
		data,
		isLoading: loading,
		error,
	} = useQuery({
		queryKey: ['pokemon', pokemon],
		queryFn: () => getPokemon(pokemon?.toString()),
	});
	const navigate = useNavigation();

	const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

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
		}

		getFavoritePokemons();
	}, [favoritePokemons]);

	const handleAddRemoveFavorite = async () => {
		try {
			const value = await AsyncStorage.getItem('favoritePokemons');
			if (value !== null) {
				const favoritePokemons = JSON.parse(value);
				const isFavorite = favoritePokemons.includes(data?.name);
				if (isFavorite) {
					const newFavoritePokemons = favoritePokemons.filter(
						(pokemonId: number) => pokemonId !== data?.name
					);
					await AsyncStorage.setItem(
						'favoritePokemons',
						JSON.stringify(newFavoritePokemons)
					);
				} else {
					await AsyncStorage.setItem(
						'favoritePokemons',
						JSON.stringify([...favoritePokemons, data?.name])
					);
				}
			} else {
				await AsyncStorage.setItem('favoritePokemons', JSON.stringify([data?.name]));
			}
		} catch (e) {
			console.log('Error:', e);
		}
	}

	return (
		<View
			flex={1}
			alignItems='center'
			gap={10}
		>
			<Stack.Screen
				// name='pokemons'
				options={{
					title: `${data?.name[0].toUpperCase() + data?.name.slice(1)}`,
					headerShown: true,
					headerLeft: () => (
						<Button onPress={() => navigate.goBack()}>Back</Button>
					),
				}}
			/>
			<ScrollView>
				{loading && <Text>Loading...</Text>}
				{error && <Text>Error: {error.message}</Text>}
				{data && (
					<View gap={10}>
						<View>
							<H2>{data.name[0].toUpperCase() + data.name.slice(1)}</H2>
							<Text>Id: {data.id}</Text>
						</View>
						<Image
							source={{ uri: data.img }}
							width={150}
							height={150}
						/>
						<View>
							<H4>Type:</H4>
							<View paddingLeft={10}>
								{data.type.map((type: any, index: number) => (
									<Text key={index}>{type.type.name[0].toUpperCase() + type.type.name.slice(1)}</Text>
								))}
							</View>
						</View>
						<View>
							<H4>Abilities:</H4>
							<View paddingLeft={10}>
							{data.avilities.map((avility: any, index: number) => (
								<Text key={index}>{avility.ability.name[0].toUpperCase() + avility.ability.name.slice(1)}</Text>
							))}
							</View>
						</View>
						<View>
							<H4>Weight:</H4>
							<Text>{data.weight} pounds</Text>
						</View>
						<View>
							<H4>Height:</H4>
							<Text>{data.height} feet</Text>
						</View>
						{favoritePokemons.includes(data.name) ? (
							<Button onPress={handleAddRemoveFavorite}
							>
								Remove from favorites
							</Button>
						) : (
							<Button onPress={() => handleAddRemoveFavorite()}
							>
								Add to favorites
							</Button>
						)}
					</View>
				)}
			</ScrollView>
		</View>
	);
};

export default Pokemon;
