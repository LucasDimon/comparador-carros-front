import { useLocation, Link } from 'react-router-dom';

export default function Comparacao() {
  const location = useLocation();
  // Captura os carros passados através da navegação
  const carros = location.state?.carrosParaComparar || [];

  // Se o usuário entrou direto na URL sem escolher carros
  if (carros.length !== 2) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#000', textAlign: 'center' }}>
        <h2>Nenhum carro selecionado para comparação!</h2>
        <p>Volte para a página inicial e escolha 2 carros.</p>
        <Link to="/" style={{ padding: '10px 20px', backgroundColor: '#0275d8', color: '#fff', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
          Voltar para a Home
        </Link>
      </div>
    );
  }

  const [carro1, carro2] = carros;

  // Descobre qual tem mais cavalos para destacar
  const maisPotenteId = carro1.cv > carro2.cv ? carro1.id : carro2.cv > carro1.cv ? carro2.id : null;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#000000', maxWidth: '900px', margin: '0 auto' }}>
      
      <div style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#0275d8', fontWeight: 'bold' }}>
          ⬅️ Voltar para o Catálogo
        </Link>
      </div>

      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>⚖️ Comparação de Veículos</h1>

      {/* TABELA COMPARATIVA */}
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '15px', borderBottom: '2px solid #ddd', width: '30%', color: '#000' }}>Atributo</th>
            <th style={{ padding: '15px', borderBottom: '2px solid #ddd', width: '35%', color: '#000' }}>{carro1.modelo}</th>
            <th style={{ padding: '15px', borderBottom: '2px solid #ddd', width: '35%', color: '#000' }}>{carro2.modelo}</th>
          </tr>
        </thead>
        <tbody>
          {/* Linha das Imagens */}
          <tr>
            <td style={{ padding: '15px', fontWeight: 'bold', borderBottom: '1px solid #eee' }}>Visual</td>
            <td style={{ padding: '15px', borderBottom: '1px solid #eee', textAlign: 'center' }}>
              <img src={carro1.imagem} alt={carro1.modelo} style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '4px' }} />
            </td>
            <td style={{ padding: '15px', borderBottom: '1px solid #eee', textAlign: 'center' }}>
              <img src={carro2.imagem} alt={carro2.modelo} style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '4px' }} />
            </td>
          </tr>

          {/* Linha do Motor */}
          <tr>
            <td style={{ padding: '15px', fontWeight: 'bold', borderBottom: '1px solid #eee' }}>Motorização</td>
            <td style={{ padding: '15px', borderBottom: '1px solid #eee', color: '#000' }}>{carro1.motor}</td>
            <td style={{ padding: '15px', borderBottom: '1px solid #eee', color: '#000' }}>{carro2.motor}</td>
          </tr>

          {/* Linha da Potência (Com Destaque) */}
          <tr>
            <td style={{ padding: '15px', fontWeight: 'bold', borderBottom: '1px solid #eee' }}>Potência (CV)</td>
            <td style={{ 
              padding: '15px', borderBottom: '1px solid #eee', color: '#000',
              backgroundColor: maisPotenteId === carro1.id ? '#e2f0d9' : 'transparent',
              fontWeight: maisPotenteId === carro1.id ? 'bold' : 'normal'
            }}>
              {carro1.cv} cv {maisPotenteId === carro1.id && '🏆 (Mais Potente)'}
            </td>
            <td style={{ 
              padding: '15px', borderBottom: '1px solid #eee', color: '#000',
              backgroundColor: maisPotenteId === carro2.id ? '#e2f0d9' : 'transparent',
              fontWeight: maisPotenteId === carro2.id ? 'bold' : 'normal'
            }}>
              {carro2.cv} cv {maisPotenteId === carro2.id && '🏆 (Mais Potente)'}
            </td>
          </tr>

          {/* Linha da Tração */}
          <tr>
            <td style={{ padding: '15px', fontWeight: 'bold', borderBottom: '1px solid #eee' }}>Tipo de Tração</td>
            <td style={{ padding: '15px', borderBottom: '1px solid #eee', color: '#000' }}>{carro1.tracao}</td>
            <td style={{ padding: '15px', borderBottom: '1px solid #eee', color: '#000' }}>{carro2.tracao}</td>
          </tr>

          {/* Linha do Preço */}
          <tr>
            <td style={{ padding: '15px', fontWeight: 'bold', borderBottom: '1px solid #eee' }}>Investimento</td>
            <td style={{ padding: '15px', borderBottom: '1px solid #eee', color: '#28a745', fontWeight: 'bold' }}>
              R$ {carro1.precio_num?.toLocaleString('pt-BR')}
            </td>
            <td style={{ padding: '15px', borderBottom: '1px solid #eee', color: '#28a745', fontWeight: 'bold' }}>
              R$ {carro2.precio_num?.toLocaleString('pt-BR')}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}