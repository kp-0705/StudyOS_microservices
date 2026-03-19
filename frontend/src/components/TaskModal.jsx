 
import { useState, useEffect } from 'react';

export default function TaskModal({ onClose, onSave, editTask }) {
  const [form, setForm] = useState({
    title:'', description:'', category:'dsa',
    priority:'med', dueDate:'', progress:0, done:false
  });

  useEffect(() => {
    if (editTask) {
      setForm({
        title:       editTask.title || '',
        description: editTask.description || '',
        category:    editTask.category || 'dsa',
        priority:    editTask.priority || 'med',
        dueDate:     editTask.dueDate ? editTask.dueDate.split('T')[0] : '',
        progress:    editTask.progress || 0,
        done:        editTask.done || false,
      });
    }
  }, [editTask]);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div style={ov} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={modal}>
        <div style={title}>{editTask ? 'Edit Task' : 'New Task'}</div>

        <label style={lbl}>Title *</label>
        <input style={inp} name="title" value={form.title}
          onChange={handle} placeholder="e.g. Striver Sheet Day 12" />

        <label style={lbl}>Description</label>
        <textarea style={{ ...inp, minHeight:60, resize:'vertical' }}
          name="description" value={form.description}
          onChange={handle} placeholder="Optional notes..." />

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <div>
            <label style={lbl}>Category</label>
            <select style={inp} name="category" value={form.category} onChange={handle}>
              <option value="dsa">DSA Practice</option>
              <option value="exam">Exam Prep</option>
              <option value="assign">Assignment</option>
              <option value="daily">Daily Goal</option>
              <option value="goal">Long-term Goal</option>
            </select>
          </div>
          <div>
            <label style={lbl}>Priority</label>
            <select style={inp} name="priority" value={form.priority} onChange={handle}>
              <option value="high">High</option>
              <option value="med">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <div>
            <label style={lbl}>Due Date</label>
            <input style={inp} type="date" name="dueDate"
              value={form.dueDate} onChange={handle} />
          </div>
          <div>
            <label style={lbl}>Progress %</label>
            <input style={inp} type="number" name="progress" min="0" max="100"
              value={form.progress} onChange={handle} />
          </div>
        </div>

        <div style={{ display:'flex', justifyContent:'flex-end', gap:8, marginTop:20 }}>
          <button onClick={onClose}
            style={{ ...savBtn, background:'transparent', border:'1px solid rgba(255,255,255,0.1)', color:'#e8eaf0' }}>
            Cancel
          </button>
          <button onClick={() => form.title && onSave(form)} style={savBtn}>
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
}

const ov    = { position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100 };
const modal = { background:'#0f1117', border:'1px solid rgba(255,255,255,0.1)', borderRadius:14, padding:24, width:460, maxWidth:'94vw', display:'flex', flexDirection:'column', gap:12 };
const title = { fontFamily:'sans-serif', fontSize:18, fontWeight:700, marginBottom:4 };
const lbl   = { fontSize:10, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.08em', display:'block', marginBottom:5 };
const inp   = { width:'100%', background:'#161a23', border:'1px solid rgba(255,255,255,0.1)', borderRadius:7, padding:'9px 11px', color:'#e8eaf0', fontFamily:'monospace', fontSize:12, outline:'none' };
const savBtn = { background:'#4ade80', color:'#000', border:'none', borderRadius:7, padding:'8px 20px', fontWeight:600, fontSize:12, cursor:'pointer' };