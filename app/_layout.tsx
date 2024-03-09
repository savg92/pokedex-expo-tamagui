import '../tamagui-web.css';
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';

import { Stack } from 'expo-router';

import { useColorScheme } from 'react-native';

import { TamaguiProvider } from 'tamagui';
import { tamaguiConfig } from '../tamagui.config';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { useFonts } from 'expo-font';
import { useEffect } from 'react';

export default function RootLayout() {
	const [loaded] = useFonts({
		Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
		InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
	});

	const colorScheme = useColorScheme() ?? 'light';

	const queryClient = new QueryClient();

	useEffect(() => {
		if (loaded) {
			// can hide splash screen here
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<TamaguiProvider
			config={tamaguiConfig}
			defaultTheme={colorScheme}
		>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<QueryClientProvider client={queryClient}>
					<Stack>
						<Stack.Screen
							name='(tabs)'
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name='modal'
							options={{ presentation: 'modal', headerShown: false }}
						/>
					</Stack>
				</QueryClientProvider>
			</ThemeProvider>
		</TamaguiProvider>
	);
}
