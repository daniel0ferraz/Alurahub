import api from './api';

// Criar repositorio enviando params
export async function createRepository(postId, nome, data) {
  try {
    await api.post(`/repos`, {
      postId: postId,
      name: nome,
      data: data,
    });
    return 'sucesso';
  } catch (error) {
    console.log('-->', error);
    return 'error';
  }
}

// Atualizar repositorio
export async function updateRepository(postId, nome, data, id) {
  try {
    await api.put(`/repos/${id}`, {
      name: nome,
      data: data,
      postId: postId,
    });
    return 'sucesso';
  } catch (error) {
    console.log(error);
    return 'erro';
  }
}

// Buscar Repositorio Pelo nome
export async function getRepositorio(id, name) {
  try {
    const response = await api.get(`/posts/${id}/repos?name=${name}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Busca Repositorio Pelo id
export const getRepositorios = async (id) => {
  try {
    const response = await api.get(`/repos?postId=${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Deletar Repositorio
export async function deleteRepository(id) {
  try {
    await api.delete(`/repos/${id}`);
    return 'sucesso';
  } catch (error) {
    console.log(error);
    return 'error';
  }
}
