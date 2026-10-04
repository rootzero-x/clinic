import { useLocalSearchParams } from 'expo-router';
import { AppointmentScreen } from '@admin/screens/AppointmentsScreen';

export default function Route() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <AppointmentScreen id={+id} />;
}
