import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
export default defineConfig([...nextVitals,...nextTs,{files:['src/components/admin/EntityManager.tsx'],rules:{'react-hooks/set-state-in-effect':'off','react-hooks/exhaustive-deps':'off'}},{files:['src/app/personagens/*/page.tsx'],rules:{'@typescript-eslint/no-unused-vars':'off'}},globalIgnores(['.next/**','coverage/**','playwright-report/**','test-results/**','next-env.d.ts'])]);
