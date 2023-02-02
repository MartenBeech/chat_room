import {doc, getDoc, collection, setDoc, getDocs} from 'firebase/firestore';
import {ChatRoom} from '../entities/chatRoom';
import {Message} from '../entities/message';
import {avatar, fullName} from './auth';
import {db} from './config';

export async function getChatRoom(id: number) {
  let returnValue: ChatRoom | undefined;
  const docRef = doc(db, 'ChatRooms', id.toString());
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const snapData = docSnap.data();
    returnValue = snapData as ChatRoom;
  }
  return returnValue;
}

export async function getChatRooms(): Promise<ChatRoom[]> {
  const returnValue: ChatRoom[] = [];
  const colRef = collection(db, 'ChatRooms');
  const colSnap = await getDocs(colRef);
  colSnap.forEach(document => {
    const data = document.data() as ChatRoom;
    returnValue.push(data);
  });
  return returnValue;
}

interface SubmitMessage {
  text: string;
  chatRoomId: number;
}

export async function submitMessage(props: SubmitMessage) {
  const chatRoom = await getChatRoom(props.chatRoomId);
  if (chatRoom) {
    const currentDate = new Date().toString();
    const messages = [...chatRoom.messages];
    messages.push({
      messageText: props.text,
      messageDate: currentDate,
      senderName: fullName,
      senderAvatar: avatar,
    });
    await setDoc(doc(db, 'ChatRooms', props.chatRoomId.toString()), {
      ...chatRoom,
      messages,
      lastModified: currentDate,
    } as ChatRoom);
  }
}
