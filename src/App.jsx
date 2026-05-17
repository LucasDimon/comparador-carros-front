import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Comparacao from './pages/Comparacao';
import Historico from './pages/Historico';

function App() {
  return (
    <BrowserRouter>
      {/* Barra de Navegação Moderna */}
      <nav style={navStyles.navbar}>
        <div style={navStyles.container}>
          <Link to="/" style={navStyles.logo}>🏎️ AutoCompare</Link>
          <div style={navStyles.links}>
            <Link to="/" style={navStyles.link}>Home</Link>
            <Link to="/historico" style={navStyles.link}>Histórico</Link>
            <Link to="/login" style={navStyles.button}>Entrar</Link>
          </div>
        </div>
      </nav>

      {/* Conteúdo das Rotas */}
      <main style={navStyles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/comparacao" element={<Comparacao />} />
          <Route path="/historico" element={<Historico />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

const navStyles = {
  navbar: {
    background: '#1a1a1a', // Preto ligeiramente mais claro
    borderBottom: '1px solid #333',
    padding: '15px 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '22px',
    fontWeight: 'bold',
    fontFamily: 'sans-serif'
  },
  links: {
    display: 'flex',
    gap: '25px',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#aaa', // Cinza para links não ativos
    fontSize: '16px',
    transition: 'color 0.2s'
  },
  button: {
    textDecoration: 'none',
    background: '#007bff',
    color: '#fff',
    padding: '8px 18px',
    borderRadius: '20px',
    fontSize: '15px',
    fontWeight: 'bold'
  },
  main: {
    minHeight: 'calc(100vh - 71px)', // Ocupa a tela toda tirando a navbar
    background: '#121212', // Fundo principal super escuro
    color: '#fff',
    fontFamily: 'Arial, sans-serif'
  }
};

export default App;