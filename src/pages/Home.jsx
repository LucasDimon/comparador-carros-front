import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importado para navegar entre páginas

export default function Home() {
  const navigate = useNavigate();
  
  // Estados da página
  const [carros, setCarros] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selecionados, setSelecionados] = useState([]); // Guarda os carros para comparar

  // Estados do formulário
  const [modelo, setModelo] = useState('');
  const [motor, setMotor] = useState('');
  const [cv, setCv] = useState('');
  const [tracao, setTracao] = useState('');
  const [precioNum, setPrecioNum] = useState('');
  const [imagem, setImagem] = useState('');

  async function buscarCarros() {
    try {
      const response = await fetch('http://localhost:3000/carros');
      const data = await response.json();
      setCarros(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    buscarCarros();
  }, []);

  // Lógica de Seleção para Comparação
  function handleSelecionarCarro(carro) {
    const jaSelecionado = selecionados.find(c => c.id === carro.id);

    if (jaSelecionado) {
      // Se já estava selecionado, remove da lista
      setSelecionados(selecionados.filter(c => c.id !== carro.id));
    } else {
      // Se não estava, adiciona (limite de 2 carros)
      if (selecionados.length < 2) {
        setSelecionados([...selecionados, carro]);
      } else {
        alert("Você só pode comparar 2 carros por vez! Desmarque um para escolher outro.");
      }
    }
  }

  // ENVIAR PARA COMPARAÇÃO E GRAVAR NO HISTÓRICO 🕒
  function irParaComparacao() {
    // 1. Busca o histórico existente no navegador ou inicia um array vazio
    const historicoAtual = JSON.parse(localStorage.getItem('historico_comparacoes')) || [];
    
    // 2. Monta o objeto da nova comparação com data e hora local
    const novaComparacao = {
      id: Date.now(),
      data: new Date().toLocaleString('pt-BR'),
      carro1: selecionados[0],
      carro2: selecionados[1]
    };

    // 3. Salva a nova lista atualizada de volta no localStorage
    localStorage.setItem('historico_comparacoes', JSON.stringify([novaComparacao, ...historicoAtual]));

    // 4. Executa a navegação de rotas
    navigate('/comparacao', { state: { carrosParaComparar: selecionados } });
  }

  // CRUD: Cadastrar
  async function handleCadastrar(e) {
    e.preventDefault();
    const novoCarro = { modelo, motor, cv: Number(cv), tracao, precio_num: Number(precioNum), imagem };
    try {
      const res = await fetch('http://localhost:3000/carros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoCarro)
      });
      if (res.ok) {
        alert('Cadastrado!');
        buscarCarros();
        setModelo(''); setMotor(''); setCv(''); setTracao(''); setPrecioNum(''); setImagem('');
      }
    } catch (err) { console.error(err); }
  }

  // CRUD: Deletar
  async function handleDeletar(id) {
    if (confirm("Remover carro?")) {
      try {
        const res = await fetch(`http://localhost:3000/carros/${id}`, { method: 'DELETE' });
        if (res.ok) { buscarCarros(); setSelecionados(selecionados.filter(c => c.id !== id)); }
      } catch (err) { console.error(err); }
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#000000' }}>
      
      {/* BARRA FIXA DE COMPARAÇÃO (Só aparece se houver carros selecionados) */}
      {selecionados.length > 0 && (
        <div style={{
          position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
          backgroundColor: '#222', color: '#fff', padding: '15px 30px', borderRadius: '50px',
          display: 'flex', gap: '20px', alignItems: 'center', zIndex: 1000, boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
        }}>
          <span style={{ fontWeight: 'bold' }}>
            {selecionados.length} de 2 carros selecionados
          </span>
          <button 
            onClick={irParaComparacao}
            disabled={selecionados.length !== 2}
            style={{
              padding: '8px 20px', backgroundColor: selecionados.length === 2 ? '#28a745' : '#555',
              color: '#fff', border: 'none', borderRadius: '20px', cursor: selecionados.length === 2 ? 'pointer' : 'not-allowed',
              fontWeight: 'bold'
            }}
          >
            ⚖️ Comparar Agora
          </button>
        </div>
      )}

      {/* Botão Admin */}
      <div style={{ marginBottom: '20px', textAlign: 'right' }}>
        <button onClick={() => setIsAdmin(!isAdmin)} style={{ padding: '10px 15px', backgroundColor: isAdmin ? '#d9534f' : '#5cb85c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          {isAdmin ? '🔒 Sair do Modo Admin' : '🔑 Entrar como Admin'}
        </button>
      </div>

      {/* Formulário Admin */}
      {isAdmin && (
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #ddd' }}>
          <h2 style={{ color: '#000000', marginTop: 0 }}>✨ Painel do Admin: Cadastrar Novo Veículo</h2>
          <form onSubmit={handleCadastrar} style={{ display: 'grid', gap: '10px', maxWidth: '400px' }}>
            <input type="text" placeholder="Modelo" value={modelo} onChange={e => setModelo(e.target.value)} required style={{ padding: '8px', color: '#000' }} />
            <input type="text" placeholder="Motor" value={motor} onChange={e => setMotor(e.target.value)} required style={{ padding: '8px', color: '#000' }} />
            <input type="number" placeholder="CV" value={cv} onChange={e => setCv(e.target.value)} required style={{ padding: '8px', color: '#000' }} />
            <input type="text" placeholder="Tração" value={tracao} onChange={e => setTracao(e.target.value)} required style={{ padding: '8px', color: '#000' }} />
            <input type="number" placeholder="Preço" value={precioNum} onChange={e => setPrecioNum(e.target.value)} required style={{ padding: '8px', color: '#000' }} />
            <input type="url" placeholder="URL Imagem" value={imagem} onChange={e => setImagem(e.target.value)} required style={{ padding: '8px', color: '#000' }} />
            <button type="submit" style={{ padding: '10px', backgroundColor: '#0275d8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Salvar no Banco</button>
          </form>
        </div>
      )}

      <h1 style={{ color: '#ffffff', marginBottom: '35px' }}>Catálogo de Carros</h1>
      
      {/* Grid de Cards */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', paddingBottom: '100px' }}>
        {carros.length === 0 ? (
          <p style={{ color: '#000' }}>Nenhum carro encontrado...</p>
        ) : (
          carros.map((carro) => {
            const isSelected = selecionados.some(c => c.id === carro.id);
            return (
              <div key={carro.id} style={{ border: isSelected ? '3px solid #0275d8' : '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '300px', backgroundColor: '#ffffff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all 0.2s' }}>
                <img src={carro.imagem} alt={carro.modelo} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px' }} />
                <h2 style={{ margin: '15px 0 10px 0', color: '#000000', fontSize: '1.4em', fontWeight: 'bold' }}>{carro.modelo}</h2>
                <p style={{ color: '#000' }}><strong>Motor:</strong> {carro.motor}</p>
                <p style={{ color: '#000' }}><strong>Potência:</strong> {carro.cv} cv</p>
                <p style={{ color: '#000' }}><strong>Tração:</strong> {carro.tracao}</p>
                <p style={{ color: '#28a745', fontWeight: 'bold', fontSize: '1.2em' }}>R$ {carro.precio_num?.toLocaleString('pt-BR')}</p>

                {/* Botão de Selecionar para Comparação */}
                <button 
                  onClick={() => handleSelecionarCarro(carro)}
                  style={{
                    marginTop: '10px', width: '100%', padding: '8px',
                    backgroundColor: isSelected ? '#d9534f' : '#0275d8',
                    color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
                  }}
                >
                  {isSelected ? '❌ Desmarcar' : '⚖️ Selecionar para Comparar'}
                </button>

                {isAdmin && (
                  <button onClick={() => handleDeletar(carro.id)} style={{ marginTop: '10px', width: '100%', padding: '8px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>❌ Excluir Veículo</button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}