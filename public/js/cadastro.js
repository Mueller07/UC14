// Seleciona o formulário pelo ID 'register-form' e adiciona um listener para o evento 'submit'
document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // Impede que o formulário recarregue a página ao ser enviado

  // Cria um objeto FormData para facilitar a extração dos dados do formulário
  const formData = new FormData(e.target);
  const nome = formData.get('nome');   
  const email = formData.get('email'); 
  const senha = formData.get('senha'); 

  try {
    // Envia uma requisição POST para a API com os dados do formulário em formato JSON
    const res = await fetch('http://localhost:3000/api/usuarios/users', { 
      method: 'POST', // Método HTTP POST para criar um novo recurso
      headers: { 'Content-Type': 'application/json' }, // Diz que o corpo da requisição é JSON
      body: JSON.stringify({ nome, email, senha }), // Converte os dados para JSON
    });

   
    const data = await res.json();

    // Se o status da resposta não for ok (200-299), mostra mensagem de erro
    if (!res.ok) {
      alert(data.mensagem || 'Erro no cadastro'); 
      return; 
    }

    alert('Cadastro realizado com sucesso! Faça login.');

    window.location.href = 'login.html';

  } catch (error) {
    alert('Erro na conexão com o servidor.');
    console.error('Erro no fetch:', error); 
  }
});