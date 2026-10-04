import { useLocalSearchParams } from 'expo-router';
import { ChatScreen } from '@admin/screens/PeopleScreens';

export default function Route() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ChatScreen id={+id} />;
}
