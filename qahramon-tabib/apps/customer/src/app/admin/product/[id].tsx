import { useLocalSearchParams } from 'expo-router';
import { ProductEditScreen } from '@admin/screens/ProductsScreen';

export default function Route() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ProductEditScreen key={id} id={String(id)} />;
}
