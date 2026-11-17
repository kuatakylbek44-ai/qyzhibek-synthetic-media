
        // =========================================================
        // 0. NOTIFICATION TOAST HELPER (alert() орнына)
        // =========================================================
        function showToast(message, type = 'info') {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            const colors = {
                info: 'border-neonCyan/50 bg-slate-900/95 text-cyan-200',
                success: 'border-emerald-500/50 bg-slate-900/95 text-emerald-200',
                warning: 'border-amber-500/50 bg-slate-900/95 text-amber-200'
            };
            toast.className = `pointer-events-auto px-4 py-3 rounded-xl border shadow-xl text-xs sm:text-sm font-medium flex items-center gap-2.5 transition-all duration-300 ${colors[type] || colors.info}`;
            toast.innerHTML = `<i class="fa-solid fa-circle-info"></i><span>${message}</span>`;
            container.appendChild(toast);
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(10px)';
                setTimeout(() => toast.remove(), 300);
            }, 3200);
        }

        // =========================================================
        // 1. MOBILE NAVIGATION TOGGLE
        // =========================================================
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-xmark');
            mobileMenuBtn.setAttribute('aria-expanded', String(!mobileMenu.classList.contains('hidden')));
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('fa-xmark');
            });
        });

        // =========================================================
        // 2. ДӘРІС МАЗМҰНЫ (7 ТЕОРИЯЛЫҚ БӨЛІМ ДЕРЕКТЕРІ)
        // =========================================================
        const lectureSections = [
            {
                id: 1,
                title: "1. Генеративті ЖИ негіздері: LLM және Диффузиялық модельдер",
                icon: "fa-microchip",
                badge: "Фундаменталды теория",
                summary: "Дәстүрлі дискриминативті ЖИ деректерді жіктеумен (мысалы, «мысық па, ит пе?») айналысса, Генеративті ЖИ (Generative AI) оқытылған үлкен деректер жиынтығының ықтималдық үлестірімін үйреніп, мүлде жаңа контент (мәтін, сурет, дыбыс, код) жасайды.",
                details: [
                    "<strong>Үлкен тілдік модельдер (LLM — Large Language Models):</strong> Transformer архитектурасы мен Self-Attention (өзіндік назар аудару) механизміне негізделген. Олар контекстке сүйене отырып, келесі токенді (сөз бөлігін) болжау арқылы күрделі мақалалар, сценарийлер мен бағдарламалық код жазады (GPT, Gemini, Claude).",
                    "<strong>Диффузиялық модельдер (Diffusion Models):</strong> Кескін мен бейне генерациясының негізгі қозғалтқышы. Оқыту барысында суретке біртіндеп Гаусстық шу қосылады (Forward Diffusion), ал генерация кезінде нейрожелі таза шудан бастап, мәтіндік сұранысқа (CLIP embedding) сәйкес шуды тазартып, айқын кескін құрастырады (Reverse Diffusion)."
                ],
                terms: ["Transformer", "Self-Attention", "Токен (Token)", "Латентті кеңістік (Latent Space)", "Диффузия процесі"],
                example: "Мысал: Пайдаланушы «Астанадағы футуристік кітапхана» деген промпт бергенде, мәтін кодировщигі сөздерді векторға айналдырады, ал диффузиялық модель 30-50 қадам ішінде кездейсоқ пиксельдерден сәулеттік кескін қалыптастырады."
            },
            {
                id: 2,
                title: "2. Синтетикалық медиа ұғымы мен эволюциясы",
                icon: "fa-layer-group",
                badge: "Тарих және концепция",
                summary: "Синтетикалық медиа (Synthetic Media) — жасанды интеллект алгоритмдерінің көмегімен толықтай немесе ішінара генерацияланған, түрлендірілген аудио, визуалды және мәтіндік контенттің жиынтық атауы.",
                details: [
                    "<strong>1-кезең (2014–2017) — GAN дәуірі:</strong> Ян Гудфеллоу ұсынған Генеративті бәсекелес желілер (GAN) алғаш рет шынайы адам бет-әлпетін синтездеуге мүмкіндік берді, бірақ оқыту тұрақсыз болды.",
                    "<strong>2-кезең (2018–2021) — Трансформерлер және ерте Deepfake:</strong> Мәтін генерациясында GPT-2/GPT-3 серпіліс жасап, бейнеде бет алмастыру қосымшалары кең тарала бастады.",
                    "<strong>3-кезең (2022–қазіргі уақыт) — Мультимодальды генерация:</strong> Мәтін, дыбыс, кескін және 3D-ны бір жүйеде біріктіретін мультимодальды модельдер дәуірі. Контент жасау құны нөлге жақындады."
                ],
                terms: ["Синтетикалық медиа", "GAN", "Мультимодальдылық", "Генеративті конвейер"],
                example: "Мысал: Заманауи жарнама агенттіктері түсірілім тобын жалдамай-ақ, өнімнің 3D моделін, фондық музыкасын және диктор дауысын бір платформада синтездейді."
            },
            {
                id: 3,
                title: "3. Мәтін мен кескін генерациясы (Text-to-Text & Text-to-Image)",
                icon: "fa-palette",
                badge: "Контент өндірісі",
                summary: "Мәтін мен кескін генерациясы журналистика, дизайн, маркетинг және білім беру салаларында контент жасау жылдамдығын ондаған есе арттырды.",
                details: [
                    "<strong>Промпт-инжиниринг (Prompt Engineering):</strong> ЖИ-ден дәл нәтиже алу өнері. Тиімді промпт 4 элементтен тұрады: Рөл (Role), Міндет (Task), Контекст (Context) және Шығыс форматы (Format).",
                    "<strong>Кескінді басқару тетіктері:</strong> Text-to-Image модельдерінде ControlNet (поза мен композицияны бақылау), Inpainting (суреттің белгілі бір бөлігін өзгерту) және Outpainting (кадр шекарасын кеңейту) әдістері қолданылады."
                ],
                terms: ["Prompt Engineering", "Inpainting / Outpainting", "ControlNet", "Negative Prompt", "Seed"],
                example: "Мысал: Журналист мақала тақырыбына сай бірегей иллюстрация жасау үшін «minimalist editorial illustration, cyber security theme, cyan and purple palette, clean vector style» промптын қолданады."
            },
            {
                id: 4,
                title: "4. Аудио және дауыс синтезі (TTS & Voice AI)",
                icon: "fa-wave-square",
                badge: "Акустикалық ЖИ",
                summary: "Нейрондық дауыс синтезі мәтінді адам дауысынан айыру қиын болатын табиғи интонациямен, эмоциямен және тыныс алу ырғағымен оқуға мүмкіндік береді.",
                details: [
                    "<strong>Просодияны басқару (Prosody Control):</strong> Заманауи TTS модельдері сөйлемнің сұраулы, лепті немесе сабырлы екенін контексттен түсініп, дауыс ырғағын автоматты бейімдейді.",
                    "<strong>Speech-to-Speech (S2S):</strong> Бір адамның сөйлеу мәнері мен эмоциясын сақтай отырып, оның дауысын басқа диктордың тембріне немесе басқа тілге нақты уақытта ауыстыру."
                ],
                terms: ["TTS (Text-to-Speech)", "Mel-спектрограмма", "Вокодер", "Просодия", "Voice Cloning"],
                example: "Мысал: Қазақ тіліндегі аудиокітаптар мен инклюзивті білім беру платформаларында көру қабілеті төмен студенттерге оқулықтарды табиғи дауыспен дыбыстау."
            },
            {
                id: 5,
                title: "5. Бейне генерациясы және нейрорендеринг",
                icon: "fa-video",
                badge: "Динамикалық синтез",
                summary: "Text-to-Video және Image-to-Video модельдері уақыттық бірізділікті (Temporal Consistency) сақтай отырып, қозғалыстағы бейнекадрларды генерациялайды.",
                details: [
                    "<strong>Уақыттық бірізділік (Temporal Consistency):</strong> Бейне генерациясындағы ең басты міндет — кадрдан кадрға өткенде нысандардың пішіні мен түсінің «жыпылықтап» өзгеріп кетпеуін қамтамасыз ету.",
                    "<strong>Нейрорендеринг (NeRF және 3D Gaussian Splatting):</strong> Бірнеше ракурстан түсірілген 2D фотосуреттер негізінде 3D кеңістікті қайта құрып, камераны кез келген бағытта еркін қозғалтуға мүмкіндік беретін технология."
                ],
                terms: ["Text-to-Video", "Temporal Consistency", "3D Gaussian Splatting", "NeRF", "Motion Brush"],
                example: "Мысал: Сәулетшілер ғимарат сызбасын 3D Gaussian Splatting арқылы виртуалды бейне-турға айналдырып, тапсырыс берушіге көрсете алады."
            },
            {
                id: 6,
                title: "6. Синтетикалық контенттің құқықтық және этикалық аспектілері",
                icon: "fa-scale-balanced",
                badge: "Құқық және Этика",
                summary: "Синтетикалық медианың қарқынды дамуы авторлық құқық, жеке деректерді қорғау және контенттің түпнұсқалығын растау мәселелерін күн тәртібіне шығарды.",
                details: [
                    "<strong>Авторлық құқық дилеммасы:</strong> ЖИ модельдерін оқыту үшін интернеттегі авторлық туындыларды пайдалану заңдылығы және ЖИ жасаған өнімге авторлық құқықтың тиесілілігі (көптеген елдерде тек адам шығармашылығы қорғалады).",
                    "<strong>Міндетті таңбалау (Watermarking & C2PA):</strong> Еуропалық Одақтың AI Act заңнамасы және C2PA (Coalition for Content Provenance and Authenticity) стандарты бойынша ЖИ арқылы жасалған медиада көзге көрінбейтін криптографиялық метадеректер (Content Credentials) болуы тиіс."
                ],
                terms: ["C2PA стандарты", "AI Act", "Цифрлық сутаңба (Watermarking)", "Жеке бейне құқығы (Right of Publicity)"],
                example: "Мысал: Google DeepMind әзірлеген SynthID технологиясы генерацияланған сурет пен аудионың пиксельдері мен дыбыс толқындарына өшірілмейтін цифрлық белгі енгізеді."
            },
            {
                id: 7,
                title: "7. Болашақ трендтер мен креативті индустрия",
                icon: "fa-rocket",
                badge: "Болашақ көкжиегі",
                summary: "Алдағы жылдары синтетикалық медиа статикалық контенттен әрбір пайдаланушыға бейімделетін интерактивті, дербестендірілген медиа-ортаға айналады.",
                details: [
                    "<strong>Гипер-персонализацияланған медиа:</strong> Көрерменнің қызығушылығы мен тіліне қарай сюжеті немесе баяндау стилі нақты уақытта бейімделетін оқу бағдарламалары мен жарнамалар.",
                    "<strong>Адам + ЖИ ко-креативтілігі (Co-Creation):</strong> ЖИ шығармашылық мамандықтарды жоймайды, керісінше режиссер, дизайнер және журналист рөлін «орындаушыдан» «креативті арт-директор» деңгейіне көтереді."
                ],
                terms: ["Co-Creation", "Гипер-персонализация", "Интерактивті әлем модельдері (World Models)", "Агенттік ЖИ"],
                example: "Мысал: Ойын индустриясында NPC (ойын кейіпкерлері) алдын ала жазылған мәтінмен емес, ойыншының әрекетіне қарай ЖИ арқылы еркін диалог құратын болады."
            }
        ];

        let currentLectureIndex = 0;

        function renderLectureTabs() {
            const tabsContainer = document.getElementById('lecture-tabs');
            tabsContainer.innerHTML = lectureSections.map((sec, idx) => {
                const isActive = idx === currentLectureIndex;
                return `
                    <button type="button" onclick="selectLectureSection(${idx})"
                        class="text-left p-3.5 rounded-2xl border transition flex items-center gap-3 shrink-0 lg:shrink ${
                            isActive 
                            ? 'bg-gradient-to-r from-neonPurple/25 to-neonCyan/20 border-neonCyan/60 text-white shadow-lg shadow-neonCyan/10' 
                            : 'glass border-white/10 text-slate-300 hover:bg-white/5 hover:text-white'
                        }">
                        <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isActive ? 'bg-neonCyan text-slate-950 font-bold' : 'bg-white/10 text-slate-300'}">
                            <i class="fa-solid ${sec.icon} text-xs"></i>
                        </div>
                        <span class="text-xs sm:text-sm font-semibold line-clamp-2">${sec.title}</span>
                    </button>
                `;
            }).join('');
        }

        function renderLectureContent() {
            const sec = lectureSections[currentLectureIndex];
            const panel = document.getElementById('lecture-content-panel');
            panel.innerHTML = `
                <div class="space-y-5">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                        <span class="px-3 py-1 rounded-full text-xs font-semibold bg-neonPurple/20 text-purple-300 border border-neonPurple/30">
                            Бөлім ${sec.id} / 7 • ${sec.badge}
                        </span>
                        <div class="flex items-center gap-2">
                            <button type="button" onclick="prevLectureSection()" ${currentLectureIndex === 0 ? 'disabled' : ''} class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-xs text-slate-200 transition">
                                <i class="fa-solid fa-arrow-left"></i> Алдыңғы
                            </button>
                            <button type="button" onclick="nextLectureSection()" ${currentLectureIndex === lectureSections.length - 1 ? 'disabled' : ''} class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-xs text-slate-200 transition">
                                Келесі <i class="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>

                    <h3 class="text-xl sm:text-2xl font-bold text-white leading-snug">${sec.title}</h3>

                    <p class="text-sm sm:text-base text-slate-200 leading-relaxed bg-white/5 p-4 rounded-2xl border-l-4 border-l-neonCyan">
                        ${sec.summary}
                    </p>

                    <div class="space-y-3">
                        ${sec.details.map(d => `<p class="text-sm text-slate-300 leading-relaxed">${d}</p>`).join('')}
                    </div>

                    <!-- Practical Example Box -->
                    <div class="p-4 rounded-2xl bg-neonPurple/10 border border-neonPurple/30 text-xs sm:text-sm text-purple-200">
                        <i class="fa-solid fa-lightbulb text-amber-400 mr-1.5"></i> ${sec.example}
                    </div>
                </div>

                <!-- Key Terms Footer -->
                <div class="pt-5 mt-6 border-t border-white/10">
                    <span class="text-xs font-semibold text-slate-400 block mb-2">Негізгі терминдер:</span>
                    <div class="flex flex-wrap gap-2">
                        ${sec.terms.map(t => `<span class="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-xs font-medium text-neonCyan"># ${t}</span>`).join('')}
                    </div>
                </div>
            `;
        }

        function selectLectureSection(index) {
            currentLectureIndex = index;
            renderLectureTabs();
            renderLectureContent();
        }
        function prevLectureSection() {
            if (currentLectureIndex > 0) selectLectureSection(currentLectureIndex - 1);
        }
        function nextLectureSection() {
            if (currentLectureIndex < lectureSections.length - 1) selectLectureSection(currentLectureIndex + 1);
        }

        // =========================================================
        // 3. TTS INTERACTIVE SIMULATOR
        // =========================================================
        const ttsSamples = [
            "Сәлеметсіздер ме! Бүгін біз генеративті жасанды интеллект және синтетикалық медиа технологияларының болашағын талқылаймыз.",
            "Нейрондық вокодерлер мәтіндік фонемаларды адам дауысынан айыру қиын болатын табиғи дыбыс толқындарына айналдырады.",
            "Қош келдіңіз! Мен сіздің цифрлық оқу ассистентіңізбін. Дәріс материалдарын меңгеруге дайынсыз ба?"
        ];

        // Generate 24 waveform bars
        const waveContainer = document.getElementById('waveform-container');
        for (let i = 0; i < 24; i++) {
            const bar = document.createElement('div');
            bar.className = 'wave-bar';
            bar.style.animationDelay = `${(i % 7) * 0.1}s`;
            waveContainer.appendChild(bar);
        }

        function setTTSSample(idx) {
            const input = document.getElementById('tts-input');
            input.value = ttsSamples[idx];
            updatePhonemePreview(ttsSamples[idx]);
        }

        function updatePhonemePreview(text) {
            const clean = text.trim().toLowerCase().slice(0, 42);
            const pseudoPhonemes = clean
                .replace(/ә/g, 'æ').replace(/ө/g, 'ø').replace(/ү/g, 'y')
                .replace(/қ/g, 'q').replace(/ғ/g, 'ʁ').replace(/ң/g, 'ŋ')
                .replace(/і/g, 'ɪ').replace(/ұ/g, 'ʊ').split('').join(' ');
            document.getElementById('phoneme-preview').textContent = `/${pseudoPhonemes || '...'}/`;
        }

        document.getElementById('tts-input').addEventListener('input', (e) => {
            updatePhonemePreview(e.target.value);
        });

        let ttsTimer = null;
        let ttsSession = 0;
        let activeUtterance = null;

        function availableVoice() {
            if (!('speechSynthesis' in window)) return null;
            const voices = speechSynthesis.getVoices();
            return voices.find(v => /^kk(?:-|_|$)/i.test(v.lang)) || voices.find(v => /^ru(?:-|_|$)/i.test(v.lang)) || voices[0] || null;
        }
        function refreshVoiceStatus() {
            const voice = availableVoice();
            const kazakh = voice && /^kk(?:-|_|$)/i.test(voice.lang);
            document.getElementById('tts-engine-badge').textContent = voice ? (kazakh ? 'Қазақша дауыс қолжетімді' : 'Құрылғы дауысы: ' + voice.lang) : 'Дауыс қолжетімсіз';
            document.getElementById('tts-voice-note').textContent = voice ? (kazakh ? 'Қазақша дауыс таңдалды: ' + voice.name : 'Қазақша дауыс табылмады. Таңдалған дауыс: ' + voice.name + ' (' + voice.lang + '). Қазақша айтылым дәл болмауы мүмкін.') : 'Бұл құрылғыда дыбыстау дауысы табылмады. Дауыс пакетін қосып немесе басқа браузерде ашып көріңіз.';
        }
        function finishTTS(message) {
            clearTimeout(ttsTimer);
            ttsTimer = null;
            activeUtterance = null;
            waveContainer.classList.remove('wave-active');
            document.getElementById('tts-status-text').textContent = message;
            document.getElementById('tts-play-btn').disabled = false;
        }
        function stopTTS() {
            ++ttsSession;
            if ('speechSynthesis' in window) speechSynthesis.cancel();
            finishTTS('Күту режимі');
        }
        function playTTS() {
            const text = document.getElementById('tts-input').value.trim();
            if (!text) { showToast('Алдымен дыбысталатын мәтін енгізіңіз!', 'warning'); return false; }
            stopTTS();
            const voice = availableVoice();
            refreshVoiceStatus();
            if (!voice || !('SpeechSynthesisUtterance' in window)) {
                finishTTS('Дыбыстау қолжетімсіз');
                showToast('Құрылғыда дыбыстау қызметі қолжетімсіз.', 'warning');
                return false;
            }
            updatePhonemePreview(text);
            const session = ++ttsSession;
            const rate = parseFloat(document.getElementById('tts-rate').value);
            let pitch = parseFloat(document.getElementById('tts-pitch').value);
            const style = document.getElementById('tts-style').value;
            if (style === 'deep') pitch = Math.max(0.6, pitch - 0.25);
            if (style === 'energetic') pitch = Math.min(1.5, pitch + 0.15);
            activeUtterance = new SpeechSynthesisUtterance(text);
            activeUtterance.voice = voice;
            activeUtterance.lang = voice.lang;
            activeUtterance.rate = rate;
            activeUtterance.pitch = pitch;
            activeUtterance.onstart = () => {
                if (session !== ttsSession) return;
                clearTimeout(ttsTimer);
                waveContainer.classList.add('wave-active');
                document.getElementById('tts-status-text').textContent = 'Дыбысталып жатыр…';
            };
            activeUtterance.onend = () => { if (session === ttsSession) finishTTS('Тыңдау аяқталды'); };
            activeUtterance.onerror = () => { if (session === ttsSession) finishTTS('Дыбыстау орындалмады. Қайта көріңіз.'); };
            document.getElementById('tts-status-text').textContent = 'Дауыс дайындалуда…';
            document.getElementById('tts-play-btn').disabled = true;
            ttsTimer = setTimeout(() => {
                if (session !== ttsSession) return;
                stopTTS();
                finishTTS('Дауыс қызметі жауап бермеді.');
            }, 12000);
            speechSynthesis.speak(activeUtterance);
            return true;
        }
        if ('speechSynthesis' in window) speechSynthesis.addEventListener('voiceschanged', refreshVoiceStatus);
        refreshVoiceStatus();
        window.addEventListener('pagehide', stopTTS);

        // =========================================================
        // 4. DIGITAL AVATAR INTERACTIVE MODULE
        // =========================================================
        const avatarQA = [
            "Lip-sync (ерін синхронизациясы) нейрожелілер арқылы дыбыстық толқындағы әрбір фонеманы (мысалы, «А», «О», «М», «П» дыбыстарын) талдап, оған сәйкес виземаларды — яғни ерін мен жақтың визуалды пішіндерін кадр сайын генерациялайды.",
            "Мимика мен ым-ишараны жасау үшін ЖИ беттің 68-ден 478-ге дейінгі тірек нүктелерін (Facial Landmarks) және Blendshapes параметрлерін пайдаланады. Дауыс интонациясы көтерілгенде қас қозғалысы мен бас изеу автоматты түрде үйлестіріледі.",
            "Цифрлық аватар жасау 4 кезеңнен тұрады: 1) Эталондық бейне немесе 3D сканерлеу арқылы сыртқы келбетті цифрландыру; 2) Дауыс моделін клондау (TTS); 3) LLM арқылы интеллектуалды білім базасын қосу; 4) Нақты уақыттағы рендеринг және Lip-sync.",
            "Бүгінде цифрлық аватарлар онлайн университеттерде көптілді бейнедәрістер жүргізуде, банктерде тәулік бойы виртуалды кеңесші ретінде және телеарналарда ауа райы мен жаңалықтар жүргізушісі ретінде қолданылады."
        ];

        let avatarSpeakTimer = null;

        function askAvatar(index) {
            const responseEl = document.getElementById('avatar-response-text');
            const stageEl = document.getElementById('avatar-stage');
            const badgeEl = document.getElementById('avatar-state-badge');

            // Highlight selected button
            document.querySelectorAll('.avatar-q-btn').forEach((btn, idx) => {
                if (idx === index) {
                    btn.classList.add('border-neonCyan', 'bg-neonCyan/15');
                } else {
                    btn.classList.remove('border-neonCyan', 'bg-neonCyan/15');
                }
            });

            const fullText = avatarQA[index];
            responseEl.textContent = "";
            stageEl.classList.add('avatar-speaking');
            badgeEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-neonCyan animate-ping"></span> Аватар түсіндіруде...`;

            if (avatarSpeakTimer) clearInterval(avatarSpeakTimer);

            let charIdx = 0;
            avatarSpeakTimer = setInterval(() => {
                responseEl.textContent += fullText[charIdx];
                charIdx++;
                if (charIdx >= fullText.length) {
                    clearInterval(avatarSpeakTimer);
                    stageEl.classList.remove('avatar-speaking');
                    badgeEl.innerHTML = `<i class="fa-solid fa-check text-emerald-400"></i> Түсіндірме аяқталды`;
                }
            }, 22);
        }

        function speakAvatarResponse() {
            const text = document.getElementById('avatar-response-text').textContent;
            document.getElementById('tts-input').value = text;
            if (playTTS()) showToast("Аватар жауабы дыбыстауға жіберілді", "info");
        }

        // =========================================================
        // 6. MEDIA LITERACY CHECKLIST & MINI-TRAINER
        // =========================================================
        function updateChecklist() {
            const checkboxes = document.querySelectorAll('#verification-checklist input[type="checkbox"]');
            let checkedCount = 0;
            checkboxes.forEach(cb => { if (cb.checked) checkedCount++; });

            document.getElementById('checklist-progress').textContent = `${checkedCount} / 5 тексерілді`;
            const verdict = document.getElementById('checklist-verdict');

            verdict.className = "mt-5 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300";
            verdict.textContent = checkedCount === 5
                ? '5 қадам тексерілді. Қорытындыны бастапқы дереккөз бен тәуелсіз растауға сүйеніп жасаңыз. Белгіленген қадам саны медианың шынайылығын анықтамайды.'
                : `${checkedCount} / 5 қадам тексерілді. Күмәнді белгілерді дереккөз және контекстпен бірге бағалаңыз. Бұл чек-лист автоматты deepfake детекторы емес.`;
        }

        const quizCases = [
            {
                category: "Бейне верификация кейсі",
                scenario: "Танымал қаржы сарапшысы видеода «бүгін ғана ашылған құпия инвестициялық платформаға ақша салыңыз» деп шақырады. Бейнеде спикер 40 секунд бойы мүлде көзін жыпылықтатпайды, ал басын бұрғанда құлағының жиегі бұлдырап көрінеді.",
                isFake: true,
                explanation: "Дұрыс талдау: Бұл — Deepfake алаяқтық! Көз жыпылықтауының болмауы, бет контурының бұлдырауы және шұғыл қаржылық үндеу — синтетикалық бейненің айқын белгілері."
            },
            {
                category: "Аудио қоңырау кейсі",
                scenario: "Студентке «деканаттан» қоңырау шалып, тура бастығының дауысымен шұғыл түрде белгісіз шотқа төлем жасауды сұрайды. Дауыс тембрі ұқсас, бірақ сөйлем арасында тыныс алу дыбысы жоқ және сұрақтарға жауап беруде 2 секундтық роботтық кідіріс бар.",
                isFake: true,
                explanation: "Дұрыс талдау: Бұл — Voice Cloning (дауысты клондау) арқылы жасалған вишинг шабуылы. Нақты уақыттағы TTS генерациясы кідіріс пен монотонды интонация береді."
            },
            {
                category: "Ресми баспасөз релизі",
                scenario: "Университеттің ресми сайтында және верификацияланған YouTube арнасында жарияланған сұхбатта ректордың бетіндегі жарық пен артқы фондағы терезе көлеңкесі сәйкес келеді, мимикасы табиғи және файл метадеректерінде бастапқы камера моделі сақталған.",
                isFake: false,
                explanation: "Дұрыс талдау: Бұл — шынайы түпнұсқа бейне. Ресми дереккөз, табиғи жарық физикасы және өзгертілмеген EXIF/метадеректер контенттің түпнұсқалығын растайды."
            },
            {
                category: "Әлеуметтік желідегі фотосурет",
                scenario: "Желіде «Ежелгі қала орнынан табылған ерекше жәдігер» деген тақырыппен фото тарады. Суретті үлкейткенде жәдігердегі ою-өрнектер асимметриялы балқып кеткен, ал артқы пландағы адамдардың саусақтары 6-дан көрінеді.",
                isFake: true,
                explanation: "Дұрыс талдау: Бұл — диффузиялық модель (Text-to-Image) арқылы генерацияланған фейк сурет. Ұсақ бөлшектердің (саусақтар, мәтін, симметриялы оюлар) бұрмалануы — ЖИ-дің тән қателігі."
            }
        ];

        let currentQuizIdx = 0;
        let quizScore = 0;
        let quizAnswered = false;

        function renderQuiz() {
            const q = quizCases[currentQuizIdx];
            document.getElementById('quiz-counter').textContent = `Кейс ${currentQuizIdx + 1} / ${quizCases.length}`;
            document.getElementById('quiz-category').textContent = q.category;
            document.getElementById('quiz-scenario').textContent = q.scenario;
            document.getElementById('quiz-feedback').classList.add('hidden');
            quizAnswered = false;
            document.getElementById('next-quiz-btn').disabled = true;
        }

        function answerQuiz(userThinksFake) {
            if (quizAnswered) {
                showToast("Бұл кейске жауап берілді. «Келесі кейс» батырмасын басыңыз.", "info");
                return;
            }
            quizAnswered = true;
            document.getElementById('next-quiz-btn').disabled = false;
            const q = quizCases[currentQuizIdx];
            const isCorrect = userThinksFake === q.isFake;
            const feedbackEl = document.getElementById('quiz-feedback');

            if (isCorrect) {
                quizScore++;
                document.getElementById('quiz-score').textContent = quizScore;
                feedbackEl.className = "mt-4 p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/15 text-emerald-200 text-xs sm:text-sm leading-relaxed";
                feedbackEl.innerHTML = `<i class="fa-solid fa-circle-check mr-1.5"></i> <strong>Дұрыс!</strong> ${q.explanation}`;
            } else {
                feedbackEl.className = "mt-4 p-4 rounded-2xl border border-rose-500/40 bg-rose-500/15 text-rose-200 text-xs sm:text-sm leading-relaxed";
                feedbackEl.innerHTML = `<i class="fa-solid fa-circle-xmark mr-1.5"></i> <strong>Қате талдау.</strong> ${q.explanation}`;
            }
            feedbackEl.classList.remove('hidden');
        }

        function nextQuiz() {
            if (!quizAnswered) return;
            if (currentQuizIdx < quizCases.length - 1) {
                currentQuizIdx++;
                renderQuiz();
            } else {
                showToast(`Тренажер аяқталды! Сіздің нәтижеңіз: ${quizScore} / ${quizCases.length}`, "success");
            }
        }

        function resetQuiz() {
            currentQuizIdx = 0;
            quizScore = 0;
            document.getElementById('quiz-score').textContent = '0';
            renderQuiz();
        }

        // =========================================================
        // 7. PRACTICUM REPORT BUILDER & RUBRIC MODAL
        // =========================================================
        function toggleRubricModal() {
            document.getElementById('rubric-modal').classList.toggle('hidden');
        }

        function selectTaskLevel(levelText) {
            const select = document.getElementById('task-level-select');
            select.value = levelText;
            select.scrollIntoView({ behavior: 'smooth', block: 'center' });
            showToast(`Таңдалды: ${levelText}`, "info");
        }

        function fillDemoReport() {
            document.getElementById('student-name').value = "Айдана Серікқызы";
            document.getElementById('student-group').value = "Медиа-302";
            document.getElementById('task-level-select').value = "Орта деңгей: TTS және Аватар сценарийі";
            document.getElementById('student-work').value = "[00:00-00:15] (Аватар сәлемдесу мимикасы, жылы интонация): Сәлеметсіздер ме! Бүгінгі бейнесабақта біз синтетикалық медианы C2PA стандарты арқылы қалай тексеруге болатынын үйренеміз. [Кідіріс: 1 сек].\n[00:15-00:35] (Экранда инфографика көрсетіледі, дикторлық екпін): Кез келген күмәнді видеоны көргенде ең алдымен жарық көзі мен дыбыс ырғағына назар аударыңыз.";
            document.getElementById('student-conclusion').value = "Бейнеролик соңында «Контент генеративті ЖИ (TTS және цифрлық аватар) көмегімен жасалды» деген этикалық ескертпе қосылды.";
            generateStudentReport();
        }

        function generateStudentReport() {
            const name = document.getElementById('student-name').value.trim();
            const group = document.getElementById('student-group').value.trim();
            const level = document.getElementById('task-level-select').value;
            const work = document.getElementById('student-work').value.trim();
            const conclusion = document.getElementById('student-conclusion').value.trim();

            if (!name || !group || !work || !conclusion) {
                showToast("Барлық міндетті өрістерді (*) толтырыңыз!", "warning");
                return;
            }

            const dateStr = new Date().toLocaleDateString('kk-KZ');
            const formattedReport = `==================================================
11-АПТА: СИНТЕТИКАЛЫҚ МЕДИА ЖӘНЕ ГЕНЕРАТИВТІ ЖИ
ПРАКТИКАЛЫҚ ЖҰМЫС ЕСЕБІ
==================================================
Студент: ${name}
Тобы: ${group}
Күні: ${dateStr}
Тапсырма деңгейі: ${level}

1. ОРЫНДАЛҒАН ТАПСЫРМА МАЗМҰНЫ:
${work}

2. ЭТИКАЛЫҚ ЕСКЕРТПЕ ЖӘНЕ ҚОРЫТЫНДЫ:
${conclusion}

[Жүйелік тексеру статусы: Құрылымы толық • Тапсыруға дайын]
==================================================`;

            document.getElementById('report-output').textContent = formattedReport;
            const badge = document.getElementById('report-quality-badge');
            badge.textContent = "Тексерілді • Дайын";
            badge.className = "text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
            showToast("Есеп сәтті құрастырылды!", "success");
        }

        function copyReportToClipboard() {
            const text = document.getElementById('report-output').textContent;
            const tempArea = document.createElement('textarea');
            tempArea.value = text;
            document.body.appendChild(tempArea);
            tempArea.select();
            try {
                if (!document.execCommand('copy')) throw new Error('Copy unavailable');
                showToast("Есеп мәтіні алмасу буферіне көшірілді!", "success");
            } catch (err) {
                showToast("Көшіру мүмкін болмады, қолмен белгілеп көшіріңіз.", "warning");
            }
            document.body.removeChild(tempArea);
        }

        // Initialize Components on Load
        window.addEventListener('DOMContentLoaded', () => {
            renderLectureTabs();
            renderLectureContent();
            renderQuiz();
        });
    
        let rubricOpener = null;
        function toggleRubricModal() {
            const modal = document.getElementById('rubric-modal');
            const opening = modal.classList.contains('hidden');
            modal.classList.toggle('hidden', !opening);
            document.body.style.overflow = opening ? 'hidden' : '';
            if (opening) { rubricOpener = document.activeElement; modal.querySelector('button').focus(); }
            else if (rubricOpener) rubricOpener.focus();
        }
        document.addEventListener('keydown', event => {
            const modal = document.getElementById('rubric-modal');
            if (modal.classList.contains('hidden')) return;
            if (event.key === 'Escape') toggleRubricModal();
            if (event.key === 'Tab') {
                const buttons = modal.querySelectorAll('button');
                const first = buttons[0], last = buttons[buttons.length - 1];
                if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
                if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
            }
        });
        document.getElementById('rubric-modal').addEventListener('click', event => {
            if (event.target.id === 'rubric-modal') toggleRubricModal();
        });
