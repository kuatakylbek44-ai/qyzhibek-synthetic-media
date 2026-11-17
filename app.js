'use strict';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const storageKey = 'qyzhibek-media-v1';
let saved = {};
try { saved = JSON.parse(localStorage.getItem(storageKey) || '{}') || {}; } catch {}
if (typeof saved !== 'object' || Array.isArray(saved)) saved = {};
const state = {
 read: Array.isArray(saved.read) ? saved.read.filter(n => Number.isInteger(n) && n >= 0 && n < 7) : [],
 answers: Array.from({length:4},(_,i) => typeof saved.answers?.[i] === 'string' ? saved.answers[i].slice(0,8000) : ''),
 tasks: Array.isArray(saved.tasks) ? saved.tasks.filter(n => Number.isInteger(n) && n >= 0 && n < 4) : []
};
let storageWarned=false;
function save(){try{localStorage.setItem(storageKey,JSON.stringify(state));}catch{if(!storageWarned){toast('Браузерде сақтау қолжетімсіз. Жұмысты файлға жүктеп алыңыз.');storageWarned=true;}}}
let toastTimer;
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3500);}

// Navigation and reading progress.
$('.menu-toggle').addEventListener('click',()=>{const open=$('#nav').classList.toggle('open');$('.menu-toggle').setAttribute('aria-expanded',String(open));$('.menu-toggle').setAttribute('aria-label',open?'Мәзірді жабу':'Мәзірді ашу');document.body.classList.toggle('menu-open',open);});
function closeMenu(){$('#nav').classList.remove('open');$('.menu-toggle').setAttribute('aria-expanded','false');$('.menu-toggle').setAttribute('aria-label','Мәзірді ашу');document.body.classList.remove('menu-open');}
$$('#nav a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
window.addEventListener('resize',()=>{if(innerWidth>850)closeMenu();},{passive:true});
const navSections=$$('#nav a').map(a=>$(a.getAttribute('href')));
function onScroll(){const scrollMax=document.documentElement.scrollHeight-innerHeight;$('.reading-progress i').style.width=(scrollMax>0?scrollY/scrollMax*100:0)+'%';let current='home';navSections.forEach(s=>{if(s.getBoundingClientRect().top<180)current=s.id;});$$('#nav a').forEach(a=>{const active=a.hash==='#'+current;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();

// Lecture content and local reading progress.
$('#lecture-list').innerHTML=COURSE.lessons.map((l,i)=>`<details class="lecture-item" ${i===0?'open':''}><summary><span class="lecture-number">${String(i+1).padStart(2,'0')}</span><span class="lecture-title"><b>${l.title}</b><small>${l.sub}</small></span><span class="lecture-plus" aria-hidden="true">+</span></summary><div class="lecture-body">${l.body}<button class="mark-read" data-lesson="${i}" aria-pressed="false">✓ Оқып шықтым</button></div></details>`).join('');
function updateRead(){const count=new Set(state.read).size;$('#read-count').textContent=count+' / 7';$('#read-meter').style.width=(count/7*100)+'%';$$('.mark-read').forEach(b=>{const done=state.read.includes(+b.dataset.lesson);b.classList.toggle('done',done);b.setAttribute('aria-pressed',String(done));b.textContent=done?'✓ Оқылды · белгіні алып тастау':'✓ Оқып шықтым';});}
$$('.mark-read').forEach(b=>b.addEventListener('click',()=>{const i=+b.dataset.lesson;state.read=state.read.includes(i)?state.read.filter(n=>n!==i):[...state.read,i];save();updateRead();}));updateRead();
let prePrint=[];
window.addEventListener('beforeprint',()=>{prePrint=$$('.lecture-item').map(d=>d.open);$$('.lecture-item').forEach(d=>d.open=true);});
window.addEventListener('afterprint',()=>$$('.lecture-item').forEach((d,i)=>d.open=!!prePrint[i]));
$('#print-lecture').addEventListener('click',()=>window.print());

// Browser speech synthesis: explicit voice selection, truthful capability state.
const synth=window.speechSynthesis;
let voices=[],utterance=null,speechId=0,speechTimer;
const sample=$('#tts-text').value;
function updateChars(){$('#char-count').textContent=$('#tts-text').value.length+' / 1200';}
$('#tts-text').addEventListener('input',updateChars);updateChars();
$('#sample-text').addEventListener('click',()=>{$('#tts-text').value=sample;updateChars();});
$('#speech-rate').addEventListener('input',e=>$('#rate-value').textContent=Number(e.target.value).toFixed(1)+'×');
$('#waveform').innerHTML=Array.from({length:49},(_,i)=>`<i style="--h:${10+Math.sin(i*.8)**2*39}px;--delay:${-i*.09}s"></i>`).join('');
function voiceNote(){const v=voices[+$('#voice-select').value];$('#voice-note').textContent=v?/^kk(?:-|_)/i.test(v.lang)||v.lang==='kk'?'Қазақша дауыс таңдалды. Айтылымын тыңдап бағалаңыз.':'Таңдалған дауыс тілі: '+v.lang+'. Қазақ мәтінінің айтылымы дәл болмауы мүмкін.':'Құрылғыда дауыс табылмады. Дауыс пакетін қосып, бетті қайта ашыңыз.';}
function loadVoices(){if(!synth)return;const previous=voices[+$('#voice-select').value]?.voiceURI;voices=synth.getVoices();$('#voice-select').replaceChildren();if(!voices.length){$('#voice-select').append(new Option('Дауыстар қолжетімсіз',''));$('#speak').disabled=true;voiceNote();return;}voices.forEach((v,i)=>$('#voice-select').append(new Option(v.name+' · '+v.lang,String(i))));let index=voices.findIndex(v=>v.voiceURI===previous);if(index<0)index=voices.findIndex(v=>/^kk(?:-|_|$)/i.test(v.lang));if(index<0)index=voices.findIndex(v=>v.default);$('#voice-select').value=String(Math.max(0,index));$('#speak').disabled=false;voiceNote();}
$('#voice-select').addEventListener('change',voiceNote);
function speechEnd(message){clearTimeout(speechTimer);$('#waveform').classList.remove('playing');$('#stop-speech').disabled=true;$('#speak').disabled=!voices.length;$('#tts-status').textContent=message;utterance=null;}
if(synth && 'SpeechSynthesisUtterance' in window){loadVoices();synth.addEventListener('voiceschanged',loadVoices);setTimeout(loadVoices,1200);}else{$('#speak').disabled=true;$('#voice-select').replaceChildren(new Option('Бұл браузер TTS қолдамайды',''));$('#voice-note').textContent='Дыбыстау үшін Speech Synthesis қолдайтын браузер қажет.';}
$('#speak').addEventListener('click',()=>{const text=$('#tts-text').value.trim();if(!text){$('#tts-status').textContent='Алдымен дыбысталатын мәтін жазыңыз.';$('#tts-text').focus();return;}if(!voices.length||!synth)return;const id=++speechId;synth.cancel();utterance=new SpeechSynthesisUtterance(text);const v=voices[+$('#voice-select').value];utterance.voice=v;utterance.lang=v.lang;utterance.rate=Number($('#speech-rate').value);utterance.onstart=()=>{if(id!==speechId)return;clearTimeout(speechTimer);$('#waveform').classList.add('playing');$('#tts-status').textContent='Мәтін дыбысталып жатыр…';};utterance.onend=()=>{if(id===speechId)speechEnd('Тыңдау аяқталды. Жылдамдықты өзгертіп, салыстырып көріңіз.');};utterance.onerror=e=>{if(id===speechId)speechEnd(e.error==='not-allowed'?'Дыбыстауға браузер рұқсат бермеді. Бетпен әрекеттесіп, қайта көріңіз.':'Дыбыстау орындалмады. Басқа дауысты таңдаңыз немесе дауыс қызметін тексеріңіз.');};$('#speak').disabled=true;$('#stop-speech').disabled=false;$('#tts-status').textContent='Дауыс дайындалуда…';speechTimer=setTimeout(()=>{if(id===speechId){++speechId;synth.cancel();speechEnd('Дауыс қызметі жауап бермеді. Басқа дауысты таңдап көріңіз.');}},12000);synth.speak(utterance);});
$('#stop-speech').addEventListener('click',()=>{++speechId;synth?.cancel();speechEnd('Дыбыстау тоқтатылды.');});
window.addEventListener('pagehide',()=>{++speechId;synth?.cancel();});

// Avatar: clearly labelled scripted learning simulation.
const moods={friendly:'Сәлем! Мен Q — оқу аватарымын. Бүгін технологияны саналы қолдануды бірге үйренеміз.',thinking:'Ойланып көрейік: цифрлық кейіпкердің сөздеріне сену үшін қандай дәлел қажет?',speaking:'Сөйлегенде ерін қимылы дыбысқа сәйкес өзгеруі керек. Бұл анимация lip-sync қағидасын қарапайым түрде көрсетеді.'};
$$('.mood-picker button').forEach(b=>b.addEventListener('click',()=>{$('#avatar-figure').dataset.mood=b.dataset.mood;$('#avatar-message').textContent=moods[b.dataset.mood];$$('.mood-picker button').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b));});}));
$('#step-detail').textContent=COURSE.avatarSteps[0];$$('#avatar-steps button').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.step==='0'));b.addEventListener('click',()=>{$$('#avatar-steps button').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b));});$('#step-detail').textContent=COURSE.avatarSteps[+b.dataset.step];$('#avatar-message').textContent=COURSE.avatarSteps[+b.dataset.step];});});

