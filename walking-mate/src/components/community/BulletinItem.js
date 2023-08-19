import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../themes/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import { formatTimeAgo } from '../../utils/utils';
import { useNavigation } from '@react-navigation/native';

function BulletinItem({ bulletin }) {
  const navigation = useNavigation();
  const createdAt = new Date(bulletin.regTime); // Parse ISO 8601 date string from 'regTime'
  const formattedCreatedAt = formatTimeAgo(createdAt);

  const getFormattedDate = (date) => {
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const detailedDate = getFormattedDate(createdAt);

  function goToDetailScreen() {
    navigation.navigate('게시물 자세히 보기', { bulletin }); // 추가로 게시물 관련 사항
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.35}
      onPress={goToDetailScreen}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{bulletin.title}</Text>
          <View style={styles.timestampContainer}>
            <Text style={styles.createdAt}>
              {detailedDate} ({formattedCreatedAt})
            </Text>
            <Text style={styles.separator}>|</Text>
            <Text style={styles.author}>{bulletin.userId}</Text>
          </View>
        </View>
        <Text style={styles.content}>{bulletin.content}</Text>
        <View style={styles.footer}>
          <View style={styles.actionButton}>
            <Icon name="heart" size={20} color={Colors.primary100} />
            <Text style={styles.actionText}>{bulletin.recommend}</Text>
          </View>
          <View style={styles.actionButton}>
            <Icon name="comment" size={20} color={Colors.primary100} />
            <Text style={styles.actionText}>
              {bulletin.comments ? bulletin.comments.length : 0}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default BulletinItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    minWidth: '90%',
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createdAt: {
    color: '#888',
    marginRight: 10,
  },
  separator: {
    color: '#888',
    marginHorizontal: 5,
  },
  author: {},
  content: {
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
  },
  actionButton: {
    flexDirection: 'row',
    marginRight: 25,
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
  },
});
