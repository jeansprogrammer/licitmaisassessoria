# Licite Mais Assessoria — Landing Page

Página institucional da **Licite Mais Assessoria**, consultoria especializada em licitações públicas. O projeto é uma landing page responsiva, com animações de scroll, formulário de captação de leads e integração futura com pagamento via Pix.

---

## 🧱 Estrutura do projeto

```
licitemais/
├── index.html          # Estrutura principal da página
├── style.css           # Estilos, responsividade e animações
├── script.js           # Interações, scroll e validação do formulário
└── static/             # Imagens, logo e demais assets
    ├── logo.png
    ├── business-handshake-moment-in-a-corporate-environme.png
    ├── low-angle-view-of-modern-government-and-corporate.png
    ├── close-up-of-hands-signing-a-business-contract-with.png
    ├── business-meeting-photo-with-colleagues-discussing.png
    ├── modern-minimal-office-interior-with-large-windows.png
    ├── diverse-team-of-professionals-working-on-computers.png
    ├── wide-angle-photo-of-a-modern-corporate-meeting-roo.png
    ├── dark-photo-of-a-modern-office-interior-at-dusk-mo.png
    └── equipe.jpg
```

---

## 🚀 Como executar

Não há dependências externas. Basta abrir o arquivo `index.html` em qualquer navegador.

1. Faça o download ou clone do projeto.
2. Mantenha a pasta `static/` no mesmo nível de `index.html`, `style.css` e `script.js`.
3. Abra `index.html`.

---

## 🎨 Personalização

### Logo

- Substitua `static/logo.png` pelo arquivo da sua marca.
- A logo é usada no cabeçalho, no rodapé e como favicon.
- Dimensão recomendada: **512x512** ou superior, com fundo transparente (PNG).

### Imagens de fundo

As imagens de fundo são aplicadas via CSS com efeito de desfoque e overlay. Para trocar:

1. Substitua o arquivo correspondente em `static/`.
2. Confira no `style.css` a classe da seção (ex.: `.hero-bg`, `.about-bg` etc.).

### Cores

- Azul-marinho: `#0B2545`
- Dourado: `#E8A33D`
- Tons neutros: fundo branco e cinza claro

---

## ✨ Funcionalidades

- Layout responsivo para desktop e mobile.
- Animações de entrada por scroll (Intersection Observer).
- Contador animado de métricas.
- Barra de progresso de leitura.
- Parallax sutil nas seções.
- Validação local do formulário de contato.

---

## 📬 Formulário de contato

Os dados do formulário são enviados para o e-mail da empresa após integração futura. Opções de integração:

- **FormSubmit** — envia os dados direto para o e-mail.
- **Zapier / Make** — automação entre formulário e e-mail.
- **Backend próprio** — ideal para integração com Pix e cartão.

---

## 💳 Pagamento via Pix (roadmap)

O formulário já é o ponto de partida para receber pedidos. Possível fluxo:

1. Cliente preenche o formulário na landing.
2. Sistema envia e-mail com pedido e código Pix.
3. Webhook confirma o pagamento e dispara e-mail automático ao cliente.

Ferramentas recomendadas: **Asaas**, **Mercado Pago**, **Pagar.me** ou **Nubank PJ**.

---

## 🧑‍💻 Tecnologias

- HTML5
- CSS3
- JavaScript vanilla
- CSS custom animations
- Intersection Observer API

---

## 📄 Licença

Projeto proprietário da **Licite Mais Assessoria**. Uso restrito à empresa e seus representantes autorizados.