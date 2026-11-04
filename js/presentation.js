/**
 * Capacitação Executiva em Segurança da Informação e Conscientização Digital
 * Engine Interativa em JavaScript Puro
 */

(function () {
  'use strict';

  // Metadados dos 11 Módulos
  const modulesMeta = [
  {
    "id": 1,
    "num": "01",
    "title": "Fundamentos da Segurança da Informação",
    "startSlide": 2,
    "endSlide": 4,
    "quizSlide": 4
  },
  {
    "id": 2,
    "num": "02",
    "title": "Engenharia Social: A Arte da Manipulação",
    "startSlide": 5,
    "endSlide": 8,
    "quizSlide": 8
  },
  {
    "id": 3,
    "num": "03",
    "title": "Golpes Digitais: Phishing, Smishing e Links",
    "startSlide": 9,
    "endSlide": 11,
    "quizSlide": 11
  },
  {
    "id": 4,
    "num": "04",
    "title": "Senhas Fortes, Cofres e Autenticação",
    "startSlide": 12,
    "endSlide": 14,
    "quizSlide": 14
  },
  {
    "id": 5,
    "num": "05",
    "title": "Segurança com Inteligência Artificial",
    "startSlide": 15,
    "endSlide": 17,
    "quizSlide": 17
  },
  {
    "id": 6,
    "num": "06",
    "title": "Malwares, Ransomware e Ameaças",
    "startSlide": 18,
    "endSlide": 20,
    "quizSlide": 20
  },
  {
    "id": 7,
    "num": "07",
    "title": "Trabalho Híbrido, Home Office e Wi-Fi",
    "startSlide": 21,
    "endSlide": 23,
    "quizSlide": 23
  },
  {
    "id": 8,
    "num": "08",
    "title": "Proteção de Dados, LGPD e Privacidade",
    "startSlide": 24,
    "endSlide": 26,
    "quizSlide": 26
  },
  {
    "id": 9,
    "num": "09",
    "title": "Segurança Física no Escritório e Mídias",
    "startSlide": 27,
    "endSlide": 29,
    "quizSlide": 29
  },
  {
    "id": 10,
    "num": "10",
    "title": "Resposta a Incidentes e Notificação",
    "startSlide": 30,
    "endSlide": 32,
    "quizSlide": 32
  },
  {
    "id": 11,
    "num": "11",
    "title": "Avaliação Final e Certificação",
    "startSlide": 33,
    "endSlide": 34,
    "quizSlide": null
  }
];

  // Estado da Aplicação
  const state = {
    currentSlide: 1,
    totalSlides: 34,
    maxDemoSlide: 8, // Slides 1 a 8 liberados na demonstração (Módulos 01 e 02)
    isUnlocked: false,
    isGestor: false,
    intendedSlide: null,
    validAccessHashes: [
      '085301361b7d9548d2916efbed814b03cce46e6de7496dc04cc83f8aa6618b84', // CYBER-EXEC-8492-PRO
      '18d37b403c70c6b36a3f77092e3e5ec148b6bd662f3ff3ebc8b250f723c4e8d5', // CYBEREXEC8492PRO
      '0cedb0f9a64a63b1af95a6364dbaf49950293a82a9e32ea1cfc824c637f63595', // SEC-2026-VIP-9741
      '4324d6bbee7f0836b80cc736fa81ec7ee78f6e0d879c33d6c3e2cb5f4610ae14', // SEC2026VIP9741
      '667dd167ca25703d48208f61810399ea00d671ec39ec8c05e32ac499c09ce92a', // CYBER-PRO-2026-X9K
      '31f76bd6e275f2a0b9f7c17c93bd2af763ae933b2f8ca1e042bf69a7dd4a1c1d', // CYBERPRO2026X9K
      '8c8c1fee9a2fec548c42cf5915d272d7bf638df3241d62d7a9ce7467d4ed5404', // ALUNO-CYBER-8842
      '142d97345d0069ccd1d3a6deb8542fea5f8205f33d46b9a1d376370c1152fe5b'  // ALUNOCYBER8842
    ],
    isFullscreen: false,
    isOverviewOpen: false,
    isHelpOpen: false,
    isCardZoomOpen: false,
    isModulesDrawerOpen: false,
    isPaywallOpen: false,
    isUnlockModalOpen: false,
    toastTimer: null,
    quizzes: {},
    studentName: 'Colaborador(a) Exemplar',
    studentCpf: '000.000.000-00',
    touchStartX: 0,
    touchStartY: 0,
    touchEndX: 0,
    touchEndY: 0,
  };

  // Elementos do DOM
  const dom = {
    slides: document.querySelectorAll('.slide'),
    progressBar: document.getElementById('top-progress-bar'),
    currentNum: document.querySelector('.current-num'),
    totalNum: document.querySelector('.total-num'),
    prevBtn: document.getElementById('btn-prev'),
    nextBtn: document.getElementById('btn-next'),
    fullscreenBtn: document.getElementById('btn-fullscreen'),
    overviewBtn: document.getElementById('btn-overview'),
    helpBtn: document.getElementById('btn-help'),
    themeBtn: document.getElementById('btn-theme'),
    modulesBtn: document.getElementById('btn-modules'),
    dotsContainer: document.getElementById('dock-dots-container'),
    overviewModal: document.getElementById('overview-modal'),
    helpModal: document.getElementById('help-modal'),
    closeOverviewBtn: document.getElementById('close-overview-btn'),
    closeHelpBtn: document.getElementById('close-help-btn'),
    overviewGrid: document.getElementById('overview-grid'),
    cardZoomModal: document.getElementById('card-zoom-modal'),
    cardZoomContainer: document.getElementById('card-zoom-container'),
    cardZoomContent: document.getElementById('card-zoom-content'),
    cardZoomCloseBtn: document.getElementById('card-zoom-close-btn'),
    modulesDrawer: document.getElementById('modules-drawer'),
    drawerBackdrop: document.getElementById('drawer-backdrop'),
    closeDrawerBtn: document.getElementById('close-drawer-btn'),
    drawerModulesContainer: document.getElementById('drawer-modules-container'),
    drawerProgressPercent: document.getElementById('drawer-progress-percent'),
    drawerProgressBar: document.getElementById('drawer-progress-bar'),
    certStudentNameInput: document.getElementById('cert-student-name'),
    certStudentCpfInput: document.getElementById('cert-student-cpf'),
    certDisplayName: document.getElementById('cert-display-name'),
    certDisplayCpf: document.getElementById('cert-display-cpf'),
    certAuthCode: document.getElementById('cert-auth-code'),
    statModulesCompleted: document.getElementById('stat-modules-completed'),
    statScorePercent: document.getElementById('stat-score-percent'),
    paywallModal: document.getElementById('paywall-modal'),
    closePaywallBtn: document.getElementById('close-paywall-btn'),
    btnPaywallEnterKey: document.getElementById('btn-paywall-enter-key'),
    unlockModal: document.getElementById('unlock-modal'),
    closeUnlockBtn: document.getElementById('close-unlock-btn'),
    formUnlockKey: document.getElementById('form-unlock-key'),
    inputUnlockKey: document.getElementById('input-unlock-key'),
    btnSubmitUnlock: document.getElementById('btn-submit-unlock'),
    unlockStatusMsg: document.getElementById('unlock-status-msg'),
    btnHeaderUnlock: document.getElementById('btn-header-unlock'),
    accessBadgeText: document.getElementById('access-badge-text'),
    badgeActionLabel: document.getElementById('badge-action-label'),
    courseToast: document.getElementById('course-toast')
  };

  /**
   * Inicialização
   */
  function init() {
    state.totalSlides = dom.slides.length || 34;
    if (dom.totalNum) dom.totalNum.textContent = String(state.totalSlides).padStart(2, '0');

    // Carrega dados salvos em localStorage
    loadSavedProgress();

    // Verifica se há token de acesso na URL ou chave salva
    checkAccessState();

    buildDots();
    buildOverviewGrid();
    setupImageHandlers();
    setupCardZoom();
    setupQuizzes();
    setupCertificate();
    renderModulesDrawer();
    updateDashboardStats();

    // Lê slide da URL hash se existir (#1 a #34)
    const hash = window.location.hash.replace('#', '');
    const initialSlide = parseInt(hash, 10);
    if (!isNaN(initialSlide) && initialSlide >= 1 && initialSlide <= state.totalSlides) {
      goToSlide(initialSlide, false);
    } else {
      goToSlide(1, false);
    }

    bindEvents();
  }

  /**
   * Carrega progresso do aluno do localStorage
   */
  function loadSavedProgress() {
    try {
      const savedQuizzes = localStorage.getItem('cybersec_quizzes');
      if (savedQuizzes) state.quizzes = JSON.parse(savedQuizzes);

      const savedName = localStorage.getItem('cybersec_student_name');
      if (savedName && !savedName.toLowerCase().includes('claudinei')) {
        state.studentName = savedName;
      }
      const savedCpf = localStorage.getItem('cybersec_student_cpf');
      if (savedCpf) state.studentCpf = savedCpf;
    } catch (e) {
      console.warn('Não foi possível acessar localStorage:', e);
    }
  }

  /**
   * Salva progresso no localStorage
   */
  function saveProgress() {
    try {
      localStorage.setItem('cybersec_quizzes', JSON.stringify(state.quizzes));
      localStorage.setItem('cybersec_student_name', state.studentName);
      localStorage.setItem('cybersec_student_cpf', state.studentCpf || '');
    } catch (e) {
      console.warn('Erro ao salvar no localStorage:', e);
    }
  }

  /**
   * Cria os pontos indicadores na barra inferior
   */
  function buildDots() {
    if (!dom.dotsContainer) return;
    dom.dotsContainer.innerHTML = '';
    for (let i = 1; i <= state.totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = 'dock-dot' + (i === state.currentSlide ? ' active' : '');
      dot.title = `Ir para o slide ${i}`;
      dot.setAttribute('data-target', i);
      dot.addEventListener('click', () => goToSlide(i));
      dom.dotsContainer.appendChild(dot);
    }
  }

  /**
   * Constrói a grade do modal de visão geral
   */
  function buildOverviewGrid() {
    if (!dom.overviewGrid) return;
    dom.overviewGrid.innerHTML = '';

    dom.slides.forEach((slide, index) => {
      const slideNum = index + 1;
      const titleElem = slide.querySelector('.slide-title');
      const categoryElem = slide.querySelector('.slide-category');

      const isLocked = !state.isUnlocked && slideNum > state.maxDemoSlide;
      const card = document.createElement('div');
      card.className = 'overview-card' + (slideNum === state.currentSlide ? ' active' : '') + (isLocked ? ' locked-card' : '');
      card.setAttribute('data-target', slideNum);

      const numSpan = document.createElement('span');
      numSpan.className = 'card-num';
      numSpan.textContent = isLocked ? `🔒 SLIDE ${String(slideNum).padStart(2, '0')}` : `SLIDE ${String(slideNum).padStart(2, '0')}`;

      const nameSpan = document.createElement('span');
      nameSpan.className = 'card-name';
      const rawText = titleElem ? (titleElem.textContent || titleElem.innerText || '') : `Slide ${slideNum}`;
      nameSpan.textContent = rawText.replace(/\s+/g, ' ').trim();

      card.appendChild(numSpan);
      card.appendChild(nameSpan);

      card.addEventListener('click', () => {
        if (isLocked) {
          toggleOverviewModal(false);
          openPaywallModal(slideNum);
        } else {
          goToSlide(slideNum);
          toggleOverviewModal(false);
        }
      });

      dom.overviewGrid.appendChild(card);
    });
  }

  /**
   * Renderiza a lista de Módulos no Drawer Lateral
   */
  function renderModulesDrawer() {
    if (!dom.drawerModulesContainer) return;
    dom.drawerModulesContainer.innerHTML = '';

    let completedModulesCount = 0;
    const totalCoreModules = 10;

    modulesMeta.forEach(mod => {
      const isQuizDone = mod.quizSlide ? (state.quizzes[mod.id] && state.quizzes[mod.id].correct) : false;
      const isCurrentMod = state.currentSlide >= mod.startSlide && state.currentSlide <= mod.endSlide;
      const isLocked = !state.isUnlocked && mod.id > 2;
      if (isQuizDone) completedModulesCount++;

      const card = document.createElement('div');
      card.className = 'drawer-module-card' + (isCurrentMod ? ' active-mod' : '') + (isLocked ? ' drawer-module-locked' : '');

      let statusHtml = '<span class="drawer-module-status">⚪ Em aberto</span>';
      if (isLocked) {
        statusHtml = '<span class="drawer-module-locked-tag">🔒 Alunos</span>';
      } else if (mod.id === 11) {
        statusHtml = '<span class="drawer-module-status completed">★ Certificação</span>';
      } else if (isQuizDone) {
        statusHtml = '<span class="drawer-module-status completed">✅ Concluído (100%)</span>';
      } else if (isCurrentMod) {
        statusHtml = '<span class="drawer-module-status" style="color: var(--cyan-accent); font-weight: 600;">⏳ Em andamento</span>';
      }

      card.innerHTML = `
        <div class="drawer-module-top">
          <span class="drawer-module-num">MÓDULO ${mod.num}</span>
          ${statusHtml}
        </div>
        <div class="drawer-module-title">${mod.title}</div>
        <div class="drawer-lessons-chips"></div>
      `;

      const chipsContainer = card.querySelector('.drawer-lessons-chips');
      for (let s = mod.startSlide; s <= mod.endSlide; s++) {
        const isQuiz = s === mod.quizSlide;
        const pill = document.createElement('span');
        pill.className = 'drawer-lesson-pill' + (s === state.currentSlide ? ' active' : '') + (isQuiz ? ' quiz-pill' : '');
        if (isQuiz && state.quizzes[mod.id] && state.quizzes[mod.id].correct) {
          pill.classList.add('completed');
        }
        pill.textContent = isQuiz ? `Quiz ${mod.id}` : `Aula ${s}`;
        pill.addEventListener('click', (e) => {
          e.stopPropagation();
          if (isLocked) {
            toggleModulesDrawer(false);
            openPaywallModal(s);
          } else {
            goToSlide(s);
            toggleModulesDrawer(false);
          }
        });
        chipsContainer.appendChild(pill);
      }

      card.addEventListener('click', () => {
        if (isLocked) {
          toggleModulesDrawer(false);
          openPaywallModal(mod.startSlide);
        } else {
          goToSlide(mod.startSlide);
          toggleModulesDrawer(false);
        }
      });

      dom.drawerModulesContainer.appendChild(card);
    });

    // Atualiza barra de progresso no Drawer
    const progressPercent = Math.round((completedModulesCount / totalCoreModules) * 100);
    if (dom.drawerProgressPercent) dom.drawerProgressPercent.textContent = `${progressPercent}%`;
    if (dom.drawerProgressBar) dom.drawerProgressBar.style.width = `${progressPercent}%`;
  }

  /**
   * Configuração dos Quizzes Interativos com Seleção, Confirmação, Cancelamento e Zoom
   */
  function setupQuizzes() {
    const quizContainers = document.querySelectorAll('.quiz-container');

    quizContainers.forEach(container => {
      const quizId = parseInt(container.getAttribute('data-quiz-id'), 10);
      const optionButtons = container.querySelectorAll('.quiz-opt-btn');
      const confirmBar = container.querySelector('.quiz-confirm-bar');
      const btnConfirm = confirmBar ? confirmBar.querySelector('.btn-confirm-quiz') : null;
      const btnCancel = confirmBar ? confirmBar.querySelector('.btn-cancel-quiz') : null;

      // Restaura resposta salva se houver
      const saved = state.quizzes[quizId];
      if (saved && saved.answered) {
        applyQuizState(container, saved.selectedIdx, saved.correct);
      }

      optionButtons.forEach((btn, idx) => {
        const zoomBtn = btn.querySelector('.quiz-opt-zoom-btn');

        // 1. Botão de Zoom na alternativa (Sem escolher imediatamente)
        if (zoomBtn) {
          zoomBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openQuizOptionZoom(container, btn, idx);
          });
          zoomBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              openQuizOptionZoom(container, btn, idx);
            }
          });
        }

        // 2. Clique na opção: Apenas seleciona (não confirma de imediato)
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (container.classList.contains('quiz-answered')) return;
          if (e.target.closest('.quiz-opt-zoom-btn')) return;

          selectQuizOption(container, idx);
        });
      });

      // 3. Botão Confirmar Resposta
      if (btnConfirm) {
        btnConfirm.addEventListener('click', (e) => {
          e.stopPropagation();
          if (container.classList.contains('quiz-answered')) return;

          const selectedBtn = container.querySelector('.quiz-opt-btn.selected');
          if (!selectedBtn) return;

          const selIdx = parseInt(selectedBtn.getAttribute('data-opt-idx'), 10);
          const isCorrect = selectedBtn.getAttribute('data-correct') === 'true';

          state.quizzes[quizId] = {
            answered: true,
            correct: isCorrect,
            selectedIdx: selIdx
          };
          saveProgress();

          if (confirmBar) confirmBar.classList.remove('show');
          applyQuizState(container, selIdx, isCorrect);
          renderModulesDrawer();
          updateDashboardStats();
        });
      }

      // 4. Botão Cancelar Escolha
      if (btnCancel) {
        btnCancel.addEventListener('click', (e) => {
          e.stopPropagation();
          cancelQuizSelection(container);
        });
      }
    });
  }

  function selectQuizOption(container, idx) {
    if (container.classList.contains('quiz-answered')) return;
    const optionButtons = container.querySelectorAll('.quiz-opt-btn');
    const confirmBar = container.querySelector('.quiz-confirm-bar');

    optionButtons.forEach((b, i) => {
      b.classList.toggle('selected', i === idx);
    });

    if (confirmBar) {
      confirmBar.classList.add('show');
    }
  }

  function cancelQuizSelection(container) {
    if (container.classList.contains('quiz-answered')) return;
    const optionButtons = container.querySelectorAll('.quiz-opt-btn');
    const confirmBar = container.querySelector('.quiz-confirm-bar');

    optionButtons.forEach(b => b.classList.remove('selected'));
    if (confirmBar) {
      confirmBar.classList.remove('show');
    }
  }

  /**
   * Abre uma alternativa específica no Zoom Modal (~70% da tela)
   */
  function openQuizOptionZoom(container, optionBtn, optIdx) {
    if (!dom.cardZoomModal || !dom.cardZoomContent || !dom.cardZoomContainer) return;

    const slide = container.closest('.slide');
    const slideCat = slide ? slide.querySelector('.slide-category') : null;
    const catText = slideCat ? slideCat.textContent.replace(/\s+/g, ' ').trim() : 'QUIZ INTERATIVO';

    const letterElem = optionBtn.querySelector('.quiz-opt-letter');
    const descElem = optionBtn.querySelector('.quiz-opt-desc');

    const letter = letterElem ? letterElem.textContent.trim() : 'A';
    const text = descElem ? descElem.innerHTML : '';

    dom.cardZoomContainer.className = 'card-modal-container theme-cyan';

    dom.cardZoomContent.innerHTML = `
      <div class="zoomed-header">
        <div class="zoomed-icon cyan" style="font-weight: 800; font-size: 1.4rem;">
          ${letter}
        </div>
        <div class="zoomed-meta">
          <span class="zoomed-tag">${catText} • ALTERNATIVA ${letter}</span>
          <h2 class="zoomed-title">Alternativa ${letter}</h2>
        </div>
      </div>
      <div class="zoomed-body">
        <p style="font-size: clamp(1.2rem, 1.8vw, 1.6rem); line-height: 1.55; color: #f8fafc; font-weight: 500;">
          ${text}
        </p>
      </div>
      <div class="zoomed-quiz-actions">
        <button class="action-pill primary" id="btn-zoom-select-opt" style="padding: 10px 22px; font-weight: 700;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          Selecionar esta Alternativa
        </button>
        <button class="action-pill" onclick="window.PresentationApp.closeCardZoom()" style="padding: 10px 20px;">
          Fechar (Esc)
        </button>
      </div>
    `;

    const btnSelect = dom.cardZoomContent.querySelector('#btn-zoom-select-opt');
    if (btnSelect) {
      btnSelect.addEventListener('click', () => {
        closeCardZoom();
        selectQuizOption(container, optIdx);
      });
    }

    dom.cardZoomModal.classList.add('open');
    dom.cardZoomModal.setAttribute('aria-hidden', 'false');
    state.isCardZoomOpen = true;

    if (dom.cardZoomCloseBtn) {
      dom.cardZoomCloseBtn.focus();
    }
  }

  /**
   * Aplica o estado visual do quiz após confirmação
   */
  function applyQuizState(container, selectedIdx, isCorrect) {
    container.classList.add('quiz-answered');
    const optionButtons = container.querySelectorAll('.quiz-opt-btn');
    const feedbackBox = container.querySelector('.quiz-feedback-box');
    const feedbackTitle = feedbackBox ? feedbackBox.querySelector('.quiz-feedback-title') : null;
    const scoreBadge = feedbackBox ? feedbackBox.querySelector('.quiz-score-badge') : null;

    optionButtons.forEach((b, i) => {
      b.classList.remove('selected');
      b.classList.add('answered');
      const bCorrect = b.getAttribute('data-correct') === 'true';

      if (bCorrect) {
        b.classList.add('correct');
      } else if (i === selectedIdx) {
        b.classList.add('wrong');
      } else {
        b.classList.add('dimmed');
      }
    });

    if (feedbackBox) {
      feedbackBox.className = 'quiz-feedback-box show ' + (isCorrect ? 'correct' : 'wrong');
      if (feedbackTitle) {
        feedbackTitle.innerHTML = isCorrect
          ? '🎉 Resposta Correta! Excelente decisão!'
          : '⚠️ Resposta Incorreta! Atenção aos riscos:';
      }
      if (scoreBadge) {
        scoreBadge.textContent = isCorrect ? '+10 Pontos' : '0 Pontos';
        scoreBadge.style.color = isCorrect ? '#34d399' : '#f87171';
      }
    }
  }

  /**
   * Permite ao aluno refazer um quiz
   */
  function retryQuiz(quizId) {
    const container = document.querySelector(`.quiz-container[data-quiz-id="${quizId}"]`);
    if (!container) return;

    delete state.quizzes[quizId];
    saveProgress();

    container.classList.remove('quiz-answered');
    const optionButtons = container.querySelectorAll('.quiz-opt-btn');
    optionButtons.forEach(b => {
      b.classList.remove('answered', 'correct', 'wrong', 'dimmed', 'selected');
    });

    const confirmBar = container.querySelector('.quiz-confirm-bar');
    if (confirmBar) confirmBar.classList.remove('show');

    const feedbackBox = container.querySelector('.quiz-feedback-box');
    if (feedbackBox) {
      feedbackBox.className = 'quiz-feedback-box';
    }

    renderModulesDrawer();
    updateDashboardStats();
  }

  /**
   * Atualiza as métricas do Slide 33 (Dashboard)
   */
  function updateDashboardStats() {
    let completedQuizzes = 0;
    let totalScore = 0;
    const totalQuizzes = 10;

    for (let i = 1; i <= totalQuizzes; i++) {
      if (state.quizzes[i] && state.quizzes[i].correct) {
        completedQuizzes++;
        totalScore += 10;
      }
    }

    const percent = Math.round((completedQuizzes / totalQuizzes) * 100);

    if (dom.statModulesCompleted) {
      dom.statModulesCompleted.textContent = `${completedQuizzes} / ${totalQuizzes}`;
    }
    if (dom.statScorePercent) {
      dom.statScorePercent.textContent = `${percent}%`;
    }
  }

  /**
   * Configuração do Certificado (Slide 34)
   */
  function setupCertificate() {
    // Configura data atual de conclusão formatada em português
    const certDateElem = document.getElementById('cert-date-display');
    if (certDateElem) {
      try {
        const now = new Date();
        const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        const formattedDate = `${String(now.getDate()).padStart(2, '0')} de ${months[now.getMonth()]} de ${now.getFullYear()}`;
        certDateElem.textContent = formattedDate;
      } catch (err) {
        // Fallback silencioso
      }
    }

    function formatCPF(val) {
      const digits = val.replace(/\D/g, '').slice(0, 11);
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
      if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
    }

    function generateStudentAuthCode(name, cpf) {
      const cleanName = (name || '').trim().toUpperCase();
      const cleanCpf = (cpf || '').replace(/\D/g, '');
      const seed = `${cleanName || 'ALUNO'}|${cleanCpf || '00000000000'}|CYBER-EXEC-2026-AUTH`;
      const hash = sha256(seed).toUpperCase();
      return `SEC-2026-${hash.slice(0, 4)}-${hash.slice(4, 8)}`;
    }

    function updateCertDisplays() {
      const name = (state.studentName || '').trim() || 'Colaborador(a) Exemplar';
      if (dom.certDisplayName) dom.certDisplayName.textContent = name;

      if (dom.certDisplayCpf) {
        const cpf = (state.studentCpf || '').trim();
        if (cpf) {
          dom.certDisplayCpf.textContent = `CPF: ${cpf}`;
          dom.certDisplayCpf.style.display = 'block';
        } else {
          dom.certDisplayCpf.textContent = '';
          dom.certDisplayCpf.style.display = 'none';
        }
      }

      if (dom.certAuthCode) {
        dom.certAuthCode.textContent = generateStudentAuthCode(state.studentName, state.studentCpf);
      }
    }

    if (dom.certStudentNameInput && dom.certDisplayName) {
      dom.certStudentNameInput.value = state.studentName;
      if (dom.certStudentCpfInput) {
        dom.certStudentCpfInput.value = state.studentCpf;
      }
      updateCertDisplays();

      dom.certStudentNameInput.addEventListener('input', (e) => {
        state.studentName = e.target.value;
        updateCertDisplays();
        saveProgress();
      });

      if (dom.certStudentCpfInput) {
        dom.certStudentCpfInput.addEventListener('input', (e) => {
          const formatted = formatCPF(e.target.value);
          e.target.value = formatted;
          state.studentCpf = formatted;
          updateCertDisplays();
          saveProgress();
        });
      }
    }
  }

  /**
   * Reinicia todo o treinamento
   */
  function restartCourse() {
    if (confirm('Deseja realmente reiniciar todo o curso e zerar as respostas dos quizzes?')) {
      state.quizzes = {};
      saveProgress();
      const quizContainers = document.querySelectorAll('.quiz-container');
      quizContainers.forEach(c => {
        c.classList.remove('quiz-answered');
        c.querySelectorAll('.quiz-opt-btn').forEach(b => b.classList.remove('answered', 'correct', 'wrong', 'dimmed'));
        const fb = c.querySelector('.quiz-feedback-box');
        if (fb) fb.className = 'quiz-feedback-box';
      });
      renderModulesDrawer();
      updateDashboardStats();
      goToSlide(1);
    }
  }

  /**
   * Alterna a abertura do Drawer Lateral de Módulos
   */
  function toggleModulesDrawer(force) {
    const shouldOpen = typeof force === 'boolean' ? force : !state.isModulesDrawerOpen;
    state.isModulesDrawerOpen = shouldOpen;

    if (dom.modulesDrawer) {
      if (shouldOpen) {
        dom.modulesDrawer.classList.add('drawer-open');
        renderModulesDrawer();
      } else {
        dom.modulesDrawer.classList.remove('drawer-open');
      }
    }
  }

  /**
   * Alternância de imagens personalizadas
   */
  function setupImageHandlers() {
    dom.slides.forEach((slide, idx) => {
      const slideNum = idx + 1;
      const numStr = String(slideNum).padStart(2, '0');
      const visualContainer = slide.querySelector('.visual-container');
      if (!visualContainer) return;

      const img = visualContainer.querySelector('.external-image');
      const svg = visualContainer.querySelector('.svg-illustration');
      const togglePill = visualContainer.querySelector('.media-toggle-pill');

      if (!img) return;

      const tryImages = [
        `imagens/slide-${numStr}.png`,
        `imagens/slide-${numStr}.jpg`,
        `imagens/slide-${numStr}.jpeg`,
        `imagens/slide-${slideNum}.png`,
        `imagens/slide-${slideNum}.jpg`
      ];

      let attemptIdx = 0;

      function tryNextImage() {
        if (attemptIdx < tryImages.length) {
          img.src = tryImages[attemptIdx];
          attemptIdx++;
        } else {
          img.classList.remove('loaded', 'show');
          if (svg) svg.style.opacity = '1';
          if (togglePill) togglePill.style.display = 'none';
        }
      }

      img.onload = function () {
        img.classList.add('loaded', 'show');
        if (svg) svg.style.opacity = '0';
        if (togglePill) togglePill.style.display = 'inline-flex';
      };

      img.onerror = function () {
        tryNextImage();
      };

      tryNextImage();
    });
  }

  /**
   * Configuração de ampliação interativa dos elementos
   */
  function setupCardZoom() {
    const zoomableSelectors = '.slide-header-block, .info-card, .check-item, .comp-card, .alert-callout, .visual-container, .quiz-scenario-box';
    const allZoomables = document.querySelectorAll(zoomableSelectors);

    allZoomables.forEach(elem => {
      elem.setAttribute('role', 'button');
      elem.setAttribute('tabindex', '0');

      let tooltip = 'Clique para ampliar';
      if (elem.classList.contains('slide-header-block')) tooltip = 'Clique para ampliar o título e introdução';
      else if (elem.classList.contains('visual-container')) tooltip = 'Clique para ampliar o diagrama / ilustração';
      else if (elem.classList.contains('alert-callout')) tooltip = 'Clique para ampliar o aviso de destaque';
      else if (elem.classList.contains('quiz-scenario-box')) tooltip = 'Clique para ampliar o cenário de estudo de caso';
      elem.setAttribute('title', tooltip);

      elem.addEventListener('click', (e) => {
        if (e.target.closest('.media-toggle-pill, .quiz-opt-zoom-btn, .quiz-confirm-bar, button:not(.card-modal-close), a, input')) return;
        openCardZoom(elem);
      });

      elem.addEventListener('keydown', (e) => {
        if (e.target.closest('.media-toggle-pill, .quiz-opt-zoom-btn, .quiz-confirm-bar, button, a, input')) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCardZoom(elem);
        }
      });
    });

    if (dom.cardZoomCloseBtn) {
      dom.cardZoomCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeCardZoom();
      });
    }

    if (dom.cardZoomModal) {
      dom.cardZoomModal.addEventListener('click', (e) => {
        if (e.target === dom.cardZoomModal) {
          closeCardZoom();
        }
      });
    }
  }

  /**
   * Abre qualquer elemento selecionado em modo ampliado (~70% da tela)
   */
  function openCardZoom(elem) {
    if (!dom.cardZoomModal || !dom.cardZoomContent || !dom.cardZoomContainer) return;

    const slide = elem.closest('.slide');
    const slideCategoryElem = slide ? slide.querySelector('.slide-category') : null;
    const slideTitleElem = slide ? slide.querySelector('.slide-title') : null;

    let contextTag = 'SEGURANÇA DA INFORMAÇÃO';
    if (slideCategoryElem) {
      contextTag = slideCategoryElem.textContent.replace(/\s+/g, ' ').trim();
    } else if (slideTitleElem) {
      contextTag = slideTitleElem.textContent.replace(/\s+/g, ' ').trim();
    }

    let titleText = '';
    let descHtml = '';
    let iconHtml = '';
    let theme = 'cyan';

    dom.cardZoomContainer.className = 'card-modal-container';

    if (elem.classList.contains('slide-header-block')) {
      theme = 'cyan';
      const cat = elem.querySelector('.slide-category');
      const title = elem.querySelector('.slide-title');
      const subtitle = elem.querySelector('.slide-subtitle');

      contextTag = cat ? cat.textContent.trim() : 'MÓDULO';
      titleText = title ? title.textContent.trim() : 'Título do Slide';
      descHtml = subtitle ? `<p>${subtitle.innerHTML}</p>` : '';
      iconHtml = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>';
    } else if (elem.classList.contains('quiz-scenario-box')) {
      theme = 'amber';
      titleText = 'Cenário Prático do Estudo de Caso';
      const textElem = elem.querySelector('.quiz-scenario-text');
      descHtml = textElem ? `<p style="font-size: 1.25rem; line-height: 1.6;">${textElem.innerHTML}</p>` : '';
      iconHtml = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
    } else if (elem.classList.contains('visual-container')) {
      theme = 'cyan';
      titleText = 'Diagrama / Ilustração Técnica';
      const svg = elem.querySelector('.svg-illustration');
      const img = elem.querySelector('.external-image');

      if (img && img.classList.contains('show')) {
        descHtml = `<div class="zoomed-media-wrapper"><img src="${img.src}" alt="Ilustração ampliada" class="zoomed-img" /></div>`;
      } else if (svg) {
        descHtml = `<div class="zoomed-media-wrapper">${svg.innerHTML}</div>`;
      }
      iconHtml = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
    } else if (elem.classList.contains('alert-callout')) {
      theme = elem.classList.contains('danger') ? 'rose' : (elem.classList.contains('success') ? 'emerald' : 'amber');
      titleText = 'Alerta de Segurança Crítico';
      const span = elem.querySelector('span');
      descHtml = span ? `<p>${span.innerHTML}</p>` : `<p>${elem.innerHTML}</p>`;
      iconHtml = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
    } else if (elem.classList.contains('info-card')) {
      const cardTitle = elem.querySelector('.card-title');
      const cardDesc = elem.querySelector('.card-desc');
      const cardIcon = elem.querySelector('.card-icon');

      titleText = cardTitle ? cardTitle.textContent.trim() : 'Destaque';
      descHtml = cardDesc ? `<p>${cardDesc.innerHTML}</p>` : '';

      if (cardIcon) {
        iconHtml = cardIcon.innerHTML;
        if (cardIcon.classList.contains('blue')) theme = 'blue';
        else if (cardIcon.classList.contains('emerald')) theme = 'emerald';
        else if (cardIcon.classList.contains('amber')) theme = 'amber';
        else if (cardIcon.classList.contains('rose')) theme = 'rose';
        else if (cardIcon.classList.contains('violet')) theme = 'violet';
        else theme = 'cyan';
      }
    } else if (elem.classList.contains('check-item')) {
      theme = 'emerald';
      const strong = elem.querySelector('strong');
      const p = elem.querySelector('p');

      titleText = strong ? strong.textContent.trim() : 'Diretriz de Segurança';
      descHtml = p ? `<p>${p.innerHTML}</p>` : '';
      iconHtml = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
    }

    dom.cardZoomContainer.classList.add(`theme-${theme}`);

    dom.cardZoomContent.innerHTML = `
      <div class="zoomed-header">
        <div class="zoomed-icon ${theme}">
          ${iconHtml}
        </div>
        <div class="zoomed-meta">
          <span class="zoomed-tag">${contextTag}</span>
          <h2 class="zoomed-title">${titleText}</h2>
        </div>
      </div>
      <div class="zoomed-body">
        ${descHtml}
      </div>
    `;

    dom.cardZoomModal.classList.add('open');
    dom.cardZoomModal.setAttribute('aria-hidden', 'false');
    state.isCardZoomOpen = true;

    if (dom.cardZoomCloseBtn) {
      dom.cardZoomCloseBtn.focus();
    }
  }

  /**
   * Fecha o modal de card ampliado
   */
  function closeCardZoom() {
    if (!dom.cardZoomModal) return;
    dom.cardZoomModal.classList.remove('open');
    dom.cardZoomModal.setAttribute('aria-hidden', 'true');
    state.isCardZoomOpen = false;
  }

  /**
   * Navega para um slide específico
   */
  function goToSlide(slideNum, updateHash = true) {
    if (slideNum < 1) slideNum = 1;
    if (slideNum > state.totalSlides) slideNum = state.totalSlides;

    // Trava de Demonstração / Paywall nos Módulos 03 a 11
    if (!state.isUnlocked && slideNum > state.maxDemoSlide) {
      openPaywallModal(slideNum);
      if (state.currentSlide > state.maxDemoSlide) {
        slideNum = 1;
      } else {
        return;
      }
    }

    if (state.isCardZoomOpen) {
      closeCardZoom();
    }

    state.currentSlide = slideNum;

    dom.slides.forEach((slide, idx) => {
      const idxNum = idx + 1;
      slide.classList.remove('active', 'prev', 'next');
      if (idxNum === slideNum) {
        slide.classList.add('active');
      } else if (idxNum < slideNum) {
        slide.classList.add('prev');
      } else {
        slide.classList.add('next');
      }
    });

    if (dom.currentNum) {
      dom.currentNum.textContent = String(slideNum).padStart(2, '0');
    }

    if (dom.progressBar) {
      const pct = state.totalSlides > 1 ? ((slideNum - 1) / (state.totalSlides - 1)) * 100 : 100;
      dom.progressBar.style.width = `${pct}%`;
    }

    const dots = document.querySelectorAll('.dock-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx + 1 === slideNum);
    });

    // Auto-scroll nos dots
    const activeDot = document.querySelector('.dock-dot.active');
    if (activeDot && dom.dotsContainer) {
      const dotLeft = activeDot.offsetLeft - dom.dotsContainer.offsetLeft;
      dom.dotsContainer.scrollTo({
        left: dotLeft - dom.dotsContainer.clientWidth / 2,
        behavior: 'smooth'
      });
    }

    const overviewCards = document.querySelectorAll('.overview-card');
    overviewCards.forEach((card, idx) => {
      card.classList.toggle('active', idx + 1 === slideNum);
    });

    if (dom.prevBtn) dom.prevBtn.disabled = slideNum === 1;
    if (dom.nextBtn) dom.nextBtn.disabled = slideNum === state.totalSlides;

    if (updateHash) {
      history.replaceState(null, '', `#${slideNum}`);
    }

    // Atualiza status no Drawer
    renderModulesDrawer();
  }

  function nextSlide() {
    if (state.currentSlide < state.totalSlides) {
      goToSlide(state.currentSlide + 1);
    }
  }

  function prevSlide() {
    if (state.currentSlide > 1) {
      goToSlide(state.currentSlide - 1);
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      state.isFullscreen = true;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      state.isFullscreen = false;
    }
  }

  function toggleOverviewModal(force) {
    const shouldOpen = typeof force === 'boolean' ? force : !state.isOverviewOpen;
    state.isOverviewOpen = shouldOpen;

    if (dom.overviewModal) {
      dom.overviewModal.classList.toggle('open', shouldOpen);
      if (shouldOpen) {
        const activeCard = dom.overviewGrid.querySelector('.overview-card.active');
        if (activeCard) activeCard.scrollIntoView({ block: 'nearest' });
      }
    }
  }

  function toggleHelpModal(force) {
    const shouldOpen = typeof force === 'boolean' ? force : !state.isHelpOpen;
    state.isHelpOpen = shouldOpen;

    if (dom.helpModal) {
      dom.helpModal.classList.toggle('open', shouldOpen);
    }
  }

  function toggleTheme() {
    document.body.classList.toggle('light-mode');
  }

  /**
   * Algoritmo Criptográfico SHA-256 para Proteção de Chaves de Acesso
   * Impede que a chave seja visualizada em texto puro no código-fonte ou no DevTools
   */
  function sha256(ascii) {
    function rightRotate(value, amount) { return (value >>> amount) | (value << (32 - amount)); }
    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var lengthProperty = 'length';
    var i, j;
    var result = '';
    var words = [];
    var asciiBitLength = ascii[lengthProperty] * 8;
    var hash = [];
    var k = [];
    var primeCounter = 0;
    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (i = 0; i < 313; i += candidate) { isComposite[i] = candidate; }
        hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
        k[primeCounter++] = (mathPow(candidate, 1/3) * maxWord) | 0;
      }
    }
    ascii += '\x80';
    while (ascii[lengthProperty] % 64 - 56) ascii += '\x00';
    for (i = 0; i < ascii[lengthProperty]; i++) {
      j = ascii.charCodeAt(i);
      if (j >> 8) return '';
      words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
    words[words[lengthProperty]] = (asciiBitLength);
    for (j = 0; j < words[lengthProperty];) {
      var w = words.slice(j, j += 16);
      var oldHash = hash;
      hash = hash.slice(0, 8);
      for (i = 0; i < 64; i++) {
        var w15 = w[i - 15], w2 = w[i - 2];
        var s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
        var s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
        var ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
        var temp1 = hash[7] + (rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25)) + ch + k[i] + (w[i] = (i < 16) ? w[i] : (w[i - 16] + s0 + w[i - 7] + s1) | 0);
        var maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
        var temp2 = (rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22)) + maj;
        hash = [(temp1 + temp2) | 0].concat(hash);
        hash[4] = (hash[4] + temp1) | 0;
      }
      for (i = 0; i < 8; i++) { hash[i] = (hash[i] + oldHash[i]) | 0; }
    }
    for (i = 0; i < 8; i++) {
      for (var i2 = 3; i2 >= 0; i2--) {
        var b = (hash[i] >> (8 * i2)) & 255;
        result += ((b < 16) ? 0 : '') + b.toString(16);
      }
    }
    return result;
  }

  const GESTOR_KEYS = ['GESTOR', 'ADMIN', 'MASTER', 'CYBERMASTER', 'CYBER-MASTER', 'GESTAO', 'DIRETORIA', 'PROFESSOR', 'SUPERADMIN'];

  function isKeyValid(inputKey) {
    if (!inputKey || typeof inputKey !== 'string') return false;
    const cleanKey = inputKey.trim().toUpperCase();
    if (!cleanKey) return false;

    if (GESTOR_KEYS.includes(cleanKey)) return true;

    const hashRaw = sha256(cleanKey);
    const hashNoSeparators = sha256(cleanKey.replace(/[\s\-_]/g, ''));

    return state.validAccessHashes.includes(hashRaw) || state.validAccessHashes.includes(hashNoSeparators);
  }

  /**
   * Controle de Acesso e Modo Demonstração (Opção A + Opção B)
   */
  function checkAccessState() {
    try {
      // 1. Detecção automática de ambiente local (gestor no próprio computador)
      const isLocalEnvironment = window.location.protocol === 'file:' || 
                                 window.location.hostname === 'localhost' || 
                                 window.location.hostname === '127.0.0.1';

      // 2. Verificação via Parâmetro da URL (?gestor, ?admin, ?master, ?gestao, ?acesso=..., ?token=...)
      const urlParams = new URLSearchParams(window.location.search);
      const isGestorParam = urlParams.has('gestor') || urlParams.has('admin') || urlParams.has('master') || urlParams.has('gestao');
      const accessParam = (
        urlParams.get('acesso') ||
        urlParams.get('token') ||
        urlParams.get('aluno') ||
        urlParams.get('key') ||
        ''
      ).trim();

      // Ambiente local ou parâmetro gestor libera automaticamente
      if (isLocalEnvironment || isGestorParam) {
        unlockCourse(false, '', true);
        return;
      }

      if (accessParam && isKeyValid(accessParam)) {
        const isMaster = GESTOR_KEYS.includes(accessParam.toUpperCase());
        unlockCourse(true, isMaster ? '👑 Modo Gestor Ativado! Todos os 34 slides e módulos liberados.' : '🎉 Acesso Completo Ativado via Link! Bem-vindo(a) ao treinamento.', isMaster);
        return;
      }

      // 3. Verificação de Chave/Token persistido em localStorage
      const savedUnlock = localStorage.getItem('cybersec_course_unlocked');
      const savedRole = localStorage.getItem('cybersec_user_role');
      if (savedUnlock === 'true') {
        state.isUnlocked = true;
        if (savedRole === 'gestor') {
          state.isGestor = true;
        }
        updateUnlockUI();
      } else {
        state.isUnlocked = false;
        state.isGestor = false;
        updateUnlockUI();
      }
    } catch (e) {
      console.warn('Erro ao verificar status de acesso:', e);
    }
  }

  function unlockCourse(showFeedbackToast = true, toastMessage = '🎉 Parabéns! Acesso completo liberado com sucesso.', asGestor = false) {
    state.isUnlocked = true;
    if (asGestor) state.isGestor = true;
    try {
      localStorage.setItem('cybersec_course_unlocked', 'true');
      if (state.isGestor) {
        localStorage.setItem('cybersec_user_role', 'gestor');
      }
    } catch (e) {}

    updateUnlockUI();
    buildOverviewGrid();
    renderModulesDrawer();

    if (showFeedbackToast && toastMessage) {
      showToast(toastMessage, 'success');
    }

    closePaywallModal();
    closeUnlockModal();

    if (state.intendedSlide) {
      const target = state.intendedSlide;
      state.intendedSlide = null;
      goToSlide(target);
    }
  }

  function lockCourse() {
    state.isUnlocked = false;
    state.isGestor = false;
    try {
      localStorage.removeItem('cybersec_course_unlocked');
      localStorage.removeItem('cybersec_user_role');
    } catch (e) {}

    updateUnlockUI();
    buildOverviewGrid();
    renderModulesDrawer();
    showToast('Modo demonstração ativado (módulos 3 a 11 bloqueados para teste).', 'info');
    if (state.currentSlide > state.maxDemoSlide) {
      goToSlide(1);
    }
  }

  function updateUnlockUI() {
    if (!dom.btnHeaderUnlock) return;
    if (state.isUnlocked) {
      dom.btnHeaderUnlock.classList.add('unlocked');
      if (state.isGestor) {
        dom.btnHeaderUnlock.classList.add('gestor');
        if (dom.accessBadgeText) dom.accessBadgeText.textContent = '👑 Modo Gestor';
        if (dom.badgeActionLabel) dom.badgeActionLabel.textContent = '• Totalmente Liberado';
        dom.btnHeaderUnlock.title = 'Modo Gestor Ativo: todos os 34 slides e módulos liberados. Clique para opções.';
      } else {
        dom.btnHeaderUnlock.classList.remove('gestor');
        if (dom.accessBadgeText) dom.accessBadgeText.textContent = 'Acesso Completo';
        if (dom.badgeActionLabel) dom.badgeActionLabel.textContent = '✓ Liberado';
        dom.btnHeaderUnlock.title = 'Acesso Completo Liberado (Clique para detalhes)';
      }
    } else {
      dom.btnHeaderUnlock.classList.remove('unlocked', 'gestor');
      if (dom.accessBadgeText) dom.accessBadgeText.textContent = 'Demonstração Gratuita';
      if (dom.badgeActionLabel) dom.badgeActionLabel.textContent = '🔑 Já sou Aluno / Gestor';
      dom.btnHeaderUnlock.title = 'Versão Demo (Módulos 1-2). Clique para inserir chave de acesso ou senha de gestor';
    }
  }

  function openPaywallModal(intendedSlide = null) {
    if (intendedSlide) state.intendedSlide = intendedSlide;
    state.isPaywallOpen = true;
    if (dom.paywallModal) {
      dom.paywallModal.classList.add('open');
      dom.paywallModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closePaywallModal() {
    state.isPaywallOpen = false;
    if (dom.paywallModal) {
      dom.paywallModal.classList.remove('open');
      dom.paywallModal.setAttribute('aria-hidden', 'true');
    }
  }

  function openUnlockModal() {
    state.isUnlockModalOpen = true;
    if (dom.unlockStatusMsg) {
      dom.unlockStatusMsg.textContent = '';
      dom.unlockStatusMsg.className = 'unlock-status-msg';
    }
    if (dom.inputUnlockKey) {
      dom.inputUnlockKey.value = '';
    }
    if (dom.unlockModal) {
      dom.unlockModal.classList.add('open');
      dom.unlockModal.setAttribute('aria-hidden', 'false');
      setTimeout(() => {
        if (dom.inputUnlockKey) dom.inputUnlockKey.focus();
      }, 100);
    }
  }

  function closeUnlockModal() {
    state.isUnlockModalOpen = false;
    if (dom.unlockModal) {
      dom.unlockModal.classList.remove('open');
      dom.unlockModal.setAttribute('aria-hidden', 'true');
    }
  }

  function submitUnlockKey(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!dom.inputUnlockKey) return;

    const rawKey = dom.inputUnlockKey.value.trim();
    if (!rawKey) {
      if (dom.unlockStatusMsg) {
        dom.unlockStatusMsg.textContent = 'Por favor, digite sua chave de acesso.';
        dom.unlockStatusMsg.className = 'unlock-status-msg error';
      }
      dom.inputUnlockKey.focus();
      return;
    }

    if (isKeyValid(rawKey)) {
      const isMaster = GESTOR_KEYS.includes(rawKey.toUpperCase());
      if (dom.unlockStatusMsg) {
        dom.unlockStatusMsg.textContent = isMaster ? '👑 Chave de Gestor confirmada! Liberando todos os slides...' : '✓ Chave validada! Liberando acesso...';
        dom.unlockStatusMsg.className = 'unlock-status-msg success';
      }
      if (dom.btnSubmitUnlock) dom.btnSubmitUnlock.disabled = true;

      setTimeout(() => {
        if (dom.btnSubmitUnlock) dom.btnSubmitUnlock.disabled = false;
        unlockCourse(true, isMaster ? '👑 Modo Gestor Ativado! Todos os 34 slides e módulos liberados.' : '🎉 Parabéns! Acesso completo liberado com sucesso.', isMaster);
      }, 500);
    } else {
      if (dom.unlockStatusMsg) {
        dom.unlockStatusMsg.textContent = '❌ Chave inválida. Verifique o código recebido no e-mail.';
        dom.unlockStatusMsg.className = 'unlock-status-msg error';
      }
      dom.inputUnlockKey.select();
      dom.inputUnlockKey.focus();
    }
  }

  function showToast(message, type = 'info') {
    if (!dom.courseToast) return;
    clearTimeout(state.toastTimer);
    dom.courseToast.textContent = message;
    dom.courseToast.className = 'course-toast show ' + type;
    state.toastTimer = setTimeout(() => {
      dom.courseToast.classList.remove('show');
    }, 4000);
  }

  function bindEvents() {
    if (dom.prevBtn) dom.prevBtn.addEventListener('click', prevSlide);
    if (dom.nextBtn) dom.nextBtn.addEventListener('click', nextSlide);

    if (dom.fullscreenBtn) dom.fullscreenBtn.addEventListener('click', toggleFullscreen);
    if (dom.overviewBtn) dom.overviewBtn.addEventListener('click', () => toggleOverviewModal());
    if (dom.helpBtn) dom.helpBtn.addEventListener('click', () => toggleHelpModal());
    if (dom.themeBtn) dom.themeBtn.addEventListener('click', toggleTheme);
    if (dom.modulesBtn) dom.modulesBtn.addEventListener('click', () => toggleModulesDrawer());

    // Botões e Modais de Trava / Acesso
    if (dom.btnHeaderUnlock) {
      dom.btnHeaderUnlock.addEventListener('click', () => {
        if (state.isUnlocked) {
          const alternar = confirm(
            "👑 MODO GESTOR / ACESSO COMPLETO ATIVO\n\n" +
            "• Todos os 34 slides e módulos estão liberados para navegação e gestão.\n\n" +
            "Deseja alternar temporariamente para o 'Modo Aluno Demonstração' (para testar o bloqueio dos módulos 3 a 11)?"
          );
          if (alternar) {
            lockCourse();
          }
        } else {
          openUnlockModal();
        }
      });
    }

    if (dom.closePaywallBtn) dom.closePaywallBtn.addEventListener('click', closePaywallModal);

    if (dom.btnPaywallEnterKey) {
      dom.btnPaywallEnterKey.addEventListener('click', () => {
        closePaywallModal();
        openUnlockModal();
      });
    }

    if (dom.closeUnlockBtn) dom.closeUnlockBtn.addEventListener('click', closeUnlockModal);

    if (dom.formUnlockKey) dom.formUnlockKey.addEventListener('submit', submitUnlockKey);

    if (dom.paywallModal) {
      dom.paywallModal.addEventListener('click', (e) => {
        if (e.target === dom.paywallModal) closePaywallModal();
      });
    }

    if (dom.unlockModal) {
      dom.unlockModal.addEventListener('click', (e) => {
        if (e.target === dom.unlockModal) closeUnlockModal();
      });
    }

    if (dom.closeOverviewBtn) dom.closeOverviewBtn.addEventListener('click', () => toggleOverviewModal(false));
    if (dom.closeHelpBtn) dom.closeHelpBtn.addEventListener('click', () => toggleHelpModal(false));
    if (dom.closeDrawerBtn) dom.closeDrawerBtn.addEventListener('click', () => toggleModulesDrawer(false));
    if (dom.drawerBackdrop) dom.drawerBackdrop.addEventListener('click', () => toggleModulesDrawer(false));

    if (dom.overviewModal) {
      dom.overviewModal.addEventListener('click', (e) => {
        if (e.target === dom.overviewModal) toggleOverviewModal(false);
      });
    }

    if (dom.helpModal) {
      dom.helpModal.addEventListener('click', (e) => {
        if (e.target === dom.helpModal) toggleHelpModal(false);
      });
    }

    window.addEventListener('keydown', handleKeyDown);

    window.addEventListener('touchstart', (e) => {
      state.touchStartX = e.changedTouches[0].screenX;
      state.touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      state.touchEndX = e.changedTouches[0].screenX;
      state.touchEndY = e.changedTouches[0].screenY;
      handleGesture();
    }, { passive: true });

    window.addEventListener('popstate', () => {
      const hash = window.location.hash.replace('#', '');
      const s = parseInt(hash, 10);
      if (!isNaN(s) && s >= 1 && s <= state.totalSlides) {
        goToSlide(s, false);
      }
    });
  }

  function handleKeyDown(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === 'Escape') {
      if (state.isUnlockModalOpen) {
        closeUnlockModal();
        return;
      }
      if (state.isPaywallOpen) {
        closePaywallModal();
        return;
      }
      if (state.isCardZoomOpen) {
        closeCardZoom();
        return;
      }
      if (state.isModulesDrawerOpen) {
        toggleModulesDrawer(false);
        return;
      }
      if (state.isOverviewOpen) {
        toggleOverviewModal(false);
        return;
      }
      if (state.isHelpOpen) {
        toggleHelpModal(false);
        return;
      }
    }

    if (state.isOverviewOpen || state.isHelpOpen || state.isPaywallOpen || state.isUnlockModalOpen) return;

    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
        if (state.isCardZoomOpen) closeCardZoom();
        nextSlide();
        break;

      case 'ArrowLeft':
      case 'PageUp':
      case 'Backspace':
        if (state.isCardZoomOpen) closeCardZoom();
        prevSlide();
        break;

      case 'Home':
        if (state.isCardZoomOpen) closeCardZoom();
        goToSlide(1);
        break;

      case 'End':
        if (state.isCardZoomOpen) closeCardZoom();
        goToSlide(state.totalSlides);
        break;

      case 'f':
      case 'F':
        toggleFullscreen();
        break;

      case 'm':
      case 'M':
        toggleModulesDrawer();
        break;

      case 'g':
      case 'G':
      case 'o':
      case 'O':
        toggleOverviewModal();
        break;

      case '?':
        toggleHelpModal();
        break;

      case 't':
      case 'T':
        toggleTheme();
        break;

      default:
        break;
    }
  }

  function handleGesture() {
    const diffX = state.touchEndX - state.touchStartX;
    const diffY = state.touchEndY - state.touchStartY;
    const minSwipeDistance = 45;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
      if (state.isCardZoomOpen) closeCardZoom();
      if (diffX < 0) nextSlide();
      else prevSlide();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.PresentationApp = {
    goToSlide,
    nextSlide,
    prevSlide,
    openCardZoom,
    closeCardZoom,
    toggleFullscreen,
    toggleOverviewModal,
    toggleModulesDrawer,
    toggleTheme,
    retryQuiz,
    restartCourse,
    unlockCourse,
    lockCourse,
    openPaywallModal,
    closePaywallModal,
    openUnlockModal,
    closeUnlockModal,
    getState: () => ({ ...state })
  };

  window.gestor = {
    desbloquear: () => unlockCourse(true, '👑 Modo Gestor Ativado!', true),
    bloquear: () => lockCourse(),
    irParaSlide: (n) => goToSlide(n),
    status: () => state.isUnlocked ? 'Desbloqueado (Gestor)' : 'Bloqueado (Demo)'
  };

})();
