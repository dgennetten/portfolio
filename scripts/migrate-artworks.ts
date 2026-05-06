/**
 * Generates a SQL seed file from artworks.ts.
 * Usage: npx tsx scripts/migrate-artworks.ts > scripts/seed.sql
 * Then:  mysql -u dgennetten -p -h mysql.gennetten.com kdg_portfolio < scripts/seed.sql
 */

import { artworks, featuredArtworks } from '../src/data/artworks';

const featuredIds = featuredArtworks.map((a, i) => ({ id: a.id, order: i + 1 }));

const esc = (s: string | null | undefined): string => {
  if (s == null) return 'NULL';
  return "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
};

const orderMap: Record<string, number> = {};

const rows = artworks.map((a) => {
  const order = (orderMap[a.category] = (orderMap[a.category] ?? -1) + 1);
  const featured = featuredIds.find((f) => f.id === a.id);
  const isFeatured = featured ? 1 : 0;
  const featuredOrder = featured ? featured.order : 'NULL';

  return (
    `(${esc(a.title)}, ${esc(a.media)}, ${esc(a.description)}, ` +
    `${esc(a.imageSrc)}, ${esc(a.category)}, ` +
    `${order}, ${isFeatured}, ${featuredOrder})`
  );
});

const sql = `-- Auto-generated seed from artworks.ts
-- Run: mysql -u dgennetten -p -h mysql.gennetten.com kdg_portfolio < scripts/seed.sql

INSERT INTO artworks
  (title, media, description, image_src, category, display_order, is_featured, featured_order)
VALUES
${rows.join(',\n')};
`;

process.stdout.write(sql);
