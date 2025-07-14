document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
  
    try {
      const res = await fetch('/api/usuarios/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.mensagem || 'Erro no cadastro');
        return;
      }
  
      alert('Cadastro realizado com sucesso! Faça login.');
      window.location.href = 'index.html';
  
    } catch (error) {
      alert('Erro na conexão com o servidor.');
    }
  });
  