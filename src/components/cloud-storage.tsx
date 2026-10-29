import { useEffect, useRef, useState } from 'react';
import { deskCloud } from '@/lib/desk-cloud';
import { useDesk } from '@/lib/desk-store';

export function CloudStorage() {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('Browser backup only — connect to cloud storage.');
  const [connected, setConnected] = useState(false);
  const [busy, setBusy] = useState(false);
  const revision = useRef(0);
  const stopped = useRef(false);
  useEffect(() => {
    if (!connected) return;
    let queue = Promise.resolve();
    return useDesk.subscribe((state, previous) => {
      if (state.done === previous.done && state.leads === previous.leads) return;
      const snapshot = { done: state.done, leads: state.leads };
      setStatus('Saving…');
      queue = queue.then(async () => {
        if (stopped.current) return;
        try {
          const result = await deskCloud({ data: { password, state: snapshot, revision: revision.current } });
          revision.current = result.revision;
          setStatus('Saved to cloud');
        } catch (error) {
          stopped.current = true;
          setStatus(`${error instanceof Error ? error.message : 'Cloud save failed.'} Local backup retained. Refresh to reconnect.`);
        }
      });
    });
  }, [connected, password]);
  async function connect() {
    setBusy(true);
    try {
      let result = await deskCloud({ data: { password } });
      if (!result.state) {
        const { done, leads } = useDesk.getState();
        result = await deskCloud({ data: { password, state: { done, leads }, revision: 0 } });
      }
      useDesk.setState({ done: result.state.done, leads: result.state.leads });
      revision.current = result.revision;
      stopped.current = false;
      setConnected(true);
      setStatus('Connected — changes save automatically');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not connect.');
    } finally { setBusy(false); }
  }
  return <aside style={{ padding: '12px 24px', background: '#f5efe3', color: '#1f3d32' }}>
    <strong>Cloud storage</strong> · <span role="status">{status}</span>
    {!connected && <form onSubmit={e => { e.preventDefault(); void connect(); }} style={{ display: 'inline-flex', gap: 8, marginLeft: 12 }}>
      <input aria-label="Workspace password" type="password" autoComplete="current-password" placeholder="Workspace password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button disabled={busy}>{busy ? 'Connecting…' : 'Connect'}</button>
    </form>}
  </aside>;
}
