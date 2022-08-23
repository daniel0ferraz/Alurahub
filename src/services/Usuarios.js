import api from './api';

// Buscar usuário pelo nome
export async function getUsuarioByName(nomeUsuario) {
  try {
    const response = await api.get(`/users?login=${nomeUsuario}`);
    return response.data[0];
  } catch (error) {
    console.log(error);
    return {};
  }
}
