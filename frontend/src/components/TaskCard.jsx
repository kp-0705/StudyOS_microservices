 
export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const tagColors = {
    dsa:    { bg:'rgba(129,140,248,0.15)', color:'#818cf8' },
    exam:   { bg:'rgba(251,146,60,0.15)',  color:'#fb923c' },
    assign: { bg:'rgba(56,189,248,0.15)',  color:'#38bdf8' },
    daily:  { bg:'rgba(74,222,128,0.15)',  color:'#4ade80' },
    goal:   { bg:'rgba(244,114,182,0.15)', color:'#f472b6' },
  };
  const priColors = { high:'#f87171', med:'#fbbf24', low:'#6b7280' };
  const tag = tagColors[task.category] || tagColors.daily;

  const dueLabel = () => {
    if (!task.dueDate) return null;
    const today = new Date(); today.setHours(0,0,0,0);
    const due   = new Date(task.dueDate);
    const diff  = Math.round((due - today) / 86400000);
    if (diff < 0)  return { text:`${Math.abs(diff)}d overdue`, color:'#f87171' };
    if (diff === 0) return { text:'Due today',    color:'#fbbf24' };
    if (diff === 1) return { text:'Due tomorrow', color:'#fbbf24' };
    return { text:`Due in ${diff}d`, color:'#6b7280' };
  };
  const dl = dueLabel();

  return (
    <div style={{ background: task.done ? 'rgba(15,17,23,0.5)' : '#0f1117',
      border:'1px solid rgba(255,255,255,0.07)', borderRadius:'10px',
      padding:'12px 14px', display:'flex', alignItems:'flex-start', gap:'12px',
      marginBottom:'6px', opacity: task.done ? 0.5 : 1,
      transition:'all 0.15s' }}>

      {/* Priority dot */}
      <div style={{ width:6, height:6, borderRadius:'50%', marginTop:6, flexShrink:0,
        background: priColors[task.priority] || '#6b7280' }} />

      {/* Checkbox */}
      <div onClick={() => onToggle(task._id, !task.done)}
        style={{ width:18, height:18, border:`1.5px solid ${task.done ? '#4ade80' : 'rgba(255,255,255,0.2)'}`,
          borderRadius:5, display:'flex', alignItems:'center', justifyContent:'center',
          cursor:'pointer', flexShrink:0, background: task.done ? '#4ade80' : 'transparent',
          color:'#000', fontSize:10, marginTop:1 }}>
        {task.done ? '✓' : ''}
      </div>

      {/* Body */}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13, fontWeight:500, marginBottom:4,
          textDecoration: task.done ? 'line-through' : 'none', color:'#e8eaf0' }}>
          {task.title}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
          <span style={{ fontSize:9, fontWeight:600, padding:'2px 7px', borderRadius:4,
            textTransform:'uppercase', letterSpacing:'0.06em', ...tag }}>
            {task.category}
          </span>
          {dl && <span style={{ fontSize:10, color: dl.color }}>⏱ {dl.text}</span>}
          {task.description &&
            <span style={{ fontSize:10, color:'#6b7280', overflow:'hidden',
              textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:180 }}>
              {task.description}
            </span>}
        </div>
      </div>

      {/* Progress + actions */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <span style={{ fontSize:9, color:'#6b7280' }}>{task.progress}%</span>
          <div style={{ width:60, height:3, background:'#1e2330', borderRadius:2, overflow:'hidden' }}>
            <div style={{ height:'100%', width:`${task.progress}%`,
              background: tag.color, borderRadius:2 }} />
          </div>
        </div>
        <div style={{ display:'flex', gap:4 }}>
          <button onClick={() => onEdit(task)}
            style={btnStyle}>✎</button>
          <button onClick={() => onDelete(task._id)}
            style={{ ...btnStyle, color:'#f87171' }}>✕</button>
        </div>
      </div>
    </div>
  );
}

const btnStyle = {
  background:'none', border:'1px solid transparent', color:'#6b7280',
  cursor:'pointer', borderRadius:5, width:24, height:24,
  display:'flex', alignItems:'center', justifyContent:'center', fontSize:13
};