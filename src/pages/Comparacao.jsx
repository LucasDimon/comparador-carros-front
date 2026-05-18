import { useLocation, useNavigate } from 'react-router-dom';

export default function Comparacao() {
  const location = useLocation();
  const navigate = useNavigate();

  // Recupera os carros passados pela tela Home através do estado da rota
  const { carros } = location.state || { carros: [] };

  // Caso o usuário tente acessar a URL diretamente sem escolher os carros,
  // exibimos um aviso e um botão para voltar.
  if (!carros || carros.length < 2) {
    return (
      <div style={styles.containerErro}>
        <h2>Nenhum veículo selecionado para comparação</h2>
        <p>Volte para a página inicial e escolha 2 carros.</p>
        <button onClick={() => navigate('/')} style={styles.botaoVoltar}>
          Ir para o Catálogo
        </button>
      </div>
    );
  }

  const [carro1, carro2] = carros;

  // Função auxiliar para formatar preço monetário
  const formatarPreco = (valor) => {
    return valor ? valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }) : 'N/A';
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={() => navigate('/')} style={styles.botaoLinkVoltar}>
          ← Voltar para o Catálogo
        </button>
        <h1 style={styles.titulo}>Comparação Detalhada</h1>
        <p style={styles.subtitulo}>Análise lado a lado das especificações técnicas.</p>
      </header>

      {/* Cabeçalho Visual (Fotos e Nomes dos Carros) */}
      <div style={styles.gridCarros}>
        <div style={styles.colunaCarroVisual}>
          <img src={carro1.imagem} alt={carro1.modelo} style={styles.imagem} />
          <h2 style={styles.nomeCarro}>{carro1.modelo}</h2>
        </div>
        
        <div style={styles.vsContainer}>
          <span style={styles.vsBadge}>VS</span>
        </div>

        <div style={styles.colunaCarroVisual}>
          <img src={carro2.imagem} alt={carro2.modelo} style={styles.imagem} />
          <h2 style={styles.nomeCarro}>{carro2.modelo}</h2>
        </div>
      </div>

      {/* Tabela de Ficha Técnica Completa */}
      <div style={styles.tabelaContainer}>
        <table style={styles.tabela}>
          <thead>
            <tr>
              <th style={styles.th}>Especificação</th>
              <th style={styles.th}>{carro1.modelo}</th>
              <th style={styles.th}>{carro2.modelo}</th>
            </tr>
          </thead>
          <tbody>
            <tr style={styles.linha}>
              <td style={styles.celulaPropriedade}>Preço Estimado</td>
              <td style={{ ...styles.celulaDado, color: '#00e676', fontWeight: 'bold' }}>{formatarPreco(carro1.precio_num)}</td>
              <td style={{ ...styles.celulaDado, color: '#00e676', fontWeight: 'bold' }}>{formatarPreco(carro2.precio_num)}</td>
            </tr>
            <tr style={styles.linhaAlternada}>
              <td style={styles.celulaPropriedade}>Motorização</td>
              <td style={styles.celulaDado}>{carro1.motor}</td>
              <td style={styles.celulaDado}>{carro2.motor}</td>
            </tr>
            <tr style={styles.linha}>
              <td style={styles.celulaPropriedade}>Potência Máxima</td>
              <td style={styles.celulaDado}>{carro1.cv} cv</td>
              <td style={styles.celulaDado}>{carro2.cv} cv</td>
            </tr>
            <tr style={styles.linhaAlternada}>
              <td style={styles.celulaPropriedade}>Torque</td>
              {/* Simulando dados adicionais que virão do banco futuramente */}
              <td style={styles.celulaDado}>{carro1.id === 1 ? '66,3 kgfm' : carro1.id === 2 ? '81,6 kgfm' : '54,0 kgfm'}</td>
              <td style={styles.celulaDado}>{carro2.id === 1 ? '66,3 kgfm' : carro2.id === 2 ? '81,6 kgfm' : '54,0 kgfm'}</td>
            </tr>
            <tr style={styles.linha}>
              <td style={styles.celulaPropriedade}>Aceleração (0-100 km/h)</td>
              <td style={styles.celulaDado}>{carro1.id === 1 ? '3,9s' : carro1.id === 2 ? '3,6s' : '3,7s'}</td>
              <td style={styles.celulaDado}>{carro2.id === 1 ? '3,9s' : carro2.id === 2 ? '3,6s' : '3,7s'}</td>
            </tr>
            <tr style={styles.linhaAlternada}>
              <td style={styles.celulaPropriedade}>Tipo de Tração</td>
              <td style={styles.celulaDado}>{carro1.tracao || 'Traseira'}</td>
              <td style={styles.celulaDado}>{carro2.tracao || 'Traseira'}</td>
            </tr>
            <tr style={styles.linha}>
              <td style={styles.celulaPropriedade}>Transmissão / Câmbio</td>
              <td style={styles.celulaDado}>{carro1.id === 3 ? 'PDK 8 marchas' : 'Automático 8 marchas'}</td>
              <td style={styles.celulaDado}>{carro2.id === 3 ? 'PDK 8 marchas' : 'Automático 8 marchas'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '40px 20px', maxWidth: '1100px', margin: '0 auto' },
  containerErro: { textAlign: 'center', marginTop: '100px', padding: '20px' },
  botaoVoltar: { background: '#007bff', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', marginTop: '20px' },
  
  header: { marginBottom: '40px', position: 'relative' },
  botaoLinkVoltar: { background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', padding: 0, marginBottom: '15px' },
  titulo: { fontSize: '32px', margin: '10px 0 5px 0' },
  subtitulo: { color: '#aaa', fontSize: '16px', margin: 0 },

  gridCarros: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: '50px' },
  colunaCarroVisual: { flex: 1, textBreak: 'break-word', textAlign: 'center', background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #333' },
  imagem: { width: '100%', height: '220px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' },
  nomeCarro: { fontSize: '22px', margin: 0, color: '#fff' },
  
  vsContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  vsBadge: { background: '#ff3d00', color: '#fff', padding: '10px 15px', borderRadius: '50%', fontWeight: 'bold', fontSize: '14px', boxShadow: '0 0 15px rgba(255, 61, 0, 0.4)' },

  tabelaContainer: { background: '#1a1a1a', borderRadius: '12px', border: '1px solid #333', overflow: 'hidden' },
  tabela: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  th: { padding: '18px', background: '#262626', color: '#fff', fontSize: '16px', borderBottom: '2px solid #333' },
  linha: { background: '#1a1a1a', borderBottom: '1px solid #262626' },
  linhaAlternada: { background: '#222222', borderBottom: '1px solid #262626' },
  celulaPropriedade: { padding: '16px', color: '#aaa', fontWeight: 'bold', width: '30%' },
  celulaDado: { padding: '16px', color: '#fff' }
};