import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  function handleLogin(e) {
    e.preventDefault(); // Evita que a página recarregue

    // Validação simples (HARDCODED) - Ideal para projetos acadêmicos
    if (email === 'admin@admin.com' && senha === 'senha123') {
      // Salva no navegador que o usuário está logado
      localStorage.setItem('isAdmin', 'true');
      navigate('/'); // Manda de volta para a Home
    } else {
      setErro('Email ou senha incorretos!');
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f2f2f2', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        
        <h1 style={{ color: '#000000', textAlign: 'center', margin: '0 0 20px 0' }}>🔐 Acesso Admin</h1>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ color: '#333', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Email</label>
            <input 
              type="email" 
              placeholder="admin@admin.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ color: '#333', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Senha</label>
            <input 
              type="password" 
              placeholder="senha123" 
              value={senha} 
              onChange={e => setSenha(e.target.value)} 
              required 
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          {erro && <p style={{ color: '#d9534f', margin: 0, fontWeight: 'bold', textAlign: 'center' }}>{erro}</p>}

          <button 
            type="submit" 
            style={{ padding: '12px', backgroundColor: '#0275d8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1em', marginTop: '10px' }}
          >
            Entrar
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9em' }}>⬅️ Voltar para o Catálogo</Link>
        </div>

      </div>
    </div>
  );
}