// Deepfake visual comparison and information switch.
$('#compare-range').addEventListener('input',e=>{const v=e.target.value;$('#altered-scene').style.clipPath=`inset(0 0 0 ${v}%)`;$('#compare-divider').style.left=v+'%';});
function renderDeepfake(risks){$('#deepfake-details').innerHTML=COURSE[risks?'risks':'benefits'].map(([icon,title,desc])=>`<div class="feature-row"><span aria-hidden="true" ${risks?'style="color:#dba5b3"':''}>${icon}</span><div><h4>${title}</h4><p>${desc}</p></div></div>`).join('');['benefits','risks'].forEach((k,i)=>{const active=Boolean(i)===risks;$('#'+k+'-tab').classList.toggle('selected',active);$('#'+k+'-tab').setAttribute('aria-pressed',String(active));});}
$('#benefits-tab').addEventListener('click',()=>renderDeepfake(false));$('#risks-tab').addEventListener('click',()=>renderDeepfake(true));renderDeepfake(false);

// Fact-check checklist and explanatory case feedback.
$('#checklist').innerHTML=COURSE.checks.map(([title,desc],i)=>`<label class="check-item"><input type="checkbox" aria-label="${i+1}. ${title}"><span><b>${String(i+1).padStart(2,'0')} / ${title}</b><p>${desc}</p></span></label>`).join('');
function updateChecks(){const n=$$('#checklist input:checked').length;$('#check-result').textContent=n===5?'5 / 5 қадам орындалды. Қорытындыны жиналған дәлелге сүйеніп жасаңыз.':`${n} / 5 қадам орындалды. Бұл белгілеу ақпараттың шынайылығын автоматты анықтамайды.`;}
$$('#checklist input').forEach(c=>c.addEventListener('change',updateChecks));$('#reset-checklist').addEventListener('click',()=>{$$('#checklist input').forEach(c=>c.checked=false);updateChecks();});
$$('#case-options button').forEach(b=>b.addEventListener('click',()=>{const correct=b.dataset.correct==='true';$$('#case-options button').forEach(x=>x.classList.remove('correct','incorrect'));b.classList.add(correct?'correct':'incorrect');$('#case-feedback').textContent=correct?'Дұрыс. Ресми сайтты немесе ресми байланыс арнасын тексеріңіз. Расталғанға дейін хабарды таратпаңыз.':'Қайта ойланып көріңіз. Сыртқы ұқсастық пен хабардың таралуы дәлел емес. Тәуелсіз ресми растау қажет.';$('#case-feedback').style.color=correct?'var(--cyan)':'#e2b09e';}));

