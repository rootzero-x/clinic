import { useLocalSearchParams } from 'expo-router';
import { OrderDetailScreen } from '../../screens/OrdersScreen';
import { orderIdFromParam } from '../../nav';

export default function Route() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <OrderDetailScreen id={orderIdFromParam(id)} />;
}
