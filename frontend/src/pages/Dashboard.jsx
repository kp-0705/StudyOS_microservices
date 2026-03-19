 
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import taskService from '../services/taskService';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

export default function Dashboard() {
  const { token } = useAuth();
  const [tasks,   setTasks]   = useState([]);
  const [view,    setView]    = useState('all');
  const [modal,   setModal]   = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [search,  setSearch]  = useState('');

  const fetchTasks = useCallback(async () => {
    try {
      const res = await taskService.getTasks(token);
      setTasks(res.data);
    } catch (err) { console.error(err); }
  }, [token]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const getFiltered = () => {
    const today = new Date().toISOString().split('T')[0];
    let list = tasks;
    if (view === 'today') list = list.filter(t => t.dueDate?.startsWith(today));
    else if (view === 'done') list = list.filter(t => t.done);
    else if (['dsa','exam','assign','daily','goal'].includes(view))
      list = list.filter(t => t.category === view);
    if (search) list = list.filter(t =>
      t.title.toLowerCase().includes(search.toLowerCase()));
    return list.sort((a,b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      const p = {high:0,med:1,low:2};
      return (p[a.priority]||1) - (p[b.priority]||1);
    });
  };

  const handleSave = async (form) => {
    try {
      if (editTask) {
        await taskService.updateTask(token, editTask._id, form);
      } else {
        await taskService.createTask(token, form);
      }
      await fetchTasks();
      setModal(false); setEditTask(null);
    } catch (err) { console.error(err); }
  };

  const handleToggle = async (id, done) => {
    try {
      await taskService.updateTask(token, id, { done, progress: done ? 100 : 0 });
      await fetchTasks();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    try {
      await taskService.deleteTask(token, id);
      await fetchTasks();
    } catch (err) { console.error(err); }
  };

  const today = new Date().toISOString().split('T')[0];
  const soon  = new Date(); soon.setDate(soon.getDate()+3);
  const soonStr = soon.toISOString().split('T')[0];

  const viewTitles = { all:'All Tasks', today:"Today's Tasks", done:'Completed', dsa:'DSA Practice', exam:'Exam Prep', assign:'Assignments', daily:'Daily Goals', goal:'Long-term Goals' };

  return (
    <div style={{ display:'flex', height:'100vh', background:'#0a0c10' }}>
      <Sidebar view={view} setView={setView} tasks={tasks} />

      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        {/* Topbar */}
        <div style={topbar}>
          <div style={{ fontFamily:'sans-serif', fontSize:18, fontWeight:700 }}>
            {viewTitles[view] || 'Tasks'}
          </div>
          <div style={{ color:'#6b7280', fontSize:11 }}>
            {new Date().toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}
          </div>
          <div style={{ flex:1 }}/>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Search tasks..."
            style={{ background:'#161a23', border:'1px solid rgba(255,255,255,0.08)', borderRadius:7,
              padding:'6px 12px', color:'#e8eaf0', fontFamily:'monospace', fontSize:11, outline:'none', width:180 }}/>
          <button onClick={()=>{ setEditTask(null); setModal(true); }}
            style={{ background:'#4ade80', color:'#000', border:'none', borderRadius:7,
              padding:'8px 16px', fontWeight:600, fontSize:12, cursor:'pointer' }}>
            + Add Task
          </button>
        </div>

        {/* Content */}
        <div style={{ flex:1, overflowY:'auto', padding:'20px 24px', display:'flex', flexDirection:'column', gap:16 }}>
          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
            <StatCard label="Total Tasks"  value={tasks.length} color="green" />
            <StatCard label="DSA Solved"   value={tasks.filter(t=>t.category==='dsa'&&t.done).length} color="purple"/>
            <StatCard label="Due Soon"     value={tasks.filter(t=>!t.done&&t.dueDate&&t.dueDate>=today&&t.dueDate<=soonStr).length} color="orange"/>
            <StatCard label="Completed"    value={tasks.filter(t=>t.done).length} color="pink"/>
          </div>

          {/* Task list */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
              <span style={{ fontFamily:'sans-serif', fontSize:14, fontWeight:700 }}>
                {viewTitles[view]}
              </span>
              <span style={{ fontSize:10, color:'#6b7280', background:'#161a23',
                border:'1px solid rgba(255,255,255,0.07)', padding:'1px 8px', borderRadius:20 }}>
                {getFiltered().length}
              </span>
              <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.07)' }}/>
            </div>

            {getFiltered().length === 0
              ? <div style={{ textAlign:'center', padding:40, color:'#6b7280', fontSize:12 }}>
                  No tasks here. Add one!
                </div>
              : getFiltered().map(t => (
                  <TaskCard key={t._id} task={t}
                    onToggle={handleToggle}
                    onEdit={(task) => { setEditTask(task); setModal(true); }}
                    onDelete={handleDelete} />
                ))
            }
          </div>
        </div>
      </div>

      {modal && (
        <TaskModal
          editTask={editTask}
          onClose={() => { setModal(false); setEditTask(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

const topbar = { display:'flex', alignItems:'center', gap:12, padding:'14px 24px', borderBottom:'1px solid rgba(255,255,255,0.07)', background:'#0f1117' };