 
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [form, setForm]     = useState({ email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>StudyOS</div>
        <div style={styles.sub}>Sign in to your workspace</div>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={submit}>
          <div style={styles.group}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} name="email" type="email"
              placeholder="you@example.com" value={form.email} onChange={handle} required />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Password</label>
            <input style={styles.input} name="password" type="password"
              placeholder="••••••••" value={form.password} onChange={handle} required />
          </div>
          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p style={styles.link}>
          No account? <Link to="/register" style={{ color: '#4ade80' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page:  { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0a0c10' },
  card:  { background:'#0f1117', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'14px', padding:'36px', width:'380px' },
  logo:  { fontFamily:'sans-serif', fontSize:'28px', fontWeight:'800', color:'#4ade80', marginBottom:'6px' },
  sub:   { color:'#6b7280', fontSize:'13px', marginBottom:'24px' },
  error: { background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.3)', color:'#f87171', padding:'10px', borderRadius:'7px', fontSize:'12px', marginBottom:'16px' },
  group: { marginBottom:'16px' },
  label: { display:'block', fontSize:'11px', color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'6px' },
  input: { width:'100%', background:'#161a23', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'7px', padding:'10px 12px', color:'#e8eaf0', fontFamily:'monospace', fontSize:'13px', outline:'none' },
  btn:   { width:'100%', background:'#4ade80', color:'#000', border:'none', borderRadius:'7px', padding:'11px', fontWeight:'600', fontSize:'13px', cursor:'pointer', marginTop:'8px' },
  link:  { color:'#6b7280', fontSize:'12px', textAlign:'center', marginTop:'16px' },
};