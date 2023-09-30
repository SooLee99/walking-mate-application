import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';

import { getCurrentDate, getCurrentTime } from '../../utils/utils';

import CustomDate from '../../components/appInquiry/date';
import SendBox from '../../components/appInquiry/sendbox';
import ChatBotBox from '../../components/appInquiry/chatBotbox';
import CustomChatBox from '../../components/appInquiry/customChatbox';

function CounselingTalkScreen() {
  // user의 닉네임 백엔드에서 가져오기.
  const currentTime = getCurrentTime();
  const currentDate = getCurrentDate();
  const slideAnimation = new Animated.Value(0);
  const [messages, setMessages] = useState([]);

  const scrollViewRef = useRef();
  const sendBoxHeight = 100;
  const bottomPadding = 100;

  function sendMessageHandler(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  // useEffect를 사용하여 컴포넌트가 마운트될 때 애니메이션 시작
  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 1500, // 애니메이션 지속 시간 (ms)
      useNativeDriver: true,
    }).start(); // 애니메이션 시작
  }, []);

  // slideAnimation을 사용하여 ChatBox의 translateY 값 설정
  const slideStyle = {
    transform: [
      {
        translateY: slideAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, 0], // ChatBox가 위에서 아래로 슬라이드되는 효과
        }),
      },
    ],
  };
  return (
    <View style={styles.rootContainer}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContentContainer,
          { paddingBottom: sendBoxHeight + bottomPadding },
        ]} // 추가
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }}>
        <CustomDate currentDate={currentDate} />
        <View style={styles.aiImageContainer}>
          <Image source={require('../../../assets/image/AIBot.png')} />
          <Text style={styles.aiText}>워킹이</Text>
        </View>
        <Animated.View style={[styles.chatBoxContainer, slideStyle]}>
          <ChatBotBox currentTime={currentTime}>
            안녕하세요! 워킹메이트 123님!
          </ChatBotBox>
          <ChatBotBox currentTime={currentTime}>
            저는 궁금증을 풀어드리는 '워킹이' 에요!
          </ChatBotBox>
        </Animated.View>
        {messages.map((message, index) => (
          <CustomChatBox key={index} currentTime={currentTime}>
            {message}
          </CustomChatBox>
        ))}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
          style={styles.commentInput}>
          <SendBox onMessageSend={sendMessageHandler} />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

export default CounselingTalkScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 5,
    backgroundColor: '#FFFFFF',
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  aiImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  aiText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  commentInput: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
});
