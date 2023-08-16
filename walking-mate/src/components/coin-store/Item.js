import { View, Image, Text, StyleSheet, Pressable } from 'react-native';

function Item({ name, coin, image }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressedItem,
      ]}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAyMjJfMjg4%2FMDAxNjc3MDU5MDEyODIx.ctMq0Rdmuf5qJHSWoK0TWF9Z3LoiI9F_RaR5jvuhvu8g.fZ4lA9PRHFjEK5mQGUwybkZapO-XQAh4_Pa0P1M_tI0g.PNG.yezin1223%2F%25BD%25BA%25C5%25A9%25B8%25B0%25BC%25A6_2023-02-22_%25BF%25C0%25C8%25C4_6.43.28.png&type=a340',
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.coinText}>{coin} coin</Text>
      </View>
    </Pressable>
  );
}

export default Item;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: 350,
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 15,
    marginLeft: 20,
    marginBottom: 10,
    backgroundColor: '#E1F1F1',
    borderWidth: 1,
    borderColor: '#D1D1D1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  pressedItem: {
    opacity: 0.5,
    backgroundColor: '#B0E0E6',
  },
  imageContainer: {
    backgroundColor: '#F0F0F0',
    width: 120,
    height: 120,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 15,
  },
  infoContainer: {
    marginLeft: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5,
  },
  coinText: {
    fontSize: 12,
    color: '#0070c9',
    fontWeight: '600',
  },
});
