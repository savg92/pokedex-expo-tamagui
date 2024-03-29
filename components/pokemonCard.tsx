import { Link } from 'expo-router';
import { Button, Card, H2, Image } from 'tamagui';

const pilColor = (type: string): string => {
	switch (type) {
		case 'fire':
			return 'red';
		case 'water':
			return '#2c62f6';
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

type PokemonList = {
	name: string;
	type: any;
	img: string;
};

const PokemonCard = ({ item }: { item: PokemonList }) => {
	return (
		<Link
			href={`/pokemons/${item.name}`}
			asChild
		>
			<Card
				marginVertical={5}
				$xs={{ flexDirection: 'row', justifyContent: 'space-around' }}
				$md={{ flexDirection: 'column' }}
				minWidth={200}
			>
				<Card.Header justifyContent='flex-start'>
					<H2>
						{typeof item?.name === 'string'
							? item?.name[0].toUpperCase() + item?.name.slice(1)
							: ''}
					</H2>
					<Button
						disabled
						backgroundColor={pilColor(
							(typeof item?.type === 'object'
								? item?.type[0].type.name
								: typeof item?.type === 'string'
								? item?.type
								: ''
							).toLowerCase()
						)}
						size={30}
						width='70%'
					>
						Type:
						{typeof item?.type === 'object'
							? item?.type[0].type.name[0].toUpperCase() +
							  item?.type[0].type.name.slice(1)
							: typeof item?.type === 'string'
							? item?.type[0].toUpperCase() + item?.type.slice(1)
							: ''}
					</Button>
				</Card.Header>
				<Card.Footer justifyContent='center'>
					<Image
						source={{ uri: item.img }}
						width={150}
						height={150}
					/>
				</Card.Footer>
			</Card>
		</Link>
	);
};

export default PokemonCard;
