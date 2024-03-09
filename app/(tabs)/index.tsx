import { FlatList } from 'react-native';
import { Card, Text, View, Image, H2, Paragraph } from 'tamagui';
import { getPokemons } from '../../services/pokeApi';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';

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
						<Paragraph>Type: {item.type}</Paragraph>
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
