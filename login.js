document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
  
    try {
      const res = await fetch('/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.mensagem || 'Erro no login');
        return;
      }
  
      // Salvar userId no localStorage para uso no CRUD
      localStorage.setItem('userId', data.userId);
      window.location.href = 'home.html';
  
    } catch (error) {
      alert('Erro na conexão com o servidor.');
    }
  });
  