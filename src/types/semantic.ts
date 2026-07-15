import type {CanonEntity, CanonEntityKind, CanonStatus} from './canon';

export const semanticRelationTypes = ['RULES','PROTECTS','FORGED','CREATED','DESTROYED','PARTICIPATED','DEFEATED','SEALED','AWAKENED','ALLY','ENEMY','MENTOR','APPRENTICE','TRADES_WITH','LOCATED_IN','BORN_IN','DIED_IN','OWNS','USES','LEADS','SERVES','FOLLOWS','RELATED_TO','DISCOVERED','HUNTS','GUARDS','SEEKS','BETRAYED','SACRIFICED_FOR','BOUND_TO','MEMBER_OF','HABITAT_IN','FEATURED_IN','PRECEDES','CAUSED'] as const;
export type SemanticRelationType=(typeof semanticRelationTypes)[number];
export type SemanticImportance='contextual'|'supporting'|'major'|'critical';
export interface SemanticRelation {id:string;source:string;target:string;relationType:SemanticRelationType;weight:number;description:string;status:CanonStatus;timelineEvent:string|null;startEra:string|null;endEra:string|null;importance:SemanticImportance;canonical:boolean}
export interface SemanticInheritance {kingdom:string|null;culture:unknown|null;faction:string|null;colorPalette:string[]|null;materialLanguage:string[]|null;era:string|null;politicalAlignment:string|null;magicAffinity:string|null;economicContext:string|null;climate:string|null;visualIdentity:string|null}
export interface SemanticEntity extends CanonEntity {semantics:SemanticInheritance}
export interface GraphDTO {version:string;nodes:SemanticEntity[];edges:SemanticRelation[];stats:{nodes:number;edges:number;isolated:number;loops:number}}
export interface EntityContextDTO {entity:SemanticEntity;relations:SemanticRelation[];related:SemanticEntity[];timeline:SemanticEntity[];summary:string}
export interface SemanticSearchResult {entity:SemanticEntity;score:number;matchedBy:Array<'name'|'slug'|'alias'|'kind'|'role'|'context'>}
export interface SemanticQuery {kind?:CanonEntityKind;role?:string;kingdom?:string;era?:string;q?:string;limit?:number}
