import { Figure, PageHead, SectionTitle } from '@/components/UI';
import { requestLocale } from '@/lib/locale-server';
import type { Locale } from '@/lib/i18n';

const copy: Record<Locale, { eyebrow: string; intro: string; chapter: string; title: string; text: string; quote: string; alt: string }> = {
  'pt-br': { eyebrow: 'O mundo além do estandarte', intro: 'Um continente sustentado por seis forças ancestrais, onde toda vitória deixa uma cicatriz.', chapter: 'A crônica', title: 'Um mundo contado em resina', text: 'Asterheim existe no encontro entre narrativa e matéria. Cada personagem deve revelar sua história antes que seu nome seja conhecido; cada base registra o instante anterior à lenda.', quote: 'Seis coroas mantêm o equilíbrio. Seis guardiões pagam seu preço.', alt: 'Visão artística original do continente de Asterheim' },
  en: { eyebrow: 'The world beyond the banner', intro: 'A continent sustained by six ancestral forces, where every victory leaves a scar.', chapter: 'The chronicle', title: 'A world told in resin', text: 'Asterheim exists where narrative and matter meet. Every character must reveal a story before their name is known; every base records the moment before the legend.', quote: 'Six crowns preserve the balance. Six guardians pay its price.', alt: 'Original artistic vision of the continent of Asterheim' },
  es: { eyebrow: 'El mundo más allá del estandarte', intro: 'Un continente sostenido por seis fuerzas ancestrales, donde cada victoria deja una cicatriz.', chapter: 'La crónica', title: 'Un mundo contado en resina', text: 'Asterheim existe en el encuentro entre narrativa y materia. Cada personaje debe revelar su historia antes de que se conozca su nombre; cada base registra el instante anterior a la leyenda.', quote: 'Seis coronas mantienen el equilibrio. Seis guardianes pagan su precio.', alt: 'Visión artística original del continente de Asterheim' },
};

export default async function Page() {
  const locale = await requestLocale(), content = copy[locale];
  return <><PageHead eyebrow={content.eyebrow} title="Asterheim" text={content.intro}/><section className="section"><div className="container"><Figure alt={content.alt}/><div style={{marginTop:40}}><SectionTitle eyebrow={content.chapter} title={content.title} text={content.text}/></div><blockquote className="quote">{content.quote}</blockquote></div></section></>;
}
