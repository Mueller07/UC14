// js/home.js

// Verifica se usuário está logado
const userId = localStorage.getItem('userId');
const nome = localStorage.getItem('nome');

if (!userId) {
  alert('Você precisa estar logado para acessar esta página.');
  window.location.href = 'login.html';
} else {
  // Exibe o nome do usuário na página
  const welcomeMsg = document.getElementById('welcome-msg');
  if (welcomeMsg) {
    welcomeMsg.textContent = `Bem-vindo(a), ${nome}!`;
  }
}

// Evento para logout
document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.clear();
  window.location.href = 'login.html';
});

// Aqui você pode colocar o código para carregar e gerenciar seus livros, por exemplo
// function carregarLivros() { ... }
// carregarLivros();
