import {CreatorStudio} from '@/components/admin/CreatorStudio';
import {characters} from '@/data/content';
import {mediaSrc} from '@/lib/media';
import './studio.css';

export default function CreatorStudioPage() {
  const workspace = characters.map(({slug,name,image,collection,status,multipart,lycheeReady}) => ({slug,name,image:mediaSrc(image,'full'),collection,status,multipart,lycheeReady}));
  return <><span className="eyebrow">Sprint 6</span><h1 className="admin-title">Creator Studio</h1><p className="muted studio-intro">Todo o ciclo criativo de uma miniatura, da ideia à publicação, conectado ao World Engine.</p><CreatorStudio characters={workspace}/></>;
}
