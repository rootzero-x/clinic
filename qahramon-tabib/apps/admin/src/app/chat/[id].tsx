import { useLocalSearchParams } from 'expo-router';
import { ChatScreen } from '../../screens/PeopleScreens';

export default function Route() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ChatScreen id={+id} />;
}
