import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
	Button,
	FlatList,
	// Image,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import { getPokemons } from '../../services/pokeApi';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { Card, Paragraph, Image, H2, YStack } from 'tamagui';

export default function Component() {
	const {
		data,
		isLoading: loading,
		error,
	} = useQuery({
		queryKey: ['pokemon'],
		queryFn: () => getPokemons(100, 0),
	});

	const PokemonItem = React.memo(({ item }: any) => (
		<Link href={`/pokemons/${item.name}`}>
			{/* <View style={styles.subContainer}>
				<Image
					source={{ uri: item.img }}
					style={{ width: 150, height: 150 }}
				/>
				<View style={styles.subContainer2}>
					<Text>{item.name[0].toUpperCase() + item.name.slice(1)}</Text>
					<Text>Id: {item.id}</Text>
					<Text>Type: {item.type}</Text>
				</View>
			</View> */}
			
			<Card style={{ marginTop: 10 }}>
				<Card.Header>
					<H2>{item.name[0].toUpperCase() + item.name.slice(1)}</H2>
					<Paragraph>Type: {item.type}</Paragraph>
				</Card.Header>
				<Card.Footer>
					<Image
						source={{ uri: item.img }}
						width={150}
						height={150}
					/>
				</Card.Footer>
				<Card.Background />
			</Card>
		</Link>
	));

	return (
		<View style={styles.container}>
			<Text style={styles.tittle}>Pokemons</Text>
			{loading && <Text>Loading...</Text>}
			{error && <Text>Error: {error.message}</Text>}
			{data && data.length === 0 && <Text>No pokemons</Text>}
			{data && data.length > 0 && (
				<FlatList
					data={data}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<YStack>
							<PokemonItem item={item} />
						</YStack>
					)}
				/>
			)}

			{/* <YStack>
				{data?.map((item) => (
					<PokemonItem
						key={item.id}
						item={item}
					/>
				))}
			</YStack> */}

			<View style={styles.footer}>
				<Link
					href='/'
					asChild
				>
					{/* <Button title='Go to back' /> */}
					<Pressable style={styles.button}>
						<Text style={styles.buttonText}>Go to back</Text>
					</Pressable>
				</Link>
			</View>
			<StatusBar style='auto' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 24,
	},
	tittle: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	main: {
		flex: 1,
	},
	subContainer: {
		flex: 1,
		flexDirection: 'column',
		gap: 10,
		alignItems: 'center',
		width: '95%',
	},
	subContainer2: {
		flex: 1,
		flexDirection: 'column',
		gap: 10,
	},
	footer: {
		marginTop: 20,
		padding: 15,
		borderTopWidth: 1,
		borderTopColor: '#38434D',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		marginTop: 20,
		padding: 10,
		borderRadius: 5,
		backgroundColor: '#183aa0',
		color: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		width: '30%',
	},
	buttonText: {
		color: '#fff',
	},
});
