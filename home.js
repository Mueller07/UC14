const userId = localStorage.getItem('userId');
if (!userId) {
  alert('Usuário não autenticado. Faça login.');
  window.location.href = 'index.html';
}

const form = document.getElementById('livro-form');
const livrosTableBody = document.querySelector('#livros-table tbody');
const cancelBtn = document.getElementById('cancel-btn');
const logoutBtn = document.getElementById('logout-btn');

let editLivroId = null;

async function fetchLivros() {
  try {
    const res = await fetch(`/api/livros?userId=${userId}`);
    const livros = await res.json();
    renderLivros(livros);
  } catch (error) {
    alert('Erro ao carregar livros.');
  }
}

function renderLivros(livros) {
  livrosTableBody.innerHTML = '';
  livros.forEach(livro => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${livro.titulo}</td>
      <td>${livro.autor}</td>
      <td>${livro.genero || ''}</td>
      <td>${livro.anoPublicacao || ''}</td>
      <td>${livro.status}</td>
      <td>
        <button class="edit-btn" data-id="${livro.id}">Editar</button>
        <button class="delete-btn" data-id="${livro.id}">Excluir</button>
      </td>
    `;
    livrosTableBody.appendChild(tr);
  });
  addTableEventListeners();
}

function addTableEventListeners() {
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      editLivroId = btn.dataset.id;
      loadLivro(editLivroId);
    });
  });
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if (confirm('Deseja realmente excluir este livro?')) {
        deleteLivro(id);
      }
    });
  });
}

async function loadLivro(id) {
  try {
    const res = await fetch(`/api/livros/${id}`);
    if (!res.ok) throw new Error('Livro não encontrado');
    const livro = await res.json();
    form['livro-id'].value = livro.id;
    form['titulo'].value = livro.titulo;
    form['autor'].value = livro.autor;
    form['genero'].value = livro.genero || '';
    form['anoPublicacao'].value = livro.anoPublicacao || '';
    form['status'].value = livro.status;
  } catch (error) {
    alert('Erro ao carregar o livro.');
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const livroData = {
    titulo: form.titulo.value.trim(),
    autor: form.autor.value.trim(),
    genero: form.genero.value.trim(),
    anoPublicacao: Number(form.anoPublicacao.value) || 0,
    status: form.status.value,
    userId: Number(userId),
  };

  try {
    let res;
    if (editLivroId) {
      res = await fetch(`/api/livros/${editLivroId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(livroData),
      });
    } else {
      res = await fetch('/api/livros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(livroData),
      });
    }

    if (!res.ok) {
      const data = await res.json();
      alert(data.mensagem || 'Erro ao salvar livro.');
      return;
    }

    form.reset();
    editLivroId = null;
    fetchLivros();
  } catch (error) {
    alert('Erro ao salvar livro.');
  }
});

cancelBtn.addEventListener('click', () => {
  form.reset();
  editLivroId = null;
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('userId');
  window.location.href = 'index.html';
});

// Inicializa
fetchLivros();
