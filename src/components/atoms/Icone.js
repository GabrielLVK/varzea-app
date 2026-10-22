import * as LucideIcons from 'lucide-react-native';

import { cores, tipografia } from '../../theme';

export function Icone({
  nome,
  tamanho = tipografia.subtitulo,
  cor = cores.texto,
  preenchimento = 'transparent',
  style,
}) {
  const Componente = LucideIcons[nome];

  if (!Componente) {
    if (__DEV__) {
      console.warn(`Icone: "${nome}" não existe no lucide-react-native.`);
    }
    return null;
  }

  return (
    <Componente
      size={tamanho}
      color={cor}
      fill={preenchimento}
      strokeWidth={2}
      style={style}
    />
  );
}
