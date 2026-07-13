import { PageHead } from '@/components/UI';
import { requestLocale } from '@/lib/locale-server';

const copy = {
  'pt-br': { eyebrow: 'Envie um corvo', title: 'Contato', intro: 'Fale sobre o projeto, imprensa, colaboração ou licenciamento futuro.', name: 'Nome', message: 'Mensagem', send: 'Enviar mensagem' },
  en: { eyebrow: 'Send a raven', title: 'Contact', intro: 'Get in touch about the project, press, collaboration, or future licensing.', name: 'Name', message: 'Message', send: 'Send message' },
  es: { eyebrow: 'Envía un cuervo', title: 'Contacto', intro: 'Escríbenos sobre el proyecto, prensa, colaboraciones o futuras licencias.', name: 'Nombre', message: 'Mensaje', send: 'Enviar mensaje' },
} as const;

export default async function Page() {
  const content = copy[await requestLocale()];
  return <><PageHead eyebrow={content.eyebrow} title={content.title} text={content.intro}/><section className="section"><div className="container"><form className="contact"><label>{content.name}<input required name="name"/></label><label>E-mail<input required type="email" name="email"/></label><label>{content.message}<textarea required name="message"/></label><button className="button" type="submit">{content.send}</button></form></div></section></>;
}
