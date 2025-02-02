import { StyleSheet, Image, Platform, View,Text,ImageBackground, ImageBackgroundBase,FlatList,SafeAreaView} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';


const posts = [
  {
    id: "1",
    username: "@theodore",
    image: '@/assets/images/friends3.jpg', // Replace with actual image URL
    caption: "👀📸⭐😆😍",
  },
  // {
  //   id: "2",
  //   username: "@shreyap",
  //   image: '@/assets/images/friends3.jpg', // Replace with actual image URL
  //   caption: "😈🙉✌️😏🍀",
  // },
  // {
  //   id: "3",
  //   username: "@vivthebean",
  //   image: '@/assets/images/friends3.jpg', // Replace with actual image URL
  //   caption: "😈🙉✌️😏🍀",
  // },
  // {
  //   id: "4",
  //   username: "@kianamayy",
  //   image: '@/assets/images/friends3.jpg', // Replace with actual image URL
  //   caption: "😈🙉✌️😏🍀",
  // },
];

export default function FeedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Friends</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
          <View style={styles.post}>
            <Image source={require('@/assets/images/friends3.jpg')} style={styles.image} />
            <Text style={styles.username}>{'@theodore'}</Text>
            <Text style={styles.caption}>{'👀📸⭐😆😍'}</Text>
          </View>
          <View style={styles.post}>
                <Image source={require('@/assets/images/friends2.jpg')} style={styles.image} />
                <Text style={styles.username}>{'@shreyap'}</Text>
                <Text style={styles.caption}>{'✨🪷🌞🐞📀'}</Text>
          </View>
          <View style={styles.post}>
                <Image source={require('@/assets/images/friend.jpg')} style={styles.image} />
                <Text style={styles.username}>{'@kianaaa'}</Text>
                <Text style={styles.caption}>{'🥐🌷🥳🍳🌛'}</Text>
          </View>
          <View style={styles.post}>
                <Image source={require('@/assets/images/friend5.jpg')} style={styles.image} />
                <Text style={styles.username}>{'@viviang'}</Text>
                <Text style={styles.caption}>{'🪻🌒🐯🥭🏵️'}</Text>
          </View>
          <View style={styles.post}>
                <Image source={require('@/assets/images/friend.jpg')} style={styles.image} />
                <Text style={styles.username}>{'@freezeframe'}</Text>
                <Text style={styles.caption}>{'📸🧊🎞️👥💥'}</Text>
          </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1E1E2C", padding: 10 },
  header: { fontSize: 24, color: "#DADADA", textAlign: "center", marginVertical: 10 },
  post: { backgroundColor: "#2E2E3A", borderRadius: 10, marginBottom: 15, padding: 10 },
  image: { width: "100%", height: 200, borderRadius: 10 },
  username: { color: "#fff", fontWeight: "bold", marginTop: 5 },
  caption: { color: "#ccc", marginTop: 3 },
});

// const styles = StyleSheet.create({
//   headerImage: {
//     color: '#808080',
//     bottom: -90,
//     left: -35,
//     position: 'absolute',
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     gap: 8,
//   },
// });

