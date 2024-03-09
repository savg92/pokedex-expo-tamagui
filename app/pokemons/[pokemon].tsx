import React from 'react';
import { Link, useGlobalSearchParams, useNavigation } from 'expo-router';
import { getPokemon } from '../../services/pokeApi';
import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { Button, H2, Image, Text, View } from 'tamagui';

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
			<View>
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
							<Text>Type:</Text>
							<View paddingLeft={10}>
								{data.type.map((type: any, index: number) => (
									<Text key={index}>{type.type.name}</Text>
								))}
							</View>
						</View>
						<View>
							<Text>Abilities:</Text>
							<View paddingLeft={10}>
							{data.avilities.map((avility: any, index: number) => (
								<Text key={index}>{avility.ability.name}</Text>
							))}
							</View>
						</View>
						<Text>Weight: {data.weight} pounds</Text>
						<Text>Height: {data.height} feet</Text>
					</View>
				)}
			</View>
		</View>
	);
};

export default Pokemon;
