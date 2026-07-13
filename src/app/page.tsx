import { Button, Card, SectionTitle } from '@/components/UI';
import { AsterheimMap } from '@/components/AsterheimMap';
import { LoreTimeline } from '@/components/LoreTimeline';
import { collections, guardians, news } from '@/data/content';
export default function Home() {
  return (
    <>
      <section
        className="hero"
        style={{
          backgroundImage: 'url(/images/hero/banner-chronicles.webp)',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="container hero-content">
          <span className="eyebrow">Crônicas de Asterheim</span>
          <h1 className="serif">
            THE BLACK BANNER
            <br />
            CHRONICLES
          </h1>
          <p className="lead">
            Entre em Asterheim, um continente marcado por reinos caídos, Coroas
            ancestrais e Guardiões que sacrificaram tudo.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              marginTop: 30,
            }}
          >
            <Button href="/universo">Explorar o universo</Button>
            <Button href="/colecoes" ghost>
              Conhecer as coleções
            </Button>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <blockquote className="quote">
            “Não é apenas uma coleção de miniaturas. É um mundo contado em
            resina.”
          </blockquote>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Destaques"
            title="Coleções de Asterheim"
            text="Cada peça nasce como personagem, relíquia e fragmento de uma história maior."
          />
          <div className="grid">
            {collections.map((c) => (
              <Card
                key={c.slug}
                title={c.name}
                text={c.description}
                href={`/colecoes/${c.slug}`}
                meta={`${c.count} miniaturas · ${c.status}`}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Cartografia viva"
            title="Os seis territórios"
            text="Selecione um reino para revelar seu símbolo, arquitetura e lugar na crônica."
          />
          <AsterheimMap />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Os juramentos" title="Os Seis Guardiões" />
          <div className="grid">
            {guardians.map((g) => (
              <Card
                key={g.slug}
                title={g.name}
                text={g.summary}
                href={`/guardioes/${g.slug}`}
                accent={g.accent}
                meta={g.realm}
                image={`/images/guardians/${g.slug}.png`}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Arquivo histórico" title="Eras de Asterheim" />
          <LoreTimeline />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Últimas atualizações"
            title="O arquivo continua crescendo"
          />
          <div className="grid">
            {news.map((n) => (
              <div className="card" key={n.slug}>
                <span className="eyebrow">{n.date}</span>
                <h3 className="serif">{n.title}</h3>
                <p className="muted">{n.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container newsletter">
          <div>
            <span className="eyebrow">Crônicas por correio</span>
            <h2 className="serif">Receba sinais do Estandarte</h2>
            <p className="muted">
              Newsletter planejada para futuras atualizações.
            </p>
          </div>
          <form>
            <label className="sr-only" htmlFor="newsletter-email">
              E-mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="seu@email.com"
              required
            />
            <button className="button" type="submit">
              Quero acompanhar
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
