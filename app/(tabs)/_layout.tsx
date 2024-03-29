import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'
import { Text } from 'tamagui'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'red',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <Text>Pokedex!</Text>,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       <Text>Hello!</Text>
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab',
          tabBarIcon: ({ color }) => <Text>two!</Text>,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'favorites',
          tabBarIcon: ({ color }) => <Text>Favorites</Text>,
        }}
      />
    </Tabs>
  )
}
