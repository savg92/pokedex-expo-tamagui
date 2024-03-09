import { FlatList } from 'react-native';
import { Card, Text, View, Image, H2, Paragraph } from 'tamagui';
import { getPokemons } from '../../services/pokeApi';
import { useQuery } from '@tanstack/react-query';
import { Link, Stack } from 'expo-router';

const pilColor = (type: string): string => {
	switch (type) {
		case 'fire':
			return 'red';
		case 'water':
			return 'blue';
		case 'grass':
			return 'green';
		case 'electric':
			return '#FFD700';
		case 'psychic':
			return 'purple';
		case 'poison':
			return 'green';
		case 'normal':
			return 'gray';
		case 'flying':
			return 'skyblue';
		case 'bug':
			return 'green';
		case 'ground':
			return 'brown';
		case 'fighting':
			return 'red';
		case 'rock':
			return 'gray';
		case 'ghost':
			return 'purple';
		case 'ice':
			return 'lightblue';
		case 'steel':
			return 'gray';
		case 'dark':
			return 'black';
		case 'fairy':
			return 'pink';
		default:
			return 'black';
	}
};

export default function TabOneScreen() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['pokemon'],
		queryFn: () => getPokemons(100, 0),
	});

	type PokemonList = {
		name: string;
		type: string;
		img: string;
	};

	const PokemonCard = ({ item }: { item: PokemonList }) => {
		return (
			<Card style={{ marginTop: 10 }}>
				<Link href={`/pokemons/${item.name}`}>
					<Card.Header>
						<H2>{item.name[0].toUpperCase() + item.name.slice(1)}</H2>
						<Paragraph
							backgroundColor={pilColor(item.type)}
							borderWidth={1}
							borderRadius={50}
							borderColor={pilColor(item.type)}
							paddingHorizontal={10}
							width='fit-content'
						>
							Type: {item.type}
						</Paragraph>
					</Card.Header>
					<Card.Footer justifyContent='center'>
						<Image
							source={{ uri: item.img }}
							width={150}
							height={150}
						/>
					</Card.Footer>
					<Card.Background />
				</Link>
			</Card>
		);
	};

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
			{/* <Text fontSize={20}>Tab One</Text> */}
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
