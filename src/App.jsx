import React, { useState } from 'react';

function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [imcClassification, setImcClassification] = useState('');

  const calculateImc = () => {
    if (peso && altura) {
      const alturaMetros = parseFloat(altura) / 100;
      const imcValue = parseFloat(peso) / (alturaMetros * alturaMetros);
      setImc(imcValue.toFixed(2));

      if (imcValue < 18.5) {
        setImcClassification('Abaixo do peso');
      } else if (imcValue >= 18.5 && imcValue < 25) {
        setImcClassification('Peso normal');
      } else if (imcValue >= 25 && imcValue < 30) {
        setImcClassification('Sobrepeso');
      } else if (imcValue >= 30 && imcValue < 35) {
        setImcClassification('Obesidade grau 1');
      } else if (imcValue >= 35 && imcValue < 40) {
        setImcClassification('Obesidade grau 2');
      } else {
        setImcClassification('Obesidade grau 3');
      }
    } else {
      setImc(null);
      setImcClassification('');
    }
  };

  return (
    <div className="container">
      <h1>Bem-vindo ao seu Guia de Emagrecimento</h1>
      <p>Descubra seu IMC e comece sua jornada para uma vida mais saudável.</p>

      <h2>Calculadora de IMC</h2>
      <div className="imc-calculator">
        <label>Peso (kg):</label>
        <input
          type="number"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
        />
        <label>Altura (cm):</label>
        <input
          type="number"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
        />
        <button onClick={calculateImc}>Calcular IMC</button>
      </div>

      {imc && (
        <div className="imc-result">
          <p>Seu IMC é: {imc}</p>
          <p>Classificação: {imcClassification}</p>
        </div>
      )}
    </div>
  );
}

export default App;
