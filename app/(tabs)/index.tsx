import { FlatList } from 'react-native';
import { Card, Text, View, Image, H2, Paragraph, Button } from 'tamagui';
import { getPokemons } from '../../services/pokeApi';
import { useQuery } from '@tanstack/react-query';
import { Link, Stack } from 'expo-router';
import PokemonCard from '../../components/pokemonCard';

export default function TabOneScreen() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['pokemon'],
		queryFn: () => getPokemons(100, 0),
	});

	return (
		<View
			flex={1}
			alignItems='center'
		>
			<Stack.Screen
				// name='pokemons'
				options={{
					title: 'Pokedex',
					headerShown: true,
				}}
			/>
			{isLoading && <Text>Loading...</Text>}
			{error && <Text>Error: {error}</Text>}
			{data && (
				<FlatList
					data={data}
					keyExtractor={(item) => item.name}
					renderItem={({ item }) => <PokemonCard item={item} />}
				/>
			)}
		</View>
	);
}
