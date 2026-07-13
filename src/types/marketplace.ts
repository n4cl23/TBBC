export type MarketplaceStatus='active'|'inactive';
export type ListingStatus='coming-soon'|'in-production'|'available'|'early-access'|'exclusive'|'retired'|'archived';
export type Currency='USD'|'BRL'|'EUR'|'GBP';
export type ListingBadge='new'|'best-seller'|'popular'|'featured'|'exclusive'|'coming-soon';
export interface Marketplace{id:string;slug:string;name:string;logo?:string;website:string;description:string;primaryColor:string;secondaryColor:string;status:MarketplaceStatus;createdAt:string;updatedAt:string}
export interface MarketplaceListing{id:string;slug:string;entityId:string;entityType:'character'|'creature'|'collection'|'stl';marketplaceId:string;title:string;url:string;price:number;currency:Currency;status:ListingStatus;featured:boolean;releaseDate?:string;lastSync?:string;rating?:number;downloads?:number;license:string;notes?:string;badges:ListingBadge[];createdAt:string;updatedAt:string}
export interface MarketplacePrice{id:string;listingId:string;amount:number;currency:Currency;validFrom:string;validUntil?:string;manual:boolean}
