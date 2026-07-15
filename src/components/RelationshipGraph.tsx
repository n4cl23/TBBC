'use client';
import Link from 'next/link';
import { useState } from 'react';
import type { Character } from '@/data/canon-registry';
type Node = {
  id: string;
  label: string;
  type: string;
  href?: string;
  detail: string;
};
export function RelationshipGraph({
  character,
  collectionName,
}: {
  character: Character;
  collectionName: string;
}) {
  const nodes: Node[] = [
    {
      id: 'center',
      label: character.name,
      type: 'Personagem',
      detail: character.summary,
    },
    {
      id: 'collection',
      label: collectionName,
      type: 'Coleção',
      href: `/colecoes/${character.collection}`,
      detail: 'Coleção de origem',
    },
    ...(character.realm
      ? [
          {
            id: 'realm',
            label: character.realm,
            type: 'Reino',
            href: `/reinos/${character.realm.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
            detail: 'Território relacionado',
          },
        ]
      : []),
    ...(character.weapon
      ? [
          {
            id: 'weapon',
            label: character.weapon,
            type: 'Arma',
            detail: 'Arma relacionada',
          },
        ]
      : []),
    ...(character.guardian
      ? [
          {
            id: 'guardian',
            label: character.guardian,
            type: 'Guardião',
            href: `/guardioes/${character.guardian.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
            detail: 'Guardião relacionado',
          },
        ]
      : []),
    ...(character.crown
      ? [
          {
            id: 'crown',
            label: character.crown,
            type: 'Coroa',
            href: `/coroas/${character.crown.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
            detail: 'Artefato relacionado',
          },
        ]
      : []),
  ];
  const [selected, setSelected] = useState(nodes[0]);
  return (
    <div
      className="relation-graph"
      aria-label={`Relacionamentos de ${character.name}`}
    >
      <svg
        viewBox="0 0 700 360"
        role="img"
        aria-label={`Grafo com ${nodes.length} entidades relacionadas`}
      >
        <title>{`Relacionamentos de ${character.name}`}</title>
        {nodes.slice(1).map((n, i) => {
          const angle = (Math.PI * 2 * i) / (nodes.length - 1) - Math.PI / 2,
            x = 350 + 230 * Math.cos(angle),
            y = 180 + 125 * Math.sin(angle);
          return (
            <g key={n.id}>
              <line x1="350" y1="180" x2={x} y2={y} />
              <circle
                cx={x}
                cy={y}
                r="44"
                onClick={() => setSelected(n)}
                tabIndex={0}
              />
              <text x={x} y={y + 4} textAnchor="middle">
                {n.label.slice(0, 16)}
              </text>
            </g>
          );
        })}
        <circle
          className="center"
          cx="350"
          cy="180"
          r="58"
          onClick={() => setSelected(nodes[0])}
        />
        <text className="center-label" x="350" y="184" textAnchor="middle">
          {character.name.slice(0, 18)}
        </text>
      </svg>
      <div className="relation-detail">
        <span className="eyebrow">{selected.type}</span>
        <strong>{selected.label}</strong>
        <small>{selected.detail}</small>
        {selected.href && <Link href={selected.href}>Abrir entidade →</Link>}
      </div>
    </div>
  );
}
