import { useLocalSearchParams } from 'expo-router';
import { CustomerScreen } from '@admin/screens/PeopleScreens';

export default function Route() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <CustomerScreen id={+id} />;
}
