import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const dir='/tmp/claude-0/-home-user-skill-up-game/2cc4dd7c-472b-5cb8-a2f8-752705624a43/scratchpad';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:820,height:640},deviceScaleFactor:2});
await p.goto('http://localhost:8391/modal-mock.html');
await p.waitForFunction('window.__ready===true');await p.waitForTimeout(300);
await p.screenshot({path:dir+'/modal-fixed.png',fullPage:true});
await b.close();console.log('ok');
