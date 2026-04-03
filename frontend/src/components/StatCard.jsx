 
export default function StatCard({ label, value, color }) {
  const colors = {
    green:  { val:'#4ade80', bg:'rgba(74,222,128,0.08)',  bar:'#4ade80' },
    purple: { val:'#818cf8', bg:'rgba(129,140,248,0.08)', bar:'#818cf8' },
    orange: { val:'#fb923c', bg:'rgba(251,146,60,0.08)',  bar:'#fb923c' },
    pink:   { val:'#f472b6', bg:'rgba(244,114,182,0.08)', bar:'#f472b6' },
  };
  const c = colors[color] || colors.green;
  return (
    <div style={{ background:'#0f1117', border:'1px solid rgba(255,255,255,0.07)',
      borderRadius:'10px', padding:'14px 16px', borderTop:`2px solid ${c.bar}` }}>
      <div style={{ color:'#6b7280', fontSize:'10px', textTransform:'uppercase',
        letterSpacing:'0.08em', marginBottom:'6px' }}>{label}</div>
      <div style={{ fontSize:'28px', fontWeight:'800', color: c.val,
        fontFamily:'sans-serif', lineHeight:1 }}>{value}</div>
    </div>
  );
}