// Student work stays in this browser and can be exported as text.
$('#task-grid').innerHTML=COURSE.tasks.map((t,i)=>`<article class="task-card"><div class="task-head"><span class="task-number">ТАПСЫРМА ${String(i+1).padStart(2,'0')}</span><span>${t.time}</span></div><h3>${t.title}</h3><p>${t.desc}</p><ul>${t.steps.map(s=>`<li>${s}</li>`).join('')}</ul><label for="answer-${i}">Сіздің жауабыңыз · осы браузерде сақталады</label><textarea id="answer-${i}" maxlength="8000" placeholder="${t.prompt}"></textarea><label class="task-done"><input type="checkbox" data-task="${i}"> Тапсырманы орындадым</label></article>`).join('');
function updateTasks(){$('#task-count').textContent=new Set(state.tasks).size+' / 4 тапсырма орындалды';}
COURSE.tasks.forEach((t,i)=>{const ta=$('#answer-'+i);ta.value=state.answers[i];ta.addEventListener('input',()=>{state.answers[i]=ta.value;save();});const c=$(`[data-task="${i}"]`);c.checked=state.tasks.includes(i);c.addEventListener('change',()=>{state.tasks=c.checked?[...new Set([...state.tasks,i])]:state.tasks.filter(n=>n!==i);save();updateTasks();});});updateTasks();
$('#download-work').addEventListener('click',()=>{let text='СИНТЕТИКАЛЫҚ МЕДИА ЖӘНЕ ГЕНЕРАТИВТІ ЖИ\n11-апта · Практикум\nОқу сайтын орындаған: Абдилла Қызжібек\n\nСтудент: _____________________\nТоп: _________________________\n\n';COURSE.tasks.forEach((t,i)=>{text+=`${i+1}. ${t.title}\n${t.desc}\n${t.steps.map((s,j)=>(j+1)+') '+s).join('\n')}\n\nЖАУАП:\n${state.answers[i]||'(Жауап жазылмаған)'}\nКүйі: ${state.tasks.includes(i)?'орындалды':'орындалуда'}\n\n${'—'.repeat(40)}\n\n`;});text+='Бағалау өлшемдері: теориялық дұрыстық — 30%; дәлел мен талдау — 30%; жауапты қолдану — 20%; түсініктілік пен рәсімдеу — 20%.\n';const blob=new Blob(['\uFEFF',text],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='11-apta-praktikum.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);toast('Жұмыс парағы жүктелді.');});

// Five-question quiz: score once per question, explanations, retry.
let quizIndex=0,quizScore=0,quizAnswered=false;
function renderQuiz(focus=false){quizAnswered=false;const q=COURSE.quiz[quizIndex];$('#quiz-counter').textContent=String(quizIndex+1).padStart(2,'0')+' / 05';$('#quiz-body').innerHTML=`<h4 tabindex="-1">${q.q}</h4><div>${q.a.map((a,i)=>`<button class="quiz-option" data-answer="${i}"><span>${String.fromCharCode(65+i)}</span>${a}</button>`).join('')}</div><p class="quiz-feedback" aria-live="polite"></p><button class="button primary quiz-next" hidden>${quizIndex===4?'Нәтижені көру':'Келесі сұрақ'} →</button>`;$$('.quiz-option').forEach(b=>b.addEventListener('click',()=>{if(quizAnswered)return;quizAnswered=true;const selected=+b.dataset.answer;const correct=selected===q.correct;if(correct)quizScore++;$$('.quiz-option').forEach(x=>{x.disabled=true;if(+x.dataset.answer===q.correct)x.classList.add('correct');});if(!correct)b.classList.add('incorrect');$('.quiz-feedback').textContent=(correct?'Дұрыс! ':'Дұрыс жауап: '+String.fromCharCode(65+q.correct)+'. ')+q.explain;$('.quiz-next').hidden=false;}));$('.quiz-next').addEventListener('click',()=>{if(quizIndex<4){quizIndex++;renderQuiz(true);}else showResult();});if(focus)$('#quiz-body h4').focus({preventScroll:true});}
function showResult(){$('#quiz-counter').textContent='АЯҚТАЛДЫ';$('#quiz-body').innerHTML=`<div class="quiz-result-score" tabindex="-1">${quizScore}<small> / 5</small></div><h4>${quizScore===5?'Тамаша нәтиже!':quizScore>=3?'Жақсы жұмыс!':'Тақырыпты тағы бір қайталаңыз.'}</h4><p class="quiz-feedback">${quizScore===5?'Негізгі ұғымдарды меңгердіңіз. Енді практикумда қолданып көріңіз.':'Дәрістегі анықтамалар мен медиасауаттылық қадамдарын қайталап, тестті қайта өтіңіз.'}</p><button class="button primary" id="retry-quiz">Қайта өту ↻</button>`;$('.quiz-result-score').focus({preventScroll:true});$('#retry-quiz').addEventListener('click',()=>{quizIndex=0;quizScore=0;renderQuiz(true);});}renderQuiz();

// Scroll reveals honour reduced-motion and do not hide content without JS.
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.07});$$('.overview-card,.section-heading,.task-card,.sources,.quiz').forEach(e=>{e.classList.add('reveal');observer.observe(e);});}

