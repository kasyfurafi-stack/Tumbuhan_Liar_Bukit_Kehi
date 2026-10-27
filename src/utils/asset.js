/**
 * Utility untuk menyelesaikan path aset publik secara aman
 * baik saat dijalankan di server lokal (/) maupun di GitHub Pages sub-path (/Tumbuhan_Liar_Bukit_Kehi/)
 */
export function getAssetUrl(path) {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Hilangkan awalan slash atau dot-slash
  const cleanPath = path.replace(/^(\.\/|\/)/, '');
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  return `${cleanBase}${cleanPath}`;
}
