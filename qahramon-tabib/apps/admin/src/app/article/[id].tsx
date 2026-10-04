import { useLocalSearchParams } from 'expo-router';
import { ArticleEditorScreen } from '../../screens/ContentScreens';

export default function Route() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ArticleEditorScreen key={id} id={String(id)} />;
}
