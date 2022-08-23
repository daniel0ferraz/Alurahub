import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';
import { createRepository } from '../../services/Repositorios';

export default function CriarRepositorio({ route, navigation }) {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');

  async function handleCreateRepository() {
    const response = await createRepository(route.params.id, nome, data);
    if (response === 'sucesso') {
      Alert.alert('Repositório criado');
      navigation.goBack();
    } else {
      Alert.alert('Erro');
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
      <TouchableOpacity style={estilos.botao} onPress={handleCreateRepository}>
        <Text style={estilos.textoBotao}>Criar</Text>
      </TouchableOpacity>
    </View>
  );
}
