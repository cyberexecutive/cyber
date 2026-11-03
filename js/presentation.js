/**
 * Curso de Segurança da Informação e Boas Práticas no Trabalho
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
    isFullscreen: false,
    isOverviewOpen: false,
    isHelpOpen: false,
    isCardZoomOpen: false,
    isModulesDrawerOpen: false,
    quizzes: {},
    studentName: 'Colaborador Exemplar',
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
    certDisplayName: document.getElementById('cert-display-name'),
    statModulesCompleted: document.getElementById('stat-modules-completed'),
    statScorePercent: document.getElementById('stat-score-percent')
  };

  /**
   * Inicialização
   */
  function init() {
    state.totalSlides = dom.slides.length || 34;
    if (dom.totalNum) dom.totalNum.textContent = String(state.totalSlides).padStart(2, '0');

    // Carrega dados salvos em localStorage
    loadSavedProgress();

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
      if (savedName) state.studentName = savedName;
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

      const card = document.createElement('div');
      card.className = 'overview-card' + (slideNum === state.currentSlide ? ' active' : '');
      card.setAttribute('data-target', slideNum);

      const numSpan = document.createElement('span');
      numSpan.className = 'card-num';
      numSpan.textContent = `SLIDE ${String(slideNum).padStart(2, '0')}`;

      const nameSpan = document.createElement('span');
      nameSpan.className = 'card-name';
      const rawText = titleElem ? (titleElem.textContent || titleElem.innerText || '') : `Slide ${slideNum}`;
      nameSpan.textContent = rawText.replace(/\s+/g, ' ').trim();

      card.appendChild(numSpan);
      card.appendChild(nameSpan);

      card.addEventListener('click', () => {
        goToSlide(slideNum);
        toggleOverviewModal(false);
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
      if (isQuizDone) completedModulesCount++;

      const card = document.createElement('div');
      card.className = 'drawer-module-card' + (isCurrentMod ? ' active-mod' : '');

      let statusHtml = '<span class="drawer-module-status">⚪ Em aberto</span>';
      if (mod.id === 11) {
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
          goToSlide(s);
          toggleModulesDrawer(false);
        });
        chipsContainer.appendChild(pill);
      }

      card.addEventListener('click', () => {
        goToSlide(mod.startSlide);
        toggleModulesDrawer(false);
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
    if (dom.certStudentNameInput && dom.certDisplayName) {
      dom.certStudentNameInput.value = state.studentName;
      dom.certDisplayName.textContent = state.studentName;

      dom.certStudentNameInput.addEventListener('input', (e) => {
        const val = e.target.value.trim() || 'Colaborador Exemplar';
        state.studentName = val;
        dom.certDisplayName.textContent = val;
        saveProgress();
      });
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

  function bindEvents() {
    if (dom.prevBtn) dom.prevBtn.addEventListener('click', prevSlide);
    if (dom.nextBtn) dom.nextBtn.addEventListener('click', nextSlide);

    if (dom.fullscreenBtn) dom.fullscreenBtn.addEventListener('click', toggleFullscreen);
    if (dom.overviewBtn) dom.overviewBtn.addEventListener('click', () => toggleOverviewModal());
    if (dom.helpBtn) dom.helpBtn.addEventListener('click', () => toggleHelpModal());
    if (dom.themeBtn) dom.themeBtn.addEventListener('click', toggleTheme);
    if (dom.modulesBtn) dom.modulesBtn.addEventListener('click', () => toggleModulesDrawer());

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

    if (state.isOverviewOpen || state.isHelpOpen) return;

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
    getState: () => ({ ...state })
  };

})();
