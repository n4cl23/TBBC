const required=['PREVIEW_DATABASE_URL','PREVIEW_DATABASE_URL_UNPOOLED','PREVIEW_POSTGRES_URL','PREVIEW_ADMIN_USER','PREVIEW_ADMIN_PASSWORD'];
const placeholder=/^(changeme|placeholder|example|todo|undefined|null|ci-only)/i;
let failed=false;
for(const name of required){const value=process.env[name]?.trim()||'';const valid=value.length>0&&!placeholder.test(value);process.stdout.write(`${name}=${valid?'SET':'EMPTY_OR_MISSING'}\n`);if(!valid)failed=true}
const unpooled=process.env.PREVIEW_DATABASE_URL_UNPOOLED?.trim()||'';
let unpooledEndpoint='INVALID';
try{unpooledEndpoint=new URL(unpooled).hostname.includes('-pooler.')?'POOLED_REJECTED':'UNPOOLED_CONFIRMED'}catch{}
process.stdout.write(`PREVIEW_DATABASE_URL_UNPOOLED_ENDPOINT=${unpooledEndpoint}\n`);
if(unpooledEndpoint!=='UNPOOLED_CONFIRMED')failed=true;
const branch=process.env.NEON_BRANCH_NAME,branchId=process.env.NEON_BRANCH_ID;
if(process.env.GITHUB_REF==='refs/heads/main'||process.env.GITHUB_ENVIRONMENT==='production'||process.env.PRODUCTION_DATABASE_URL||branch!=='preview'||!branchId||branchId==='br-curly-waterfall-ac1o40w1')failed=true;
process.stdout.write(`NEON_PREVIEW_BRANCH=${!failed?'CONFIRMED':'REJECTED'}\n`);
if(failed)process.exit(1);
