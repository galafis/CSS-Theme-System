# CSS Theme System

![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

Sistema de gerenciamento dinâmico de temas CSS utilizando variáveis CSS customizadas (CSS Custom Properties) para criar interfaces adaptáveis e personalizáveis.

## 🎨 Demonstração

O projeto implementa um sistema de temas baseado em variáveis CSS que permite mudanças dinâmicas de cores e estilos em toda a aplicação.

## ✨ Características

- **Variáveis CSS Customizadas**: Uso de `--primary-color` e `--secondary-color` para controle centralizado
- **Gradientes Dinâmicos**: Background com gradiente linear responsivo
- **Transições Suaves**: Efeitos de hover com transformações CSS
- **Design Responsivo**: Layout adaptável para diferentes dispositivos
- **Tipografia Moderna**: Fonte Segoe UI para melhor legibilidade

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Variáveis customizadas, gradientes e transições
- **CSS Custom Properties**: Sistema de temas dinâmico

## 📁 Estrutura Real do Projeto

```
CSS-Theme-System/
├── index.html          # Página principal com demonstração
├── styles.css          # Sistema de temas e estilos
├── README.md           # Documentação
├── LICENSE             # Licença MIT
└── .gitignore          # Arquivos ignorados pelo Git
```

## 🚀 Como Usar

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/galafis/CSS-Theme-System.git
cd CSS-Theme-System
```

2. Abra o arquivo `index.html` no navegador ou use um servidor local:
```bash
# Usando Python
python -m http.server 8000

# Usando Node.js
npx serve .
```

### Personalização de Temas

Para criar novos temas, modifique as variáveis CSS no arquivo `styles.css`:

```css
:root {
    --primary-color: #667eea;    /* Cor primária */
    --secondary-color: #764ba2;  /* Cor secundária */
}
```

### Exemplos de Temas

**Tema Azul (Padrão):**
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
}
```

**Tema Verde:**
```css
:root {
    --primary-color: #11998e;
    --secondary-color: #38ef7d;
}
```

**Tema Laranja:**
```css
:root {
    --primary-color: #ff9a9e;
    --secondary-color: #fecfef;
}
```

## 🎯 Funcionalidades Implementadas

- ✅ Sistema de variáveis CSS centralizadas
- ✅ Gradiente dinâmico baseado em variáveis
- ✅ Botão com efeitos de hover
- ✅ Layout responsivo
- ✅ Tipografia otimizada

## 🔧 Extensões Possíveis

- [ ] Seletor de temas via JavaScript
- [ ] Modo escuro/claro
- [ ] Persistência de tema no localStorage
- [ ] Mais componentes temáticos
- [ ] Animações de transição entre temas

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovoTema`)
3. Commit suas mudanças (`git commit -m 'Adiciona novo tema'`)
4. Push para a branch (`git push origin feature/NovoTema`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Gabriel Demetrios Lafis**

- GitHub: [@galafis](https://github.com/galafis)
- Email: gabrieldemetrios@gmail.com

---

⭐ Se este projeto foi útil, considere deixar uma estrela!

