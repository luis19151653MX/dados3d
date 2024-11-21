import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Dice } from './src/Dice';

export default function App() {
  const [numDados, setNumDados] = useState(1);
  const [resultados, setResultados] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(()=>{
    ClickRollDice();
  },[numDados])

  // Función para tirar los dados
  const ClickRollDice = () => {
    setIsRolling(true); // Inicia la animación
    setTimeout(() => {
      let nuevosResultados: number[] = [];
      for (let i = 0; i < numDados; i++) {
        nuevosResultados.push(Math.floor(Math.random() * 6) + 1);
      }
      setResultados(nuevosResultados);
      setIsRolling(false); // Finaliza la animación
    }, 500); // Duración de la animación
  };

  const ClickDecreaseDiceNumber=()=>{
    if(numDados>1){
      setNumDados(numDados - 1);
    }
  }
  const ClickIncreaseDiceNumber = () => {
    if (numDados < 15) {
      setNumDados(numDados +1);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tirar Dados</Text>

      <View style={styles.resultadosContainer}>
        {resultados.map((resultado, index) => (
          <Dice key={index} value={resultado} isRolling={isRolling}  />
        ))}
      </View>

      <Button title="Tirar Dados" onPress={ClickRollDice} />

      <View style={styles.controls}>
        <Button title="Quitar Dado" disabled={numDados<=1} onPress={ClickDecreaseDiceNumber} />
        <Button title="Agregar Dado" disabled={numDados >= 15} onPress={ClickIncreaseDiceNumber} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  resultadosContainer: {
    flexDirection:'row',
    flexWrap:'wrap',
    marginBottom: 20,
  },
  resultado: {
    fontSize: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
