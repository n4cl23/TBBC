import {graphService} from './semantic-graph';
export class SemanticQueryService {
  whoRules(kingdom:string){return graphService.related(kingdom).filter((entity)=>graphService.relations(kingdom).some((edge)=>edge.relationType==='RULES'&&(edge.source===entity.canonicalId||edge.target===entity.canonicalId)))}
  whoProtects(kingdom:string){return graphService.related(kingdom).filter((entity)=>graphService.relations(kingdom).some((edge)=>edge.relationType==='PROTECTS'&&(edge.source===entity.canonicalId||edge.target===entity.canonicalId)))}
  bossesIn(kingdom:string){const realm=graphService.getEntity(kingdom);return graphService.getGraph().nodes.filter((entity)=>entity.roles.some((role)=>role==='boss'||role==='secondary-boss')&&entity.semantics.kingdom===realm?.canonicalId)}
  creaturesIn(kingdom:string){const realm=graphService.getEntity(kingdom);return graphService.getGraph().nodes.filter((entity)=>entity.kind==='creature'&&entity.semantics.kingdom===realm?.canonicalId)}
  artifactsLinkedTo(artifact:string){return graphService.related(artifact).filter((entity)=>entity.kind==='artifact'||entity.kind==='character')}
  participants(event:string){return graphService.related(event).filter((entity)=>graphService.relations(event).some((edge)=>edge.relationType==='PARTICIPATED'&&(edge.source===entity.canonicalId||edge.target===entity.canonicalId)))}
  directConnections(entity:string){return graphService.related(entity)}
  guildsIn(kingdom:string){const realm=graphService.getEntity(kingdom);return graphService.getGraph().nodes.filter((entity)=>entity.roles.includes('guild')&&entity.semantics.kingdom===realm?.canonicalId)}
  locationsForEvent(event:string){return graphService.related(event).filter((entity)=>entity.kind==='location')}
}
export const semanticQueryService=new SemanticQueryService();
