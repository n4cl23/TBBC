import { PageHead } from '@/components/UI';
import { requestLocale } from '@/lib/locale-server';

const copy = {
  'pt-br': { eyebrow: 'Propriedade intelectual original', title: 'Sobre o projeto', intro: 'The Black Banner Chronicles une worldbuilding, escultura digital e impressão 3D em uma coleção autoral.', text: 'O projeto nasce para ser simultaneamente portfólio visual, art bible, catálogo e enciclopédia. Esta primeira versão registra o alicerce de um mundo que continuará crescendo peça por peça.' },
  en: { eyebrow: 'Original intellectual property', title: 'About the project', intro: 'The Black Banner Chronicles brings worldbuilding, digital sculpture, and 3D printing together in an original collection.', text: 'The project was created as a visual portfolio, art bible, catalog, and encyclopedia at once. This first version establishes the foundation of a world that will continue to grow, piece by piece.' },
  es: { eyebrow: 'Propiedad intelectual original', title: 'Sobre el proyecto', intro: 'The Black Banner Chronicles reúne worldbuilding, escultura digital e impresión 3D en una colección original.', text: 'El proyecto nace como portafolio visual, biblia de arte, catálogo y enciclopedia a la vez. Esta primera versión establece los cimientos de un mundo que seguirá creciendo pieza a pieza.' },
} as const;

export default async function Page() {
  const content = copy[await requestLocale()];
  return <><PageHead eyebrow={content.eyebrow} title={content.title} text={content.intro}/><section className="section"><div className="container"><p className="lead">{content.text}</p></div></section></>;
}
