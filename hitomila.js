(function(){try{if(window.__galleryInit){return;}window.__galleryInit=true;
var BLOCK=['displayvertising.com','popads.net','propellerads.com','adsterra.com','juicyads.com','onclickads.net','revcontent.com','mgid.com','taboola.com','outbrain.com','doubleclick.net','googlesyndication.com','adservice.google.com'];
var re=new RegExp('('+BLOCK.map(function(d){return d.replace(/\./g,'\\.')}).join('|')+')','i');
function clean(){document.querySelectorAll('script[src],iframe[src],a[href],img[src],link[href]').forEach(function(n){var u=n.src||n.href||'';if(u&&re.test(u))n.remove();});}
clean();
if(!window.__adObserver){window.__adObserver=new MutationObserver(function(muts){muts.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1){try{if(re.test(n.src||n.href||'')){n.remove();return;}if(n.querySelectorAll){n.querySelectorAll('script[src],iframe[src],a[href],img[src],link[href]').forEach(function(x){if(re.test(x.src||x.href||''))x.remove();});}}catch(e){}}});});});window.__adObserver.observe(document.documentElement,{childList:true,subtree:true});}
var so=function(u){try{return new URL(u,location.href).origin===location.origin}catch(e){return false}};
var fl=function(e){while(e&&e!==document){if(e.tagName==='A')return e;e=e.parentNode}return null};
var seen=[];var deleted={};var selectMode=false;var selected={};var b64map={};
var overlay=null;var showBtn=null;
var head=document.createElement('div');head.__galleryOwn=true;head.style.cssText='background:#111;color:#fff;font:bold 14px sans-serif;padding:6px;display:flex;justify-content:space-between;align-items:center;flex-wrap:nowrap;overflow-x:auto;position:relative;z-index:2147483000;';
['touchstart','touchmove','touchend','pointerdown','pointermove','pointerup'].forEach(function(ev){head.addEventListener(ev,function(e){e.stopPropagation();},{passive:true});});
head.appendChild(document.createTextNode('Images'));
var countEl=document.createElement('span');countEl.textContent=' (0)';countEl.style.cssText='color:#aaa;font-size:12px;margin-left:4px;';head.appendChild(countEl);
function updateCount(){countEl.textContent=' ('+seen.length+')';}
var btns=document.createElement('div');btns.style.cssText='display:flex;gap:2px;flex-wrap:nowrap;align-items:center;';
var box=document.createElement('div');box.__galleryOwn=true;box.style.cssText='background:#111;padding:8px;display:grid;grid-template-columns:repeat(3,1fr);gap:6px;font-family:sans-serif;width:100%;box-sizing:border-box;position:relative;z-index:2147483000;';
['touchstart','touchmove','touchend','pointerdown','pointermove','pointerup'].forEach(function(ev){box.addEventListener(ev,function(e){e.stopPropagation();},{passive:true});});
var sel=document.createElement('div');sel.__galleryOwn=true;sel.style.cssText='background:#000;padding:10px;display:flex;flex-direction:column;align-items:center;gap:8px;font-family:sans-serif;width:100%;box-sizing:border-box;overflow:hidden;position:relative;z-index:2147483000;';
function isGalleryNode(n){while(n&&n!==document){if(n===head||n===box||n===sel||n===overlay||n===showBtn||n.__galleryOwn)return true;n=n.parentNode;}return false;}
function blockExternal(e){
if(isGalleryNode(e.target))return;
var a=fl(e.target);
if(a){
var tg=a.getAttribute('target')||'';
if(tg&&tg!=='_self'){try{a.removeAttribute('target');}catch(x){}}
var h=a.getAttribute('href')||'';
if(h&&h[0]!=='#'&&h.indexOf('javascript:')!==0&&!so(h)){
e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
return;
}
}
}
['click','auxclick','pointerdown','mousedown','mouseup','touchstart','touchend'].forEach(function(ev){
try{document.addEventListener(ev,blockExternal,{capture:true,passive:false});}catch(x){document.addEventListener(ev,blockExternal,true);}
});
document.addEventListener('contextmenu',function(e){if(isGalleryNode(e.target))return;var a=fl(e.target);if(a){e.preventDefault();}},true);
var oo=window.open;window.open=function(){return null};
function killIframeOpen(){
try{
var ifr=document.querySelectorAll('iframe');
for(var i=0;i<ifr.length;i++){
try{var w=ifr[i].contentWindow;if(w&&w.open)w.open=function(){return null;};}catch(x){}
}
}catch(x){}
}
killIframeOpen();
if(!window.__iframeObs){window.__iframeObs=new MutationObserver(function(){killIframeOpen();});window.__iframeObs.observe(document.documentElement,{childList:true,subtree:true});}
document.addEventListener('submit',function(e){if(isGalleryNode(e.target))return;var f=e.target;if(f&&(f.getAttribute('target')||'')!=='_self'){e.preventDefault();e.stopPropagation();}},true);
function mk(t,bg,f){var x=document.createElement('button');x.textContent=t;x.style.cssText='padding:5px 8px;border:none;border-radius:5px;color:#fff;background:'+bg+';margin:2px;font-size:11px;';x.onclick=f;x.__galleryOwn=true;return x;}
function curPage(){var m=location.hash.match(/#(\d+)/);return m?parseInt(m[1],10):1;}
function totalPages(){var s=document.getElementById('mobile-single-page-select');if(s&&s.options&&s.options.length)return s.options.length;var max=1;document.querySelectorAll('option[value],a[href*="#"]').forEach(function(n){var v=parseInt(n.value||(n.getAttribute('href')||'').replace(/^.*#/,''),10);if(!isNaN(v)&&v>max)max=v;});return max;}
function galleryTitle(){var t=(document.title||'').trim();t=t.replace(/\s*\|\s*Hitomi\.la.*$/i,'');t=t.replace(/<[^>]*>/g,' ');t=t.replace(/\s+/g,' ').trim();return t||'Gallery';}
function pad(n,len){len=len||3;var s=''+n;while(s.length<len)s='0'+s;return s;}
function fname(page){return galleryTitle().replace(/[\\/:*?"<>|]+/g,'_')+'_'+pad(page,3)+'.png';}
function isSVG(u){return /\.svg(\?|#|$)/i.test(u||'');}
function b64ToBlob(b64){var p=b64.split(',');var mime=p[0].match(/:(.*?);/)[1];var bin=atob(p[1]);var arr=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)arr[i]=bin.charCodeAt(i);return new Blob([arr],{type:mime});}
function b64ToU8(b64){var p=b64.split(',');var bin=atob(p[1]);var arr=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)arr[i]=bin.charCodeAt(i);return arr;}
function loadH2C(cb){if(window.html2canvas){cb();return;}var s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';s.onload=cb;s.onerror=function(){alert('No se pudo cargar html2canvas (CSP?)');};(document.head||document.documentElement).appendChild(s);}
function loadFflate(cb){if(window.fflate){cb();return;}var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/fflate@0.8.2/umd/index.js';s.onload=function(){cb();};s.onerror=function(){alert('No se pudo cargar fflate (CSP/red).');};(document.head||document.documentElement).appendChild(s);}
function toB64(src,timeoutMs){
return new Promise(function(resolve){
var done=false;
var timer=setTimeout(function(){if(done)return;done=true;resolve(null);},timeoutMs||8000);
var holder=document.createElement('div');holder.style.cssText='position:fixed;left:-99999px;top:0;background:#000;';
var im=document.createElement('img');im.src=src;im.loading='eager';im.decoding='sync';im.style.display='block';
var finish=function(){
if(done)return;
var w=im.naturalWidth,h=im.naturalHeight;
if(!w||!h){done=true;clearTimeout(timer);holder.remove();resolve(null);return;}
im.style.width=w+'px';im.style.height=h+'px';holder.style.width=w+'px';holder.style.height=h+'px';
loadH2C(function(){
html2canvas(im,{useCORS:true,allowTaint:false,backgroundColor:'#000000',scale:1,width:w,height:h,logging:false}).then(function(c){if(done)return;done=true;clearTimeout(timer);holder.remove();resolve(c.toDataURL('image/png'));}).catch(function(){if(done)return;done=true;clearTimeout(timer);holder.remove();resolve(null);});
});
};
holder.appendChild(im);document.body.appendChild(holder);
if(im.complete&&im.naturalWidth>0){finish();}else{im.onload=finish;im.onerror=function(){if(done)return;done=true;clearTimeout(timer);holder.remove();resolve(null);};}
});
}
function visorImgs(){return [].slice.call(document.images).filter(function(i){return !box.contains(i)&&!sel.contains(i)&&!(overlay&&overlay.contains(i))&&i.naturalWidth>0&&!isSVG(i.currentSrc||i.src);});}
function visorURLs(){return visorImgs().map(function(i){return i.currentSrc||i.src;});}
function currentPageURL(){var imgs=visorImgs();if(!imgs.length)return null;return imgs[0].currentSrc||imgs[0].src;}
function sortGrid(){
var ws=[].slice.call(box.children);
ws.sort(function(a,b){
var ia=a.querySelector('img[data-page]'),ib=b.querySelector('img[data-page]');
var pa=ia?parseInt(ia.dataset.page,10):0,pb=ib?parseInt(ib.dataset.page,10):0;
return pa-pb;
});
ws.forEach(function(w){box.appendChild(w);});
}
function add(src,page){
if(!src)return;if(isSVG(src))return;
if(deleted[src])return;
var existing=-1;
for(var i=0;i<seen.length;i++){if(seen[i]===src){existing=i;break;}}
if(existing!==-1){
var t=box.querySelector('img[data-src="'+src.replace(/"/g,'\\"')+'"]');
if(t&&(t.dataset.b64!=='1'||!b64map[src])){
toB64(src,8000).then(function(b64){if(b64){b64map[src]=b64;t.src=b64;t.dataset.b64='1';}});
}
return;
}
seen.push(src);updateCount();
var w=document.createElement('div');w.style.cssText='position:relative;';
var t=document.createElement('img');t.src=src;t.loading='lazy';t.dataset.src=src;t.dataset.page=page;t.style.cssText='width:100%;height:110px;object-fit:cover;display:block;cursor:pointer;border:1px solid #333;border-radius:6px;background:#222;';
t.onclick=function(){if(selectMode){selected[src]=!selected[src];t.style.outline=selected[src]?'3px solid #2e7d32':'none';}else{showOne(src)}};
w.appendChild(t);
var lbl=document.createElement('div');lbl.textContent='Pág. '+page;lbl.style.cssText='color:#ddd;font-size:11px;text-align:center;margin-top:3px;';w.appendChild(lbl);
var cb=document.createElement('div');cb.style.cssText='position:absolute;top:4px;right:4px;width:20px;height:20px;border-radius:50%;background:rgba(0,0,0,.6);border:2px solid #fff;display:none;align-items:center;justify-content:center;color:#fff;font-size:12px;';cb.textContent='✓';w.appendChild(cb);t._cb=cb;
box.appendChild(w);sortGrid();
toB64(src,8000).then(function(b64){if(b64){b64map[src]=b64;t.src=b64;t.dataset.b64='1';}});
}
function scan(){var cur=curPage();var u=currentPageURL();if(u)add(u,cur);}
function refreshMenu(){try{[].slice.call(document.images).forEach(function(img){img.loading='eager';});}catch(e){}scan();}
function reloadImgs(){
var imgs=[].slice.call(box.querySelectorAll('img[data-src]'));
if(!imgs.length){alert('Reload: no hay miniaturas');return;}
var pend=imgs.length,fail=0,ok=0,skip=0;
function tick(){pend--;if(pend===0)alert('Reload: ok='+ok+' fail='+fail+' skip='+skip);}
imgs.forEach(function(t){
var src=t.dataset.src;
if(!src){skip++;tick();return;}
if(t.dataset.b64==='1'&&b64map[src]){skip++;tick();return;}
var tryUrls=[src];
if(parseInt(t.dataset.page,10)===curPage()){
var u=currentPageURL();
if(u&&u!==src)tryUrls.push(u);
}
(function attempt(i){
if(i>=tryUrls.length){fail++;t.dataset.b64='0';t.src=src;tick();return;}
toB64(tryUrls[i],8000).then(function(b64){
if(b64){b64map[src]=b64;t.src=b64;t.dataset.b64='1';ok++;tick();}
else{attempt(i+1);}
});
})(0);
});
}
function waitVisorNew(prev,cb){var tries=0;(function check(){if(window.__galleryStopped){if(cb)cb();return;}refreshMenu();var now=visorURLs();var found=0;now.forEach(function(u){if(u&&prev.indexOf(u)===-1)found++;});if(found>=1||tries>=30){if(cb)cb();return;}tries++;setTimeout(check,700);})();}
function goHash(p,savedY){
var h='#'+p;
function after(){
try{window.scrollTo(0,savedY||0);}catch(e){}
}
if(location.hash===h){
location.hash=h+'-'+Date.now();
setTimeout(function(){location.hash=h;try{window.dispatchEvent(new HashChangeEvent('hashchange'));}catch(e){}setTimeout(after,0);},0);
}else{
location.hash=h;
try{window.dispatchEvent(new HashChangeEvent('hashchange'));}catch(e){}
setTimeout(after,0);
}
}
function step(d){
var c=curPage();var n=c+d;if(n<1)n=1;var max=totalPages();if(n>max)n=max;
var savedY=window.scrollY||window.pageYOffset||0;
var prev=visorURLs();
goHash(n,savedY);
waitVisorNew(prev,function(){try{window.scrollTo(0,savedY);}catch(e){}});
}
btns.appendChild(mk('Prev','#6a1b9a',function(){step(-1)}));
btns.appendChild(mk('Next','#6a1b9a',function(){step(1)}));
var inp=document.createElement('input');inp.type='number';inp.step='1';inp.placeholder='Go To';inp.style.cssText='width:60px;padding:5px;border-radius:5px;border:none;font-size:11px;';inp.__galleryOwn=true;
btns.appendChild(inp);
btns.appendChild(mk('Go To','#00838f',function(){var v=parseInt(inp.value,10);if(isNaN(v))return;var max=totalPages();if(v<1)v=1;if(v>max)v=max;var savedY=window.scrollY||window.pageYOffset||0;var prev=visorURLs();goHash(v,savedY);waitVisorNew(prev,function(){try{window.scrollTo(0,savedY);}catch(e){}});}));
var jumpInp=document.createElement('input');jumpInp.type='number';jumpInp.step='1';jumpInp.placeholder='Jump';jumpInp.style.cssText='width:60px;padding:5px;border-radius:5px;border:none;font-size:11px;';jumpInp.__galleryOwn=true;
btns.appendChild(jumpInp);
btns.appendChild(mk('Jump','#6a1b9a',function(){var v=parseInt(jumpInp.value,10);if(isNaN(v)||v===0)v=1;var max=totalPages();var n=curPage()+v;if(n<1)n=1;if(n>max)n=max;var savedY=window.scrollY||window.pageYOffset||0;var prev=visorURLs();goHash(n,savedY);waitVisorNew(prev,function(){try{window.scrollTo(0,savedY);}catch(e){}});}));
btns.appendChild(mk('Refresh','#1565c0',function(){refreshMenu();}));
btns.appendChild(mk('Reload imgs','#5d4037',function(){reloadImgs();}));
var cbzBtn=mk('CBZ','#00695c',function(){downloadCBZ();});
var selBtn=mk('Select','#ef6c00',function(){selectMode=!selectMode;if(!selectMode){selected={};box.querySelectorAll('img').forEach(function(i){i.style.outline='none';i._cb.style.display='none';});}else{box.querySelectorAll('img').forEach(function(i){i._cb.style.display='flex';});}toggleBtn.style.display=selectMode?'inline-block':'none';delBtn.style.display=selectMode?'inline-block':'none';downBtn.style.display=selectMode?'inline-block':'none';cbzBtn.style.display=selectMode?'inline-block':'none';selBtn.textContent=selectMode?'Cancel':'Select';});
var toggleBtn=mk('All','#00838f',function(){var imgs=[].slice.call(box.querySelectorAll('img'));var all=imgs.every(function(i){return selected[i.dataset.src||i.src];});imgs.forEach(function(i){var k=i.dataset.src||i.src;selected[k]=!all;i.style.outline=!all?'3px solid #2e7d32':'none';i._cb.style.background=!all?'#2e7d32':'rgba(0,0,0,.6)';});toggleBtn.textContent=all?'None':'All';});
var delBtn=mk('Delete','#c62828',function(){var imgs=[].slice.call(box.querySelectorAll('img'));imgs.forEach(function(i){var k=i.dataset.src||i.src;if(selected[k]){deleted[k]=true;i.parentNode.remove();}});selected={};toggleBtn.textContent='All';updateCount();});
var downBtn=mk('Download','#2e7d32',function(){var imgs=[].slice.call(box.querySelectorAll('img'));var list=imgs.filter(function(i){return selected[i.dataset.src||i.src];});if(!list.length){alert('No selection');return;}var idx=0;function next(){if(idx>=list.length)return;var el=list[idx];idx++;var k=el.dataset.src||el.src;var page=parseInt(el.dataset.page,10)||1;if(el.dataset.b64==='1'&&b64map[k]){var blob=b64ToBlob(b64map[k]);var url=URL.createObjectURL(blob);var a=document.createElement('a');a.href=url;a.download=fname(page);document.body.appendChild(a);a.click();setTimeout(function(){a.remove();URL.revokeObjectURL(url);},1500);setTimeout(next,800);}else{showOne(k,true);var tries=0;(function check(){if(window.__galleryShot){var canvas=window.__galleryShot;canvas.toBlob(function(blob){if(blob){var url=URL.createObjectURL(blob);var a=document.createElement('a');a.href=url;a.download=fname(page);document.body.appendChild(a);a.click();setTimeout(function(){a.remove();URL.revokeObjectURL(url);},1500);}window.__galleryShot=null;setTimeout(next,800);},'image/png');return;}tries++;if(tries>30){setTimeout(next,800);return;}setTimeout(check,500);})();}}next();});
var hideBtn=mk('Hide','#455a64',function(){var hidden=box.style.display==='none';box.style.display=hidden?'grid':'none';hideBtn.textContent=hidden?'Hide':'Show';});
var galleryBtn=mk('Gallery','#8e24aa',function(){openGallery();});
toggleBtn.style.display='none';delBtn.style.display='none';downBtn.style.display='none';cbzBtn.style.display='none';
btns.appendChild(selBtn);btns.appendChild(toggleBtn);btns.appendChild(delBtn);btns.appendChild(downBtn);btns.appendChild(cbzBtn);btns.appendChild(hideBtn);btns.appendChild(galleryBtn);
btns.appendChild(mk('Hide all','#c62828',function(){
head.style.display='none';
box.style.display='none';
sel.style.display='none';
if(overlay&&overlay.parentNode){overlay.parentNode.removeChild(overlay);overlay=null;}
if(!showBtn){
showBtn=document.createElement('button');
showBtn.textContent='Show';
showBtn.__galleryOwn=true;
showBtn.style.cssText='position:fixed;right:10px;bottom:10px;z-index:2147483647;padding:10px 14px;border:none;border-radius:50%;background:#8e24aa;color:#fff;font:bold 14px sans-serif;box-shadow:0 2px 6px rgba(0,0,0,.5);';
['touchstart','touchmove','touchend','pointerdown','pointermove','pointerup'].forEach(function(ev){showBtn.addEventListener(ev,function(e){e.stopPropagation();},{passive:true});});
showBtn.onclick=function(){
head.style.display='flex';
box.style.display='grid';
sel.style.display='flex';
if(showBtn&&showBtn.parentNode)showBtn.parentNode.removeChild(showBtn);
showBtn=null;
scan();
};
document.body.appendChild(showBtn);
}
}));
head.appendChild(btns);
scan();
document.body.appendChild(head);
document.body.appendChild(box);
document.body.appendChild(sel);
function downloadCBZ(){var imgs=[].slice.call(box.querySelectorAll('img[data-src]'));var list=imgs.filter(function(i){return !selectMode||selected[i.dataset.src||i.src];});if(!list.length){alert('No hay imágenes');return;}list.sort(function(a,b){return (parseInt(a.dataset.page,10)||0)-(parseInt(b.dataset.page,10)||0);});loadFflate(function(){var files={};var idx=0;function next(){if(idx>=list.length){flush();return;}var el=list[idx++];var k=el.dataset.src||el.src;var page=parseInt(el.dataset.page,10)||1;var name=pad(page,3)+'.png';if(b64map[k]){try{files[name]=b64ToU8(b64map[k]);}catch(e){}}setTimeout(next,0);}next();function flush(){var title=galleryTitle();var xml='<?xml version="1.0" encoding="utf-8"?>\n<ComicInfo xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n  <Title>'+title.replace(/[<>&]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;'}[c];})+'</Title>\n  <PageCount>'+Object.keys(files).length+'</PageCount>\n</ComicInfo>';files['ComicInfo.xml']=new TextEncoder().encode(xml);var zipped=window.fflate.zipSync(files,{level:0});var blob=new Blob([zipped],{type:'application/vnd.comicbook+zip'});var url=URL.createObjectURL(blob);var a=document.createElement('a');a.href=url;a.download=galleryTitle().replace(/[\\/:*?"<>|]+/g,'_')+'.cbz';document.body.appendChild(a);a.click();setTimeout(function(){a.remove();URL.revokeObjectURL(url);},4000);}});}
function openGallery(){
if(overlay){overlay.parentNode&&overlay.parentNode.removeChild(overlay);overlay=null;return;}
overlay=document.createElement('div');overlay.__galleryOwn=true;
overlay.style.cssText='position:fixed;inset:0;width:100%;height:100%;background:#000;z-index:2147483647;overflow:auto;display:flex;flex-direction:column;';
var top=document.createElement('div');top.__galleryOwn=true;top.style.cssText='position:sticky;top:0;display:flex;gap:6px;flex-wrap:wrap;align-items:center;padding:6px;background:#111;color:#fff;font:bold 13px sans-serif;z-index:2;';
top.appendChild(mk('Scroll','#1565c0',function(){setMode('scroll')}));
top.appendChild(mk('Carrusel','#6a1b9a',function(){setMode('carousel')}));
top.appendChild(mk('Close','#c62828',function(){closeOverlay()}));
overlay.appendChild(top);
var stage=document.createElement('div');stage.__galleryOwn=true;stage.id='__galleryStage';
stage.style.cssText='flex:1;width:100%;overflow:auto;display:flex;flex-direction:column;align-items:center;gap:0;';
overlay.appendChild(stage);
document.body.appendChild(overlay);
var imgs=[];box.querySelectorAll('img[data-src]').forEach(function(t){var k=t.dataset.src;var src=b64map[k]||k;imgs.push({src:src,page:parseInt(t.dataset.page,10)||0});});
imgs.sort(function(a,b){return a.page-b.page;});
imgs.forEach(function(o){
var wrap=document.createElement('div');wrap.__galleryOwn=true;
wrap.style.cssText='width:100%;display:flex;justify-content:center;background:#000;';
var im=document.createElement('img');im.src=o.src;im.dataset.page=o.page;
im.style.cssText='width:100%;height:auto;display:block;max-width:100%;';
wrap.appendChild(im);
stage.appendChild(wrap);
});
function setMode(m){
if(m==='scroll'){
stage.style.overflowY='auto';stage.style.overflowX='hidden';
stage.style.flexDirection='column';
stage.querySelectorAll('div').forEach(function(w){w.style.width='100%';w.style.display='flex';w.style.justifyContent='center';});
}else{
stage.style.overflowY='hidden';stage.style.overflowX='auto';
stage.style.flexDirection='row';
stage.querySelectorAll('div').forEach(function(w){w.style.width='100vw';w.style.minWidth='100vw';w.style.height='100%';w.style.alignItems='center';});
}
}
function closeOverlay(){if(overlay&&overlay.parentNode)overlay.parentNode.removeChild(overlay);overlay=null;}
function onKey(e){if(e.key==='Escape'){closeOverlay();}}
document.addEventListener('keydown',onKey,true);
function onTouchStart(e){if(e.touches.length>=3){e.preventDefault();closeOverlay();}}
overlay.addEventListener('touchstart',onTouchStart,{passive:false});
}
function showOne(src,keep,fromDir){
window.__galleryShot=null;
if(window.__galleryHolder&&window.__galleryHolder.parentNode)window.__galleryHolder.parentNode.removeChild(window.__galleryHolder);
sel.innerHTML='';
var page=null;var thumbs=box.querySelectorAll('img[data-src]');
for(var i=0;i<thumbs.length;i++){if(thumbs[i].dataset.src===src){page=parseInt(thumbs[i].dataset.page,10);break;}}
if(!page)page=curPage();
var useSrc=b64map[src]||src;
var app=document.createElement('div');app.__galleryOwn=true;
app.style.cssText='background:#000;display:flex;flex-direction:column;align-items:center;gap:10px;padding:10px;box-sizing:border-box;';
var holder=document.createElement('div');holder.style.cssText='position:fixed;left:-99999px;top:0;background:#000;';window.__galleryHolder=holder;
var im=document.createElement('img');im.src=useSrc;im.loading='eager';im.decoding='sync';im.style.cssText='display:block;';
var pre=document.createElement('img');pre.style.cssText='max-width:100%;height:auto;display:block;border:1px solid #444;background:#000;will-change:transform,opacity;';pre.src=useSrc;
var hint=document.createElement('div');hint.style.cssText='color:#aaa;font-size:12px;text-align:center;max-width:90vw;';
var bar=document.createElement('div');bar.style.cssText='display:flex;gap:8px;flex-wrap:wrap;justify-content:center;';
var shot=null;var curIdx=seen.indexOf(src);if(curIdx<0)curIdx=0;
function go(d){if(!pre.parentNode)return;pre.style.transition='transform .25s ease, opacity .25s ease';pre.style.transform='translateX('+(d>0?'-100%':'100%')+')';pre.style.opacity='0';setTimeout(function(){var n=(curIdx+d+seen.length)%seen.length;curIdx=n;showOne(seen[n],false,d);},250);}
var finish=function(){var w=im.naturalWidth,h=im.naturalHeight;if(!w||!h){hint.textContent='Image not loaded';return;}im.style.width=w+'px';im.style.height=h+'px';holder.style.width=w+'px';holder.style.height=h+'px';loadH2C(function(){html2canvas(im,{useCORS:true,allowTaint:false,backgroundColor:'#000000',scale:1,width:w,height:h,logging:false}).then(function(c){shot=c;window.__galleryShot=c;hint.textContent='Ready: '+c.width+'x'+c.height+' px';}).catch(function(e){hint.textContent='CORS: cannot capture';});});};
holder.appendChild(im);document.body.appendChild(holder);
if(im.complete&&im.naturalWidth>0){finish();}else{im.onload=finish;im.onerror=function(){hint.textContent='Image failed to load';};}
bar.appendChild(mk('Download','#2e7d32',function(){if(!shot){hint.textContent='No capture yet. Wait for Ready.';return;}shot.toBlob(function(blob){if(!blob){hint.textContent='Blob failed';return;}var url=URL.createObjectURL(blob);var a=document.createElement('a');a.href=url;a.download=fname(page);document.body.appendChild(a);a.click();setTimeout(function(){a.remove();URL.revokeObjectURL(url);},1500);hint.textContent='Download triggered ('+fname(page)+')';},'image/png');}));
bar.appendChild(mk('Close','#c62828',function(){if(holder.parentNode)holder.parentNode.removeChild(holder);sel.innerHTML='';window.__galleryShot=null;}));
app.appendChild(pre);app.appendChild(hint);app.appendChild(bar);sel.appendChild(app);
if(fromDir){pre.style.transform='translateX('+(fromDir>0?'100%':'-100%')+')';pre.style.opacity='0';requestAnimationFrame(function(){requestAnimationFrame(function(){pre.style.transition='transform .25s ease, opacity .25s ease';pre.style.transform='translateX(0)';pre.style.opacity='1';});});}
var sx=0,sy=0,sw=false;
['touchstart','pointerdown'].forEach(function(ev){app.addEventListener(ev,function(e){if(e.touches&&e.touches.length===1){sx=e.touches[0].clientX;sy=e.touches[0].clientY;sw=true;}else if(e.clientX!==undefined){sx=e.clientX;sy=e.clientY;sw=true;}e.stopPropagation();},{passive:true});});
['touchend','pointerup'].forEach(function(ev){app.addEventListener(ev,function(e){if(!sw)return;sw=false;var x=e.changedTouches?e.changedTouches[0].clientX:e.clientX;var y=e.changedTouches?e.changedTouches[0].clientY:e.clientY;var dx=x-sx,dy=y-sy;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)){go(dx<0?1:-1);}e.stopPropagation();},{passive:true});});
}
if(!window.__galleryObserver){
window.__galleryObserver=new MutationObserver(function(){
if(!document.body.contains(head)){document.body.appendChild(head);document.body.appendChild(box);document.body.appendChild(sel);scan();}
});
window.__galleryObserver.observe(document.body,{childList:true,subtree:false});
}
}catch(e){alert('[gallery] ERROR: '+(e&&e.message?e.message:e));}})();
