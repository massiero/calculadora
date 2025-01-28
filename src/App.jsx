import React, { useState } from 'react';
import InputMask from 'react-input-mask';

function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('masculino');
  const [atividade, setAtividade] = useState('sedentario');
    const [novoAtividade, setNovoAtividade] = useState('sedentario');
  const [pesoIdeal, setPesoIdeal] = useState('');
    const [tempoParaPesoIdeal, setTempoParaPesoIdeal] = useState('');
  const [imc, setImc] = useState(null);
  const [imcClassification, setImcClassification] = useState('');
  const [tmb, setTmb] = useState(null);
  const [caloriasDiarias, setCaloriasDiarias] = useState(null);
    const [caloriasNovoAtividade, setCaloriasNovoAtividade] = useState(null);
  const [caloriasDeficit, setCaloriasDeficit] = useState(null);
    const [error, setError] = useState('');
    const [foodPortions, setFoodPortions] = useState({
        'Arroz': 0,
        'Feijão': 0,
        'Frango': 0,
        'Salada': 0,
        'Ovo': 0,
        'Pão Francês': 0,
        'Queijo': 0,
        'Açúcar': 0,
        'Refrigerante': 0,
        'Cerveja': 0,
        'Banana': 0,
        'Maçã': 0,
        'Bolacha Salgada': 0,
        'Bolacha Recheada': 0,
    });
    const [nutrientResults, setNutrientResults] = useState(null);

    const foodData = {
        'Arroz': { portion: '1 colher de servir', calories: 70, protein: 1, carbs: 15, fat: 0 },
        'Feijão': { portion: '1 concha', calories: 80, protein: 5, carbs: 15, fat: 0.5 },
        'Frango': { portion: '1 filé médio', calories: 150, protein: 30, carbs: 0, fat: 3 },
        'Salada': { portion: '1 prato', calories: 30, protein: 1, carbs: 5, fat: 0 },
        'Ovo': { portion: '1 unidade', calories: 70, protein: 6, carbs: 0.5, fat: 5 },
        'Pão Francês': { portion: '1 unidade', calories: 140, protein: 4, carbs: 30, fat: 1 },
        'Queijo': { portion: '1 fatia', calories: 60, protein: 7, carbs: 1, fat: 4 },
        'Açúcar': { portion: '1 colher de chá', calories: 20, protein: 0, carbs: 5, fat: 0 },
        'Refrigerante': { portion: '1 copo (200ml)', calories: 80, protein: 0, carbs: 20, fat: 0 },
        'Cerveja': { portion: '1 lata (350ml)', calories: 150, protein: 1, carbs: 13, fat: 0 },
        'Banana': { portion: '1 unidade média', calories: 100, protein: 1, carbs: 25, fat: 0.5 },
        'Maçã': { portion: '1 unidade média', calories: 80, protein: 0.5, carbs: 20, fat: 0.5 },
        'Bolacha Salgada': { portion: '3 unidades', calories: 100, protein: 2, carbs: 15, fat: 4 },
        'Bolacha Recheada': { portion: '3 unidades', calories: 150, protein: 1, carbs: 20, fat: 7 },
    };

    const handlePortionChange = (food, value) => {
        setFoodPortions({ ...foodPortions, [food]: parseInt(value, 10) || 0 });
    };

    const calculateTotalCalories = () => {
        let total = 0;
        for (const food in foodPortions) {
            total += foodPortions[food] * foodData[food].calories;
        }
        return total;
    };

    const calculateNutrients = () => {
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalFat = 0;

        for (const food in foodPortions) {
            totalProtein += foodPortions[food] * foodData[food].protein;
            totalCarbs += foodPortions[food] * foodData[food].carbs;
            totalFat += foodPortions[food] * foodData[food].fat;
        }

        return { totalProtein, totalCarbs, totalFat };
    };

    const handleOpenFoodTable = () => {
        window.open('https://www.dietpro.com.br/tabela-de-alimentos', '_blank');
    };

    const handleCalculateNutrients = () => {
        const { totalProtein, totalCarbs, totalFat } = calculateNutrients();
        const total = totalProtein + totalCarbs + totalFat;
        const proteinPercentage = (totalProtein / total) * 100 || 0;
        const carbsPercentage = (totalCarbs / total) * 100 || 0;
        const fatPercentage = (totalFat / total) * 100 || 0;
        setNutrientResults({ totalProtein, totalCarbs, totalFat, proteinPercentage, carbsPercentage, fatPercentage });
    };

  const calculateAll = () => {
      if (!peso || !altura || !idade || !sexo || !pesoIdeal || !tempoParaPesoIdeal) {
          setError('Preencha todos os campos!');
          setImc(null);
          setTmb(null);
          setCaloriasDiarias(null);
          setCaloriasNovoAtividade(null);
          setCaloriasDeficit(null);
          return;
      }
      setError('');

    if (peso && altura) {
      // Calculate IMC
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

    if (peso && altura && idade && sexo && pesoIdeal && tempoParaPesoIdeal) {
        // Calculate TMB
        const pesoNum = parseFloat(peso);
        const alturaNum = parseFloat(altura);
        const idadeNum = parseInt(idade);

        let tmbValue;
        if (sexo === 'masculino') {
          tmbValue = 88.362 + (13.397 * pesoNum) + (4.799 * alturaNum) - (5.677 * idadeNum);
        } else {
          tmbValue = 447.593 + (9.247 * pesoNum) + (3.098 * alturaNum) - (4.330 * idadeNum);
        }
        setTmb(tmbValue.toFixed(2));

        // Calculate Daily Calories
        let atividadeMultiplicador = 1.2;

        if (atividade === 'leve') {
          atividadeMultiplicador = 1.375;
        } else if (atividade === 'moderado') {
          atividadeMultiplicador = 1.55;
        } else if (atividade === 'ativo') {
          atividadeMultiplicador = 1.725;
        } else if (atividade === 'muito_ativo') {
            atividadeMultiplicador = 1.9;
        }

        const calorias = tmbValue * atividadeMultiplicador;
        setCaloriasDiarias(calorias.toFixed(2));


        const pesoIdealNum = parseFloat(pesoIdeal);
        const tempoParaPesoIdealNum = parseInt(tempoParaPesoIdeal);
        const deficitCalculado = (pesoNum - pesoIdealNum) * 7700 / (tempoParaPesoIdealNum * 30);
        

        let novoAtividadeMultiplicador = 1.2;

        if (novoAtividade === 'leve') {
            novoAtividadeMultiplicador = 1.375;
        } else if (novoAtividade === 'moderado') {
            novoAtividadeMultiplicador = 1.55;
        } else if (novoAtividade === 'ativo') {
            novoAtividadeMultiplicador = 1.725;
        } else if (novoAtividade === 'muito_ativo') {
            novoAtividadeMultiplicador = 1.9;
        }

        const caloriasNovoAtividadeCalculado = tmbValue * novoAtividadeMultiplicador;
        setCaloriasNovoAtividade((caloriasNovoAtividadeCalculado - deficitCalculado).toFixed(2));
        setCaloriasDeficit((calorias - deficitCalculado).toFixed(2));


      } else {
        setTmb(null);
        setCaloriasDiarias(null);
          setCaloriasNovoAtividade(null);
        setCaloriasDeficit(null);
      }
  };


  return (
    <div className="container">
      <h1>MagraSis</h1>
      <p className="app-description">Sistema de emagrecimento</p>

      <h2>Calculadora Integrada</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="calculator">
        <label>Peso (kg):</label>
        <InputMask
          mask="999"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          maskChar={null}
        />
        <label>Altura (cm):</label>
         <InputMask
          mask="999"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          maskChar={null}
        />
         <label>Idade:</label>
         <InputMask
          mask="999"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          maskChar={null}
        />
        <label>Sexo:</label>
        <select value={sexo} onChange={(e) => setSexo(e.target.value)} style={{ width: '150px' }}>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>
        <label>Nível de Atividade atual:</label>
        <select value={atividade} onChange={(e) => setAtividade(e.target.value)}>
          <option value="sedentario">Sedentário</option>
          <option value="leve">Levemente Ativo</option>
          <option value="moderado">Moderadamente Ativo</option>
          <option value="ativo">Ativo</option>
          <option value="muito_ativo">Muito Ativo</option>
        </select>
          <label>Novo Nível de Atividade:</label>
          <select value={novoAtividade} onChange={(e) => setNovoAtividade(e.target.value)}>
              <option value="sedentario">Sedentário</option>
              <option value="leve">Levemente Ativo</option>
              <option value="moderado">Moderadamente Ativo</option>
              <option value="ativo">Ativo</option>
              <option value="muito_ativo">Muito Ativo</option>
          </select>
         <label>Peso Ideal (kg):</label>
         <InputMask
          mask="999"
          value={pesoIdeal}
          onChange={(e) => setPesoIdeal(e.target.value)}
          maskChar={null}
        />
         <label>Tempo para Peso Ideal (meses):</label>
         <InputMask
          mask="99"
          value={tempoParaPesoIdeal}
          onChange={(e) => setTempoParaPesoIdeal(e.target.value)}
          maskChar={null}
        />
        <button onClick={calculateAll}>Calcular Tudo</button>
      </div>

      {imc && (
        <div className="result">
          <p>Seu IMC é: {imc}</p>
          <p>Classificação: {imcClassification}</p>
        </div>
      )}

      {tmb && (
        <div className="result">
          <p>Sua TMB é: {tmb} calorias</p>
        </div>
      )}

      {caloriasDiarias && (
        <div className="result">
           <p>Para manter o peso consuma: {caloriasDiarias} calorias</p>
        </div>
      )}
      {caloriasDeficit && (
        <div className="result">
           <p>Para o peso ideal consuma: <span className="highlight">{caloriasDeficit} calorias</span></p>
        </div>
      )}
        {caloriasNovoAtividade && (
            <div className="result">
                <p>Com o novo nível de atividade consuma: <span className="highlight">{caloriasNovoAtividade} calorias</span></p>
                <button className="food-table-button" onClick={handleOpenFoodTable}>Tabela de Alimentos</button>
                <table className="food-table">
                    <thead>
                        <tr>
                            <th>Alimento</th>
                            <th>Porção</th>
                            <th>Calorias</th>
                            <th>Porções</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(foodData).map(([food, data]) => (
                            <tr key={food}>
                                <td>{food}</td>
                                <td>{data.portion}</td>
                                <td>{data.calories}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={foodPortions[food]}
                                        onChange={(e) => handlePortionChange(food, e.target.value)}
                                    />
                                </td>
                                <td>{foodPortions[food] * data.calories}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4" style={{textAlign: 'right', fontWeight: 'bold'}}>Total de Calorias:</td>
                            <td>{calculateTotalCalories()}</td>
                        </tr>
                         <tr>
                            <td colSpan="5" style={{textAlign: 'center'}}>
                                <button className="food-table-button" onClick={handleCalculateNutrients}>Calcular Nutrientes</button>
                                {nutrientResults && (
                                    <div style={{marginTop: '10px'}}>
                                        <p>Proteínas: {nutrientResults.totalProtein.toFixed(2)}g</p>
                                        <p>Carboidratos: {nutrientResults.totalCarbs.toFixed(2)}g (<span style={{ color: (nutrientResults.carbsPercentage < 45 || nutrientResults.carbsPercentage > 60) ? 'red' : 'green' }}>{nutrientResults.carbsPercentage.toFixed(2)}%</span>)</p>
                                        <p>Gorduras: {nutrientResults.totalFat.toFixed(2)}g (<span style={{ color: (nutrientResults.fatPercentage < 20 || nutrientResults.fatPercentage > 35) ? 'red' : 'green' }}>{nutrientResults.fatPercentage.toFixed(2)}%</span>)</p>
                                    </div>
                                )}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )}
    </div>
  );
}

export default App;
