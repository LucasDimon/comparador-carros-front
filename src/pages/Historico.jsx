import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Historico() {
  const navigate = useNavigate();
  const [historico, setHistorico] = useState([]);

  // Carrega o histórico salvo no localStorage assim que a página abre
  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem('historico_comparacoes')) || [];
    setHistorico(dadosSalvos);
  }, []);

  // Limpa todo o histórico do navegador
  function handleLimparHistorico() {
    if (confirm("Deseja apagar todo o seu histórico de comparações?")) {
      localStorage.removeItem('historico_comparacoes');
      setHistorico([]);
    }
  }

  // Atalho para rever uma comparação antiga
  function handleReverComparacao(carro1, carro2) {
    navigate('/comparacao', { state: { carrosParaComparar: [carro1, carro2] } });
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#000000', maxWidth: '800px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#ffffff', margin: 30 }}> Histórico de Comparações</h1>
        
        {historico.length > 0 && (
          <button 
            onClick={handleLimparHistorico}
            style={{ padding: '8px px', backgroundColor: '#d9534f', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            🗑️ Limpar Tudo
          </button>
        )}
      </div>

      {historico.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}>
          <p style={{ fontSize: '1.2em', color: '#555' }}>Você ainda não realizou nenhuma comparação.</p>
          <Link to="/" style={{ color: '#0275d8', fontWeight: 'bold', textDecoration: 'none' }}>Ir para o Catálogo e começar</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {historico.map((item) => (
            <div 
              key={item.id} 
              style={{ 
                backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', 
                border: '1px solid #ccc', boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px'
              }}
            >
              <div>
                <span style={{ fontSize: '0.85em', color: '#666', display: 'block', marginBottom: '5px' }}>
                  📅 Realizada em: {item.data}
                </span>
                <span style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#000000' }}>
                  {item.carro1.modelo} <span style={{ color: '#d9534f' }}>VS</span> {item.carro2.modelo}
                </span>
              </div>

              <button 
                onClick={() => handleReverComparacao(item.carro1, item.item2 || item.carro2)}
                style={{
                  padding: '10px 20px', backgroundColor: '#0275d8', color: '#white',
                  border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'
                }}
              >
                Rever Comparação ⚖️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}