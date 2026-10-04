import { useLocalSearchParams } from 'expo-router';
import { RxDetailScreen } from '../../screens/RxScreen';

export default function Route() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <RxDetailScreen id={String(id)} />;
}
