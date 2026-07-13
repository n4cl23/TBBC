import type {Metadata} from 'next';
import {Cinzel,Inter} from 'next/font/google';
import './globals.css';
import './sprint2.css';
import './sprint4.css';
import './sprint5.css';
import './sprint5-fixes.css';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';

const display=Cinzel({subsets:['latin'],variable:'--font-display'});
const body=Inter({subsets:['latin'],variable:'--font-body'});

export const metadata:Metadata={metadataBase:new URL('https://blackbannerchronicles.com'),title:{default:'The Black Banner Chronicles',template:'%s | The Black Banner Chronicles'},description:'Miniaturas colecionáveis e crônicas do mundo original de Asterheim.',alternates:{canonical:'/'},openGraph:{type:'website',locale:'pt_BR',title:'The Black Banner Chronicles',description:'Um mundo contado em resina.',images:['/images/hero/banner-chronicles.webp']},twitter:{card:'summary_large_image',title:'The Black Banner Chronicles',description:'Um mundo contado em resina.',images:['/images/hero/banner-chronicles.webp']}};

export default function Layout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body className={`${display.variable} ${body.variable}`}><Header/><main>{children}</main><Footer/></body></html>}
