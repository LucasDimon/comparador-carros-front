import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Comparacao from './pages/Comparacao';
import Historico from './pages/Historico';

function App() {
  return (
    <BrowserRouter>
      {/* Menu de Navegação Provisório */}
      <nav style={{ padding: '10px', background: '#222', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
        <Link to="/historico" style={{ marginRight: '10px' }}>Histórico</Link>
      </nav>

      {/* Configuração das Rotas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/comparacao" element={<Comparacao />} />
        <Route path="/historico" element={<Historico />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;