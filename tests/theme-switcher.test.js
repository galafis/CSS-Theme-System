
const { JSDOM } = require("jsdom");
const { expect } = require("chai");
const fs = require("fs");
const path = require("path");

// Mock localStorage
global.localStorage = {
  _data: {},
  setItem: function (id, val) {
    return (this._data[id] = String(val));
  },
  getItem: function (id) {
    return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
  },
  removeItem: function (id) {
    return delete this._data[id];
  },
  clear: function () {
    return (this._data = {});
  },
};

describe("ThemeManager", () => {
  let dom, document, ThemeManager, themes;

  beforeEach(() => {
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
      <body>
        <select id="theme-select">
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="orange">Orange</option>
        </select>
        <button id="mode-toggle"></button>
      </body>
      </html>
    `);
    document = dom.window.document;
    global.document = document;
    global.window = dom.window;

    // Mock document.documentElement and document.body for ThemeManager
    Object.defineProperty(document, 'documentElement', {
      get: () => document.querySelector('html')
    });
    Object.defineProperty(document, 'body', {
      get: () => document.querySelector('body')
    });

    // Read the content of theme-switcher.js and execute it in the JSDOM context
    const themeSwitcherCode = fs.readFileSync(path.resolve(__dirname, '../src/theme-switcher.js'), 'utf8');
    dom.window.eval(themeSwitcherCode);

    // Access the exported modules from the JSDOM window
    // Expose ThemeManager and themes globally within the JSDOM window for testing
    dom.window.ThemeManager = dom.window.ThemeManager;
    dom.window.themes = dom.window.themes;

    ThemeManager = dom.window.ThemeManager;
    themes = dom.window.themes;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should initialize with default theme and mode", () => {
    const themeManager = new ThemeManager();
    themeManager.init();
    expect(themeManager.currentTheme).to.equal("blue");
    expect(themeManager.currentMode).to.equal("light");
    expect(document.documentElement.getAttribute("data-theme")).to.equal("blue");
    expect(document.body.getAttribute("data-mode")).to.equal("light");
    expect(document.documentElement.style.getPropertyValue("--primary-color")).to.equal("#667eea");
  });

  it("should load saved preferences from localStorage", () => {
    localStorage.setItem("user-selected-theme", "green");
    localStorage.setItem("user-selected-mode", "dark");
    
    const themeManager = new ThemeManager();
    themeManager.init();

    expect(themeManager.currentTheme).to.equal("green");
    expect(themeManager.currentMode).to.equal("dark");
  });

  it("should apply a new theme", () => {
    const themeManager = new ThemeManager();
    themeManager.init();
    themeManager.applyTheme("orange");
    expect(themeManager.currentTheme).to.equal("orange");
    expect(document.documentElement.getAttribute("data-theme")).to.equal("orange");
    expect(document.documentElement.style.getPropertyValue("--primary-color")).to.equal("#ff9a9e");
  });

  it("should toggle mode from light to dark", () => {
    const themeManager = new ThemeManager();
    themeManager.init();
    themeManager.toggleMode();
    expect(themeManager.currentMode).to.equal("dark");
    expect(document.body.getAttribute("data-mode")).to.equal("dark");
    expect(document.getElementById("mode-toggle").innerHTML).to.equal("☀️ Modo Claro");
  });

  it("should toggle mode from dark to light", () => {
    localStorage.setItem("user-selected-mode", "dark");
    const themeManager = new ThemeManager();
    themeManager.init();
    themeManager.toggleMode();
    expect(themeManager.currentMode).to.equal("light");
    expect(document.body.getAttribute("data-mode")).to.equal("light");
    expect(document.getElementById("mode-toggle").innerHTML).to.equal("🌙 Modo Escuro");
  });

  it("should update UI elements correctly", () => {
    const themeManager = new ThemeManager();
    themeManager.init();
    themeManager.applyTheme("green");
    themeManager.applyMode("dark");
    themeManager.updateUI();
    expect(document.getElementById("theme-select").value).to.equal("green");
    expect(document.getElementById("mode-toggle").innerHTML).to.equal("☀️ Modo Claro");
  });

  it("should save preferences to localStorage when theme changes", () => {
    const themeManager = new ThemeManager();
    themeManager.init();
    const themeSelect = document.getElementById("theme-select");
    themeSelect.value = "green";
    themeSelect.dispatchEvent(new dom.window.Event("change"));
    expect(localStorage.getItem("user-selected-theme")).to.equal("green");
  });

  it("should save preferences to localStorage when mode changes", () => {
    const themeManager = new ThemeManager();
    themeManager.init();
    const modeToggle = document.getElementById("mode-toggle");
    modeToggle.click(); // Toggle once to dark
    expect(localStorage.getItem("user-selected-mode")).to.equal("dark");
    modeToggle.click(); // Toggle again to light
    expect(localStorage.getItem("user-selected-mode")).to.equal("light");
  });

  it("getStatus should return current theme and mode information", () => {
    const themeManager = new ThemeManager();
    themeManager.init();
    themeManager.applyTheme("orange");
    themeManager.applyMode("dark");
    const status = themeManager.getStatus();
    expect(status.theme).to.equal("orange");
    expect(status.themeName).to.equal("Laranja");
    expect(status.mode).to.equal("dark");
    expect(status.colors.primary).to.equal("#ff9a9e");
  });
});

