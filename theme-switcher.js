/**
 * Dynamic Theme Switcher with LocalStorage Persistence
 * @author Gabriel Demetrios Lafis
 * 
 * Sistema de alternância dinâmica de temas que permite ao usuário:
 * - Escolher entre diferentes paletas de cores (Azul, Verde, Laranja)
 * - Alternar entre modo claro e escuro
 * - Persistir preferências no localStorage do navegador
 * 
 * Técnicas utilizadas:
 * - Manipulação do DOM
 * - CSS Custom Properties
 * - LocalStorage API
 * - Event Listeners
 */

// ============================================================================
// DEFINIÇÃO DE TEMAS
// Objeto contendo todas as paletas de cores disponíveis
// ============================================================================

const themes = {
  // Tema Azul - Paleta padrão com tons de roxo e azul
  blue: {
    name: 'Azul',
    primary: '#667eea',
    secondary: '#764ba2'
  },
  
  // Tema Verde - Paleta com tons de verde água e esmeralda
  green: {
    name: 'Verde',
    primary: '#38a169',
    secondary: '#68d391'
  },
  
  // Tema Laranja - Paleta com tons de rosa e coral
  orange: {
    name: 'Laranja',
    primary: '#ed8936',
    secondary: '#f6ad55'
  }
};

// ============================================================================
// CLASSE DE GERENCIAMENTO DE TEMAS
// Encapsula toda a lógica de alternância e persistência de temas
// ============================================================================

class ThemeManager {
  /**
   * Construtor - Inicializa o gerenciador de temas
   * Define valores padrão e carrega preferências salvas
   */
  constructor() {
    // Tema padrão caso nenhum esteja salvo
    this.currentTheme = 'blue';
    
    // Modo padrão (light = claro)
    this.currentMode = 'light';
    
    // Chaves para armazenamento no localStorage
    this.STORAGE_KEYS = {
      theme: 'user-selected-theme',
      mode: 'user-selected-mode'
    };
    
    // Referências aos elementos do DOM
    this.elements = {
      themeSelect: null,
      modeToggle: null,
      root: document.documentElement,
      body: document.body
    };
  }
  
  /**
   * Inicializa o sistema de temas
   * - Carrega preferências salvas
   * - Configura elementos do DOM
   * - Aplica tema inicial
   * - Registra event listeners
   */
  init() {
    // Aguarda o carregamento completo do DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }
  
  /**
   * Configura todo o sistema após o DOM estar pronto
   */
  setup() {
    // Obtém referências aos elementos da interface
    this.elements.themeSelect = document.getElementById('theme-select');
    this.elements.modeToggle = document.getElementById('mode-toggle');
    
    // Verifica se os elementos existem antes de prosseguir
    if (!this.elements.themeSelect || !this.elements.modeToggle) {
      console.error('Elementos do tema não encontrados. Verifique o HTML.');
      return;
    }
    
    // Carrega preferências salvas do localStorage
    this.loadSavedPreferences();
    
    // Aplica o tema e modo carregados
    this.applyTheme(this.currentTheme);
    this.applyMode(this.currentMode);
    
    // Atualiza a interface para refletir o estado atual
    this.updateUI();
    
    // Registra os event listeners para interação do usuário
    this.registerEventListeners();
    
    console.log('✅ Sistema de temas inicializado com sucesso!');
  }
  
  /**
   * Carrega preferências salvas do localStorage
   * Se não houver preferências salvas, mantém os valores padrão
   */
  loadSavedPreferences() {
    // Tenta carregar o tema salvo
    const savedTheme = localStorage.getItem(this.STORAGE_KEYS.theme);
    if (savedTheme && themes[savedTheme]) {
      this.currentTheme = savedTheme;
      console.log(`📦 Tema carregado do localStorage: ${savedTheme}`);
    }
    
    // Tenta carregar o modo salvo
    const savedMode = localStorage.getItem(this.STORAGE_KEYS.mode);
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      this.currentMode = savedMode;
      console.log(`📦 Modo carregado do localStorage: ${savedMode}`);
    }
  }
  
  /**
   * Salva preferências no localStorage para persistência
   */
  savePreferences() {
    try {
      localStorage.setItem(this.STORAGE_KEYS.theme, this.currentTheme);
      localStorage.setItem(this.STORAGE_KEYS.mode, this.currentMode);
      console.log('💾 Preferências salvas com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao salvar preferências:', error);
    }
  }
  
