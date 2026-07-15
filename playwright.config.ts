import {defineConfig,devices} from '@playwright/test';

const remoteBaseURL=process.env.PLAYWRIGHT_BASE_URL?.replace(/\/$/,'');
const disableArtifacts=process.env.PLAYWRIGHT_DISABLE_ARTIFACTS==='1';

export default defineConfig({
 testDir:'./e2e',
 fullyParallel:false,
 workers:2,
 retries:1,
 reporter:[['list'],['html',{open:'never'}]],
 use:{baseURL:remoteBaseURL||'http://127.0.0.1:3000',trace:disableArtifacts?'off':'retain-on-failure',screenshot:disableArtifacts?'off':'only-on-failure',video:'off'},
 projects:[{name:'chromium',use:{...devices['Desktop Chrome']}}],
 webServer:remoteBaseURL?undefined:{
  command:'node ./node_modules/next/dist/bin/next dev -p 3000',
  url:'http://127.0.0.1:3000',
  reuseExistingServer:true,
  timeout:120_000,
 },
});
