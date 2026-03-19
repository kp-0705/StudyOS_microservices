 
import { useAuth } from '../context/AuthContext';

const NAV = [
  { id:'all',    icon:'⬡', label:'All Tasks' },
  { id:'today',  icon:'◎', label:'Today' },
  { id:'done',   icon:'✓', label:'Completed' },
  { id:'dsa',    icon:'◈', label:'DSA Practice' },
  { id:'exam',   icon:'◉', label:'Exams' },
  { id:'assign', icon:'◷', label:'Assignments' },
  { id:'daily',  icon:'◌', label:'Daily Goals' },
  { id:'goal',   icon:'◆', label:'Long-term Goals' },
];

export default function Sidebar({ view, setView, tasks }) {
  const { user, logout } = useAuth();
  const today = new Date().toISOString().split('T')[0];

  const count = (id) => {
    if (id === 'all')   return tasks.length;
    if (id === 'today') return tasks.filter(t => t.dueDate?.startsWith(today)).length;
    if (id === 'done')  return tasks.filter(t => t.done).length;
    return tasks.filter(t => t.category === id).length;
  };

  const done  = tasks.filter(t => t.done).length;
  const total = tasks.length;
  const pct   = total ? Math.round((done / total) * 100) : 0;

  return (
    <aside style={sb}>
      <div style={logo}>
        <div style={{ fontSize:20, fontWeight:800, color:'#4ade80', fontFamily:'sans-serif' }}>StudyOS</div>
        <div style={{ fontSize:10, color:'#6b7280', marginTop:2 }}>PHASE 1 · TASK ENGINE</div>
      </div>

      <div style={{ padding:'14px 10px 6px' }}>
        {NAV.map(n => (
          <div key={n.id} onClick={() => setView(n.id)}
            style={{ ...navItem, background: view===n.id ? 'rgba(74,222,128,0.1)':'transparent',
              color: view===n.id ? '#4ade80':'#6b7280' }}>
            <span style={{ width:18, textAlign:'center' }}>{n.icon}</span>
            <span style={{ flex:1, fontSize:12 }}>{n.label}</span>
            <span style={{ fontSize:9, background:'#1e2330', border:'1px solid rgba(255,255,255,0.08)',
              borderRadius:20, padding:'1px 6px', color:'#6b7280' }}>{count(n.id)}</span>
          </div>
        ))}
      </div>

      <div style={{ flex:1 }} />

      <div style={{ padding:14, borderTop:'1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
          <span style={{ fontSize:10, color:'#6b7280' }}>Overall progress</span>
          <span style={{ fontSize:10, color:'#4ade80', fontWeight:600 }}>{pct}%</span>
        </div>
        <div style={{ height:3, background:'#1e2330', borderRadius:2, marginBottom:14, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${pct}%`, background:'#4ade80', borderRadius:2, transition:'width 0.4s' }} />
        </div>
        <div style={{ fontSize:11, color:'#6b7280', marginBottom:10 }}>
          Signed in as <span style={{ color:'#e8eaf0' }}>{user?.name}</span>
        </div>
        <button onClick={logout}
          style={{ width:'100%', background:'transparent', border:'1px solid rgba(255,255,255,0.1)',
            color:'#6b7280', borderRadius:7, padding:'7px', fontSize:11, cursor:'pointer' }}>
          Sign Out
        </button>
      </div>
    </aside>
  );
}

const sb      = { width:220, minWidth:220, background:'#0f1117', borderRight:'1px solid rgba(255,255,255,0.07)', display:'flex', flexDirection:'column', height:'100vh' };
const logo    = { padding:'20px 18px 16px', borderBottom:'1px solid rgba(255,255,255,0.07)' };
const navItem = { display:'flex', alignItems:'center', gap:9, padding:'8px 10px', borderRadius:7, cursor:'pointer', marginBottom:2, transition:'all 0.15s' };