import { Input } from '../atoms/Input';

export function SearchBar({
  valor,
  aoMudar,
  placeholder = 'Buscar...',
  rotulo = 'Buscar',
  style,
}) {
  return (
    <Input
      icone="Search"
      value={valor}
      onChangeText={aoMudar}
      placeholder={placeholder}
      accessibilityLabel={rotulo}
      autoCorrect={false}
      autoCapitalize="none"
      returnKeyType="search"
      clearButtonMode="while-editing"
      containerStyle={style}
    />
  );
}
