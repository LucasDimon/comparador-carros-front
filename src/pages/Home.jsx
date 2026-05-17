import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockCarros = [
  { id: 1, modelo: "BMW M3 Competition", motor: "3.0 TwinPower Turbo", cv: 510, precio_num: 800000, imagem: "https://www.exclusiveautomotivegroup.com/imagetag/3892/main/l/Used-2021-BMW-M3-Competition-1704728839.jpg" },
  { id: 2, modelo: "Audi RS6 Avant", motor: "4.0 V8 Bi-Turbo", cv: 600, precio_num: 1100000, imagem: "https://quatrorodas.abril.com.br/wp-content/uploads/2022/11/Audi-RS6-Avant-Performance-2.jpg?crop=1&resize=1212,909" },
  { id: 3, modelo: "Porsche 911 Carrera S", motor: "3.0 Boxer Bi-Turbo", cv: 450, precio_num: 950000, imagem: "https://s3.ecompletocarros.dev/images/lojas/285/veiculos/205800/veiculoInfoVeiculoImagesMobile/vehicle_image_1723695436_d41d8cd98f00b204e9800998ecf8427e.jpeg" }
];

// Função auxiliar para formatar preço (ex: 800000 -> R$ 800.000)
const formatarPreco = (valor) => {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

export default function Home() {
  const [selecionados, setSelecionados] = useState([]);
  const navigate = useNavigate();

  const toggleSelecao = (carro) => {
    const jaSelecionado = selecionados.find((c) => c.id === carro.id);
    if (jaSelecionado) {
      setSelecionados(selecionados.filter((c) => c.id !== carro.id));
    } else if (selecionados.length < 2) {
      setSelecionados([...selecionados, carro]);
    } else {
      alert("Você já selecionou 2 carros! Desmarque um para escolher outro.");
    }
  };

  const irParaComparacao = () => {
    navigate('/comparacao', { state: { carros: selecionados } });
  };

  return (
    <div style={homeStyles.container}>
      <header style={homeStyles.header}>
        <h1 style={homeStyles.titulo}>Catálogo de Veículos</h1>
        <p style={homeStyles.subtitulo}>Selecione 2 veículos para comparar as especificações lado a lado.</p>
      </header>

      {/* Grid de Carros */}
      <div style={homeStyles.grid}>
        {mockCarros.map((carro) => {
          const isSelecionado = selecionados.some((c) => c.id === carro.id);

          return (
            <div 
              key={carro.id} 
              style={{
                ...homeStyles.card,
                borderColor: isSelecionado ? '#007bff' : '#333', // Borda sutil quando não selecionado
                boxShadow: isSelecionado ? '0 0 15px rgba(0, 123, 255, 0.4)' : 'none'
              }}
              onClick={() => toggleSelecao(carro)}
            >
              {/* Foto do carro com object-fit */}
              <img src={carro.imagem} alt={carro.modelo} style={homeStyles.imagem} />
              
              {/* Informações internas do card */}
              <div style={homeStyles.cardContent}>
                <h3 style={homeStyles.cardModelo}>{carro.modelo}</h3>
                <p style={homeStyles.cardPreco}>{formatarPreco(carro.precio_num)}</p>
                
                <div style={homeStyles.cardSpecs}>
                  <p style={homeStyles.specItem}><span>Motor:</span> {carro.motor}</p>
                  <p style={homeStyles.specItem}><span>Potência:</span> {carro.cv} cv</p>
                </div>
                
                <p style={{
                  ...homeStyles.statusSelecao,
                  color: isSelecionado ? '#007bff' : '#aaa',
                  background: isSelecionado ? 'rgba(0,123,255, 0.1)' : 'rgba(255,255,255,0.05)'
                }}>
                  {isSelecionado ? '✓ Selecionado' : 'Clique para selecionar'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Barra de Ação de Comparação Flutuante */}
      {selecionados.length === 2 && (
        <div style={homeStyles.actionBars}>
          <p>Comparando: **{selecionados[0].modelo}** vs **{selecionados[1].modelo}**</p>
          <button onClick={irParaComparacao} style={homeStyles.buttonCompare}>
            Comparar Agora
          </button>
        </div>
      )}
    </div>
  );
}

const homeStyles = {
  container: { padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', paddingBottom: '120px' },
  header: { textAlign: 'center', marginBottom: '50px' },
  titulo: { fontSize: '36px', fontWeight: 'bold', margin: '0 0 10px 0', letterSpacing: '-1px' },
  subtitulo: { color: '#aaa', fontSize: '18px', maxWidth: '600px', margin: '0 auto' },
  
  grid: { display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' },
  
  card: { 
    width: '320px', 
    background: '#1a1a1a', // Fundo do card ligeiramente mais claro que o corpo
    border: '2px solid', 
    borderRadius: '12px', 
    cursor: 'pointer', 
    overflow: 'hidden', 
    transition: 'all 0.2s ease-out',
    transform: 'translateY(0)',
  },
  imagem: { 
    width: '100%', 
    height: '200px', 
    objectFit: 'cover', // Impede distorção da imagem
    borderBottom: '1px solid #333'
  },
  cardContent: { padding: '20px' },
  cardModelo: { fontSize: '20px', fontWeight: 'bold', margin: '0 0 5px 0', color: '#fff' },
  cardPreco: { fontSize: '22px', fontWeight: 'bold', margin: '0 0 15px 0', color: '#00e676' }, // Verde Neon para preço
  
  cardSpecs: { display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #333', paddingTop: '15px', marginBottom: '20px' },
  specItem: { fontSize: '14px', color: '#ccc', margin: 0 },
  
  statusSelecao: { marginTop: '0px', fontSize: '14px', fontWeight: 'bold', textAlign: 'center', padding: '10px', borderRadius: '6px' },
  
  actionBars: { position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', background: '#212121', border: '1px solid #444', color: '#fff', padding: '15px 30px', borderRadius: '50px', display: 'flex', gap: '20px', alignItems: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.5)', zIndex: 100 },
  buttonCompare: { background: '#007bff', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }
};