  /**
   * Aplica um tema específico
   * @param {string} themeName - Nome do tema a ser aplicado ('blue', 'green', 'orange')
   */
  applyTheme(themeName) {
    // Valida se o tema existe
    if (!themes[themeName]) {
      console.error(`❌ Tema "${themeName}" não encontrado. Usando tema padrão.`);
      themeName = 'blue';
    }
    
    const theme = themes[themeName];
    
    // Atualiza o atributo data-theme no elemento root
    this.elements.root.setAttribute('data-theme', themeName);
    
    // Atualiza as variáveis CSS Custom Properties
    this.elements.root.style.setProperty('--primary-color', theme.primary);
    this.elements.root.style.setProperty('--secondary-color', theme.secondary);
    
    // Atualiza o estado interno
    this.currentTheme = themeName;
    
    console.log(`🎨 Tema aplicado: ${theme.name}`);
  }
  
  /**
   * Aplica um modo de exibição (claro ou escuro)
   * @param {string} mode - Modo a ser aplicado ('light' ou 'dark')
   */
  applyMode(mode) {
    // Valida o modo
    if (mode !== 'light' && mode !== 'dark') {
      console.error(`❌ Modo "${mode}" inválido. Usando modo claro.`);
      mode = 'light';
    }
    
    // Atualiza o atributo data-mode no body
    this.elements.body.setAttribute('data-mode', mode);
    
    // Atualiza o estado interno
    this.currentMode = mode;
    
    console.log(`🌓 Modo aplicado: ${mode}`);
  }
  
  /**
   * Alterna entre modo claro e escuro
   */
  toggleMode() {
    // Inverte o modo atual
    const newMode = this.currentMode === 'light' ? 'dark' : 'light';
    
    // Aplica o novo modo
    this.applyMode(newMode);
    
    // Atualiza a interface
    this.updateUI();
    
    // Salva a preferência
    this.savePreferences();
  }
  
  /**
   * Atualiza a interface do usuário para refletir o estado atual
   * - Atualiza o texto do botão de modo
   * - Atualiza o valor do select de tema
   */
  updateUI() {
    // Atualiza o select de tema
    if (this.elements.themeSelect) {
      this.elements.themeSelect.value = this.currentTheme;
    }
    
    // Atualiza o botão de modo com ícone e texto apropriados
    if (this.elements.modeToggle) {
      if (this.currentMode === 'light') {
        this.elements.modeToggle.innerHTML = '🌙 Modo Escuro';
        this.elements.modeToggle.setAttribute('aria-label', 'Ativar modo escuro');
      } else {
        this.elements.modeToggle.innerHTML = '☀️ Modo Claro';
        this.elements.modeToggle.setAttribute('aria-label', 'Ativar modo claro');
      }
    }
  }
  
  /**
   * Registra todos os event listeners necessários
   */
  registerEventListeners() {
    // Event listener para mudança de tema via select
    this.elements.themeSelect.addEventListener('change', (event) => {
      const selectedTheme = event.target.value;
      this.applyTheme(selectedTheme);
      this.savePreferences();
      
      // Animação visual ao trocar tema (opcional)
      this.addChangeAnimation();
    });
    
    // Event listener para alternância de modo via botão
    this.elements.modeToggle.addEventListener('click', () => {
      this.toggleMode();
      
      // Animação visual ao trocar modo (opcional)
      this.addChangeAnimation();
    });
    
    console.log('🔗 Event listeners registrados');
  }
  
  /**
   * Adiciona uma breve animação visual ao trocar tema/modo
   * Proporciona feedback visual ao usuário
   */
  addChangeAnimation() {
    // Adiciona classe de animação
    this.elements.body.style.transition = 'all 0.3s ease';
    
    // Remove a classe após a animação
    setTimeout(() => {
      this.elements.body.style.transition = '';
    }, 300);
  }
  
  /**
   * Retorna informações sobre o estado atual do tema
   * Útil para debugging ou integração com outras partes do sistema
   */
  getStatus() {
    return {
      theme: this.currentTheme,
      themeName: themes[this.currentTheme].name,
      mode: this.currentMode,
      colors: {
        primary: themes[this.currentTheme].primary,
        secondary: themes[this.currentTheme].secondary
      }
    };
  }
}

// ============================================================================
// INICIALIZAÇÃO
// Cria uma instância do gerenciador e inicia o sistema
// ============================================================================

// Cria instância global do gerenciador de temas
const themeManager = new ThemeManager();

// Inicializa o sistema
themeManager.init();

// Expõe a instância globalmente para debugging (opcional)
window.themeManager = themeManager;

// Log de boas-vindas
console.log('🎨 Dynamic Theme System v1.0');
console.log('👨‍💻 Criado por: Gabriel Demetrios Lafis');
console.log('📍 Para verificar o status atual, use: themeManager.getStatus()');

// ============================================================================
// FIM DO ARQUIVO
// ============================================================================