// Original code-drawn particle sphere: no external image or runtime dependency.
(()=>{const canvas=$('#orb'),ctx=canvas.getContext('2d');if(!ctx)return;const reduced=matchMedia('(prefers-reduced-motion: reduce)');let w=0,h=0,rotation=.3,visible=true,frame=0;const points=[];const count=innerWidth<620?1050:1700;const golden=Math.PI*(3-Math.sqrt(5));for(let i=0;i<count;i++){const y=1-i/(count-1)*2;const radius=Math.sqrt(1-y*y);const theta=golden*i;points.push({x:Math.cos(theta)*radius,y,z:Math.sin(theta)*radius,seed:i/count});}
 function resize(){const rect=canvas.getBoundingClientRect();w=rect.width;h=rect.height;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);if(reduced.matches)draw();}
 function draw(){ctx.clearRect(0,0,w,h);const radius=Math.min(w,h)*.365;const cx=w*.51,cy=h*.49;const cr=Math.cos(rotation),sr=Math.sin(rotation);const glow=ctx.createRadialGradient(cx,cy,10,cx,cy,radius*1.38);glow.addColorStop(0,'rgba(116,77,190,.12)');glow.addColorStop(.65,'rgba(83,62,160,.07)');glow.addColorStop(1,'rgba(38,25,70,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);const projected=points.map(p=>{const x=p.x*cr-p.z*sr;const z=p.x*sr+p.z*cr;const tilt=-.22;const y=p.y*Math.cos(tilt)-z*Math.sin(tilt);const zz=p.y*Math.sin(tilt)+z*Math.cos(tilt);const ripple=1+Math.sin(p.y*9+rotation*3)*.025;const scale=2.8/(2.8-zz*.4);return{x:cx+x*radius*scale*ripple,y:cy+y*radius*scale*ripple,z:zz,seed:p.seed};}).sort((a,b)=>a.z-b.z);projected.forEach(p=>{const alpha=.15+(p.z+1)*.35;const size=.5+(p.z+1)*.65;const hue=240+p.seed*40-(p.x>cx?40:0);ctx.fillStyle=`hsla(${hue},85%,${62+(p.z+1)*11}%,${alpha})`;ctx.beginPath();ctx.arc(p.x,p.y,size,0,Math.PI*2);ctx.fill();if(p.z>.4&&Math.floor(p.seed*count)%21===0){ctx.strokeStyle=`rgba(157,133,230,${alpha*.18})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x+Math.sin(p.seed*65)*22,p.y+Math.cos(p.seed*43)*15);ctx.stroke();}});}
 let last=0;function loop(t){frame=0;if(!visible||document.hidden||reduced.matches)return;if(t-last>30){rotation+=.003;draw();last=t;}frame=requestAnimationFrame(loop);}function start(){if(!frame&&visible&&!document.hidden&&!reduced.matches)frame=requestAnimationFrame(loop);}
 new ResizeObserver(resize).observe(canvas);if('IntersectionObserver' in window)new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible)start();else{cancelAnimationFrame(frame);frame=0;}}).observe(canvas);document.addEventListener('visibilitychange',start);reduced.addEventListener('change',()=>{if(reduced.matches){cancelAnimationFrame(frame);frame=0;draw();}else start();});resize();draw();start();
})();
