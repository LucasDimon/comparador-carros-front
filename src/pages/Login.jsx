import { useState } from 'react';

export default function Login() {
  // Estados para controlar os inputs e a tela
  const [isLogin, setIsLogin] = useState(true);
  const [nome, setNome] = useState(''); // <-- Novo estado para o Nome Completo
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função que será chamada ao enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    // Mostra no console o que seria enviado ao banco de dados
    if (isLogin) {
      console.log("Fazendo Login:", { email, password });
      alert("Simulando Login...");
    } else {
      console.log("Criando Cadastro:", { nome, email, password });
      alert("Simulando Cadastro...");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{isLogin ? 'Entrar no Sistema' : 'Criar Nova Conta'}</h2>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          
          {/* Renderização Condicional: Só aparece se NÃO for login (isLogin === false) */}
          {!isLogin && (
            <div style={styles.inputGroup}>
              <label>Nome Completo:</label>
              <input 
                type="text" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                style={styles.input}
                placeholder="Digite seu nome completo"
              />
            </div>
          )}

          <div style={styles.inputGroup}>
            <label>E-mail:</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              placeholder="Digite seu e-mail"
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Senha:</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="Digite sua senha"
            />
          </div>

          <button type="submit" style={styles.button}>
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>

        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          {isLogin ? 'Ainda não tem conta? ' : 'Já possui uma conta? '}
          <button 
            type="button" 
            onClick={() => {
              setIsLogin(!isLogin);
              setNome(''); // Limpa o campo de nome ao alternar de tela
            }}
            style={styles.toggleButton}
          >
            {isLogin ? 'Cadastre-se aqui' : 'Faça login aqui'}
          </button>
        </p>
      </div>
    </div>
  );
}

// Estilos básicos
const styles = {
  container: { display: 'flex', justifyContent: 'center', marginTop: '50px' },
  card: { padding: '30px', border: '1px solid #ccc', borderRadius: '8px', width: '350px', background: '#f9f9f9' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc' },
  button: { padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  toggleButton: { background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline', padding: 0 }
};