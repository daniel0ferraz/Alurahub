import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import estilos from './estilos';
import { getRepositorios, getRepositorio } from '../../services/Repositorios';
import { useIsFocused } from '@react-navigation/native';

export default function Repositorios({ route, navigation }) {
  const [repo, setRepo] = useState([]);
  const [nomeRepo, setNomeRepo] = useState('');

  const estaNaTela = useIsFocused();

  async function getRepositoryByName() {
    try {
      const response = await getRepositorio(route.params.id, nomeRepo);
      // console.log('DadosRepositorio:', response);
      setNomeRepo('');
      if (response) {
        setRepo(response);
      }
    } catch (error) {
      console.log('Error name:', error);
    }
  }

  useEffect(async () => {
    const response = await getRepositorios(route.params.id);
    console.log('response:', response);
    setRepo(response);
  }, [estaNaTela]);

  return (
    <View style={estilos.container}>
      <Text style={estilos.repositoriosTexto}>
        {repo.length} repositórios criados
      </Text>
      <TouchableOpacity
        style={estilos.botao}
        onPress={() =>
          navigation.navigate('CriarRepositorio', { id: route.params.id })
        }
      >
        <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
      </TouchableOpacity>

      <View style={estilos.containerbtn}>
        <TextInput
          value={nomeRepo}
          onChangeText={setNomeRepo}
          placeholder="Busque por um repositório"
          autoCapitalize="none"
          style={estilos.entrada}
        />

        <TouchableOpacity onPress={getRepositoryByName} style={estilos.btn}>
          <Text style={{ color: '#ffffff' }}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={repo}
        style={{ width: '100%' }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.repositorio}
            onPress={() => navigation.navigate('InfoRepositorio', { item })}
          >
            <Text style={estilos.textoRepositorio}>{item.name}</Text>
            <Text style={estilos.textoRepositorio}>
              Atualizado em {item.data}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
