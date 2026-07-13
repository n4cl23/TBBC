export const dynamic = 'force-dynamic';
import { PageHead } from '@/components/UI';
import {CharacterPoster} from '@/components/CharacterPoster';
import type { Character } from '@/data/content';
import { getPublishedData } from '@/lib/cms-public';
import { listCharacterMedia } from '@/lib/media-repository';
export default async function Page() {
  const [characters, media] = await Promise.all([
    getPublishedData<Character>('characters'),
    listCharacterMedia(),
  ]);
  return (
    <>
      <PageHead
        eyebrow="Arquivo de figuras"
        title="Personagens"
        text="Mercenários, estudiosos, monstros e lendas registrados nas crônicas."
      />
      <section className="section">
        <div className="container poster-grid">
          {characters.map((x,index) => (
            <CharacterPoster
              key={x.slug}
              name={x.name}
              title={x.title || x.scale}
              quote={x.summary}
              href={`/personagens/${x.slug}`}
              image={media[x.slug]?.primary || x.image}
              index={index}
            />
          ))}
        </div>
      </section>
    </>
  );
}
