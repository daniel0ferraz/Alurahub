import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';
import {
  deleteRepository,
  updateRepository,
} from '../../services/Repositorios';

export default function InfoRepositorio({ route, navigation }) {
  const [nome, setNome] = useState(route.params.item.name);
  const [data, setData] = useState(route.params.item.data);

  console.log('route:', route.params.item);

  async function handleUpdateRepository() {
    const resultado = await updateRepository(
      route.params.item.postId,
      nome,
      data,
      route.params.item.id
    );

    if (resultado === 'sucesso') {
      Alert.alert('Repositorio atualizado!');
      navigation.goBack();
    } else {
      Alert.alert('Erro');
    }
  }

  async function handleDeleteRepository() {
    const resultado = await deleteRepository(route.params.item.id);

    if (resultado === 'sucesso') {
      Alert.alert('Repositorio deletado!');
      navigation.goBack();
    } else {
      Alert.alert('Erro ao deletar o repositorio');
    }
  }
  return (
    <View style={estilos.container}>
      <TextInput
        placeholder="Nome do repositório"
        autoCapitalize="none"
        style={estilos.entrada}
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        placeholder="Data de criação"
        autoCapitalize="none"
        style={estilos.entrada}
        value={data}
        onChangeText={setData}
      />
      <TouchableOpacity style={estilos.botao} onPress={handleUpdateRepository}>
        <Text style={estilos.textoBotao}>Atualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleDeleteRepository}
        style={[estilos.botao, { backgroundColor: '#DD2B2B', marginTop: 10 }]}
      >
        <Text style={estilos.textoBotao}>Deletar</Text>
      </TouchableOpacity>
    </View>
  );
}
