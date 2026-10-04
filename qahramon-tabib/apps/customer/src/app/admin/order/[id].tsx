import { useLocalSearchParams } from 'expo-router';
import { OrderDetailScreen } from '@admin/screens/OrdersScreen';
import { orderIdFromParam } from '@admin/nav';

export default function Route() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <OrderDetailScreen id={orderIdFromParam(id)} />;
}
