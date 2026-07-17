import { MediaLibrary } from '@/components/admin/MediaLibrary';
import { EditorialReviewForm } from '@/components/admin/EditorialReviewForm';

export default function EditorialPage() {
  return <><span className="eyebrow">Plataforma editorial</span><h1 className="admin-title">Conteúdo, mídia e revisão</h1><p className="muted">Formulários validados, corte de imagem, armazenamento externo, trilha de auditoria e decisões por papel.</p><div className="admin-grid" style={{ marginBottom: 24 }}><section><h2 className="serif">Revisão editorial</h2><EditorialReviewForm /></section><section className="admin-panel"><h2 className="serif">Papéis</h2><p><strong>Editor:</strong> cria, edita, envia para revisão e gerencia mídia.</p><p><strong>Revisor:</strong> aprova ou devolve uma versão.</p><p><strong>Owner:</strong> publica, restaura e arquiva.</p><p className="muted">A conta administrativa atual permanece como owner. Contas adicionais podem ser fornecidas por configuração segura.</p></section></div><h2 className="serif">Mídia reutilizável</h2><MediaLibrary /></>;
}
