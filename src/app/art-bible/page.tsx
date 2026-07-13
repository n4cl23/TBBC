import { PageHead, SectionTitle } from '@/components/UI';
const chapters = [
  [
    'manifesto',
    'Manifesto',
    'História antes do ornamento. Cada miniatura deve sugerir um passado antes que seu nome seja revelado.',
  ],
  [
    'universo',
    'Universo',
    'Asterheim é construído por seis forças, seus artefatos e o preço humano de mantê-las em equilíbrio.',
  ],
  [
    'reinos',
    'Reinos',
    'Arquitetura, materiais e clima devem tornar cada território reconhecível apenas pela silhueta.',
  ],
  [
    'guardioes',
    'Guardiões',
    'Todo Guardião protege uma força e perde algo essencial para cumprir o juramento.',
  ],
  [
    'coroas',
    'Coroas',
    'Aro, escala e proporção comuns; matéria e gesto específicos de cada reino.',
  ],
  [
    'personagens',
    'Personagens',
    'Postura, ferramenta e base revelam profissão, decisão e conflito.',
  ],
  [
    'escalas',
    'Escalas',
    'Personagens 75–90 mm; Guardiões 180–220 mm; criaturas 160–250 mm.',
  ],
  [
    'silhuetas',
    'Silhuetas e armas',
    'Leitura clara à distância, arma funcional e hierarquia controlada de detalhes.',
  ],
  [
    'bases',
    'Bases narrativas',
    'Onde aconteceu? O que aconteceu? O que está protegido? O que ocorreu antes?',
  ],
  [
    'materiais',
    'Materiais e paletas',
    'Ferro, gelo, madeira, bronze, coral e osso obedecem às regras de seus territórios.',
  ],
  [
    'impressao',
    'Regras de impressão',
    'Conexões estruturais, multipart, espessura segura, orientação e teste de ilhas.',
  ],
  [
    'fluxo',
    'Fluxo criativo',
    'Conceito, história, direção visual, modelagem, validação, impressão, pintura e apresentação.',
  ],
];
export default function Page() {
  return (
    <>
      <PageHead
        eyebrow="Documento vivo"
        title="Art Bible"
        text="O sistema visual e narrativo que mantém cada peça reconhecível como parte de Asterheim."
      />
      <section className="section">
        <div className="container">
          <nav className="chapter-nav" aria-label="Capítulos">
            {chapters.map(([id, title]) => (
              <a key={id} href={`#${id}`}>
                {title}
              </a>
            ))}
          </nav>
          {chapters.map(([id, title, text], i) => (
            <article
              id={id}
              className="card"
              style={{ marginBottom: 16 }}
              key={id}
            >
              <span className="eyebrow">
                Capítulo {String(i + 1).padStart(2, '0')}
              </span>
              <SectionTitle eyebrow="Art Bible" title={title} text={text} />
              <div
                className="palette"
                style={{
                  background: `linear-gradient(90deg,var(--gold),transparent)`,
                }}
              />
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
