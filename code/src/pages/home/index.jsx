import React, { useState } from 'react';
import './style.css'

function Home() {
  {/*definindo as variáveis*/}
  const [name, setName] = useState('');
  const [subject1, setSubject1] = useState('');
  const [subject2, setSubject2] = useState('');
  const [subject3, setSubject3] = useState('');
  const [subject4, setSubject4] = useState('');
  const [subject5, setSubject5] = useState('');
  const [frequency, setFrequency] = useState('');
  {/*armaza os dados dos alunos*/}
  const [submittedData, setSubmittedData] = useState([]);
  {/*lida com o submit do formulário*/}
  const handleSubmit = (e) => {
  {/*premite que os dados sejam processados*/}
    e.preventDefault(); 
  {/*cria um novo "aluno"*/}
    const newData = {
      name,
      subject1: parseFloat(subject1),
      subject2: parseFloat(subject2),
      subject3: parseFloat(subject3),
      subject4: parseFloat(subject4),
      subject5: parseFloat(subject5),
      frequency: parseFloat(frequency)
    };

    setSubmittedData([...submittedData, newData]);
  {/*limpa os campos*/}
    setName('');
    setSubject1('');
    setSubject2('');
    setSubject3('');
    setSubject4('');
    setSubject5('');
    setFrequency('');
  };
  {/*calcula a média do aluno*/}
  const calculateAverage = (data) => {
    const sum = data.subject1 + data.subject2 + data.subject3 + data.subject4 + data.subject5;
    return sum / 5;
  };
  {/*calcula a média da classe*/}
  const calculateClassAverage = () => {
    if (submittedData.length === 0) return 0;
    const totalSum = submittedData.reduce((sum, data) => sum + calculateAverage(data), 0);
    return totalSum / submittedData.length;
  };
  {/*média da classe, alunos abaixo da média e alunos abaixo de 75% de frequência*/}
  const classAverage = calculateClassAverage();
  const studentsAboveClassAverage = submittedData.filter(data => calculateAverage(data) > classAverage);
  const studentsBelowFrequency = submittedData.filter(data => data.frequency < 75); 

  return (
    <div className='container'>
      {/*formulário para colocar as notas*/}
      <form onSubmit={handleSubmit}>
        <h1>Digite os dados:</h1>
        <input
          type='text'
          name='name'
          placeholder='Nome'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='number'
          name='subject1'
          placeholder='Nota 1'
          value={subject1}
          onChange={(e) => setSubject1(e.target.value)}
          min={0} max={10}
        />
        <input
          type='number'
          name='subject2'
          placeholder='Nota 2'
          value={subject2}
          onChange={(e) => setSubject2(e.target.value)}
          min={0} max={10}
        />
        <input
          type='number'
          name='subject3'
          placeholder='Nota 3'
          value={subject3}
          onChange={(e) => setSubject3(e.target.value)}
          min={0} max={10}
        />
        <input
          type='number'
          name='subject4'
          placeholder='Nota 4'
          value={subject4}
          onChange={(e) => setSubject4(e.target.value)}
          min={0} max={10}
        />
        <input
          type='number'
          name='subject5'
          placeholder='Nota 5'
          value={subject5}
          onChange={(e) => setSubject5(e.target.value)}
          min={0} max={10}
        />
        <input
          type='number'
          name='frequency'
          placeholder='Frequência (%)'
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>

      {/*exibir os alunos*/}
      {submittedData.length > 0 && (
        <div className="studentCard">
          <h2>Alunos:</h2>
          {submittedData.map((data, index) => (
            <div key={index}>
              <p>Nome: <span>{data.name}</span></p>
              <p>Notas: <span>{data.subject1}, {data.subject2}, {data.subject3}, {data.subject4}, {data.subject5}</span></p>
              <p>Frequência: <span>{data.frequency}%</span></p>
              <hr />
            </div>
          ))}
        </div>
      )}
      {/*exibir a média da turma*/}
      {submittedData.length > 0 && (
      <div className="averageCard">
        <h2>Média da Turma: <span>{classAverage.toFixed(2)}</span></h2>
      </div>)}
      {/*exibir os alunos acima da média*/}
      {studentsAboveClassAverage.length > 0 && (
        <div className="averageAboveCard">
          <h2>Alunos com média acima da média da turma:</h2>
          {studentsAboveClassAverage.map((data, index) => (
            <p key={index}><span>{data.name}</span></p>
          ))}
        </div>
      )}
      {/*exibir os alunos abaixo da frequência */}
      {studentsBelowFrequency.length > 0 && (
      <div className="frequencyCard">
        <h2>Alunos com frequência abaixo de 75%:</h2>
        {studentsBelowFrequency.map((data, index) => (
          <p key={index}><span>{data.name}</span></p>
        ))}
      </div>
      )}
    </div>
  );
}

export default Home;
