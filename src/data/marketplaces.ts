import type {Marketplace,MarketplaceListing} from '@/types/marketplace';
const now='2026-07-12T00:00:00.000Z';
export const marketplaces:Marketplace[]=[
 {id:'creality-cloud',slug:'creality-cloud',name:'Creality Cloud',website:'https://www.crealitycloud.com/',description:'Plataforma global para modelos 3D, impressão e comunidade maker.',primaryColor:'#ff6a00',secondaryColor:'#191919',status:'active',createdAt:now,updatedAt:now},
 {id:'myminifactory',slug:'myminifactory',name:'MyMiniFactory',website:'https://www.myminifactory.com/',description:'Marketplace especializado em arquivos digitais para impressão 3D.',primaryColor:'#28a8df',secondaryColor:'#171d26',status:'active',createdAt:now,updatedAt:now},
 {id:'printables',slug:'printables',name:'Printables',website:'https://www.printables.com/',description:'Comunidade e catálogo de modelos imprimíveis.',primaryColor:'#fa6831',secondaryColor:'#202124',status:'active',createdAt:now,updatedAt:now},
 {id:'cults3d',slug:'cults3d',name:'Cults3D',website:'https://cults3d.com/',description:'Marketplace independente de arquivos para fabricação digital.',primaryColor:'#8224e3',secondaryColor:'#21152b',status:'active',createdAt:now,updatedAt:now},
 {id:'official-store',slug:'official-store',name:'Loja Oficial',website:'https://example.com/',description:'Canal direto oficial de The Black Banner Chronicles.',primaryColor:'#c5a15d',secondaryColor:'#080908',status:'active',createdAt:now,updatedAt:now},
];
export const marketplaceListings:MarketplaceListing[]=[
 {id:'listing-black-fang',slug:'black-fang-creality',entityId:'black-fang-mercenary',entityType:'character',marketplaceId:'creality-cloud',title:'Black Fang Mercenary — STL',url:'https://www.crealitycloud.com/',price:8.99,currency:'USD',status:'available',featured:true,rating:5,downloads:1240,license:'Personal use',notes:'Download instantâneo',badges:['featured','popular'],createdAt:now,updatedAt:now},
 {id:'listing-iron-bull',slug:'iron-bull-mmf',entityId:'iron-bull',entityType:'character',marketplaceId:'myminifactory',title:'Iron Bull — Multipart STL',url:'https://www.myminifactory.com/',price:9.99,currency:'USD',status:'early-access',featured:true,rating:4.8,downloads:680,license:'Personal use',badges:['new'],createdAt:now,updatedAt:now},
 {id:'listing-silent-ash',slug:'silent-ash-soon',entityId:'silent-ash',entityType:'character',marketplaceId:'official-store',title:'Silent Ash — Scout',url:'https://example.com/',price:34.9,currency:'BRL',status:'coming-soon',featured:false,license:'Personal use',badges:['coming-soon'],createdAt:now,updatedAt:now},
 {id:'listing-red-viper',slug:'red-viper-production',entityId:'red-viper',entityType:'character',marketplaceId:'cults3d',title:'Red Viper — Assassin',url:'https://cults3d.com/',price:7.5,currency:'EUR',status:'in-production',featured:false,license:'Personal use',badges:[],createdAt:now,updatedAt:now},
];
