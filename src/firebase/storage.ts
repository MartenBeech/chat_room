import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from 'firebase/storage';

interface uploadImage {
  roomId: number;
  image: any;
  name: string;
}

export async function uploadImage(props: uploadImage) {
  const storage = getStorage();
  const imageRef = ref(storage, `${props.roomId}/${props.name}`);
  const uploadResult = await uploadBytes(imageRef, props.image);
  return uploadResult;
}

interface GetImage {
  roomId: number;
  name: string;
}

export async function getImage(props: GetImage) {
  const storage = getStorage();
  const storageRef = ref(storage, `${props.roomId.toString()}/${props.name}`);
  return await getDownloadURL(storageRef);
}
