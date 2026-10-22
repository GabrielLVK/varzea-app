export const listaVirtualizada = {
  initialNumToRender: 8,
  maxToRenderPerBatch: 6,
  windowSize: 7,
  updateCellsBatchingPeriod: 50,
  removeClippedSubviews: true,
};

export function extrairChave(item) {
  return String(item.id);
}
