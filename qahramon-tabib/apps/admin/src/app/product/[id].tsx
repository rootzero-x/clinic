import { useLocalSearchParams } from 'expo-router';
import { ProductEditScreen } from '../../screens/ProductsScreen';

export default function Route() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ProductEditScreen key={id} id={String(id)} />;
}
