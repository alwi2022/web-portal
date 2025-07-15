import React, { useState, useEffect } from 'react';

// Simple terminal components with clean design

const TerminalHeader = ({ apiConnected }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="header">
      <div className="header-left">
        <span className="prompt">root@synqbox</span>
        <span className="path">:~/control#</span>
      </div>
      <div className="header-right">
  <span className="status api-disconnected">
    <span className="status-pulse"></span>
     DEMO MODE
  </span>
  <span className="status">
    <span className="status-pulse-green"></span>
     ONLINE
  </span>
  <span className="time">{currentTime.toLocaleTimeString()}</span>
</div>
    </div>
  );
};

const Terminal = ({ title, children }) => (
  <div className="terminal">
    <div className="terminal-header">
      <span className="terminal-title">{title}</span>
    </div>
    <div className="terminal-body">
      {children}
    </div>
  </div>
);

const GlobalSyncMap = () => {
  useEffect(() => {
    const viz = document.getElementById('networkViz');
    if (!viz) return;

    // Clear existing nodes
    viz.innerHTML = '';

    const nodes = 15;
    for (let i = 0; i < nodes; i++) {
      const node = document.createElement('div');
      node.className = 'node';
      node.style.left = Math.random() * 95 + '%';
      node.style.top = Math.random() * 95 + '%';
      node.style.animationDelay = Math.random() * 3 + 's';
      viz.appendChild(node);
    }

    const connections = 8;
    for (let i = 0; i < connections; i++) {
      const conn = document.createElement('div');
      conn.className = 'connection';
      conn.style.left = Math.random() * 90 + '%';
      conn.style.top = Math.random() * 90 + '%';
      conn.style.width = Math.random() * 100 + 50 + 'px';
      conn.style.transform = `rotate(${Math.random() * 360}deg)`;
      conn.style.animationDelay = Math.random() * 2 + 's';
      viz.appendChild(conn);
    }
  }, []);

  return (
    <div className="full-width">
      <Terminal title="global_sync_map">
        <div style={{ padding: '10px', textAlign: 'center' }}>
          <div id="networkViz" className="network-viz" />
          <div style={{ marginTop: '10px', color: '#aaa' }}>
            <strong>1,337</strong> active synchronizers worldwide
          </div>
        </div>
      </Terminal>
    </div>
  );
};

const ShitpostCorner = ({ addLog }) => {
  const [active, setActive] = useState(false);

  const toggle = () => {
    setActive(prev => !prev);
    addLog(active ? 'Shitpost mode: deactivated' : 'Shitpost mode: ACTIVATED');
    addLog(active ? 'Based level: off' : 'Based level: MAXIMUM');
  };

  return (
    <div
      className="shitpost-corner"
      onClick={toggle}
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid #4ecdc4',
        padding: '15px',
        borderRadius: '10px',
        cursor: 'pointer',
        color: '#ffd93d',
        backdropFilter: 'blur(10px)',
        fontSize: '0.9rem',
        animation: 'bounce 2s infinite',
        zIndex: 999,
      }}
    >
      {active ? (
        <>
          <div>🌙 gm synqers</div>
          <div style={{ fontSize: '0.8rem', marginTop: 5 }}>we're so back</div>
        </>
      ) : (
        <>
          <div>🚀 GM Synqers!</div>
          <div style={{ fontSize: '0.8rem', marginTop: 5 }}>Click for more based content</div>
        </>
      )}
    </div>
  );
};



const StatusLine = ({ label, value, status = "ok" }) => (
  <div className="status-line">
    <span className="label">[{label.toUpperCase()}]</span>
    <span className="dots">{'·'.repeat(25 - label.length)}</span>
    <span className={`value ${status}`}>{value}</span>
  </div>
);

const Button = ({ onClick, children, type = "default" }) => (
  <button className={`btn ${type}`} onClick={onClick}>
    {children}
  </button>
);

const App = () => {
  const [nodeData, setNodeData] = useState({
    uptime: '72:15:43',
    syncPoints: 1247392,
    peers: 847,
    latency: 12,
    cpu: 23,
    temp: 42,
    accuracy: 99.97,
    lastSync: 2,
    earnings: 42847
  });

  const [walletConnected, setWalletConnected] = useState(true);
  const [logs, setLogs] = useState([
    'SynqBox Control Portal v2.0.0 initialized',
    'Connection to Multisynq network established',
    'Monad wallet detected and connected',
    'System ready for commands'
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [apiConnected, setApiConnected] = useState(false);




  // Real-time data fetching (mock only)
  const fetchNodeData = async () => {
    // Using mock data only for now
    setNodeData(prev => ({
      ...prev,
      syncPoints: prev.syncPoints + Math.floor(Math.random() * 15),
      peers: 847 + Math.floor(Math.random() * 20) - 10,
      latency: 8 + Math.floor(Math.random() * 15),
      cpu: 15 + Math.floor(Math.random() * 20),
      temp: 40 + Math.floor(Math.random() * 8),
      lastSync: Math.floor(Math.random() * 5)
    }));
    setApiConnected(false); // Always mock mode
    addLog('Data refreshed (mock mode)');
  };

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNodeData(prev => ({
        ...prev,
        syncPoints: prev.syncPoints + Math.floor(Math.random() * 15),
        peers: 847 + Math.floor(Math.random() * 20) - 10,
        latency: 8 + Math.floor(Math.random() * 15),
        cpu: 15 + Math.floor(Math.random() * 20),
        temp: 40 + Math.floor(Math.random() * 8),
        lastSync: Math.floor(Math.random() * 5)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-8), `[${timestamp}] ${message}`]);
  };

  const executeCommand = (cmd) => {
    const commands = {
      'restart': () => {
        addLog('Initiating node restart...');
        setTimeout(() => addLog('Node restart completed (simulation)'), 1500);
      },
      'sync': () => {
        addLog('Force sync initiated...');
        fetchNodeData();
        setTimeout(() => addLog('Sync completed successfully'), 1000);
      },
      'status': () => addLog(`Status: ${nodeData.peers} peers, ${nodeData.temp}°C, Mock simulation active`),
      'wallet': () => {
        setWalletConnected(!walletConnected);
        addLog(`Wallet ${!walletConnected ? 'connected' : 'disconnected'}`);
      },
      'help': () => addLog('Commands: restart, sync, status, wallet, clear'),
      'clear': () => setLogs(['Terminal cleared'])
    };

    addLog(`$ ${cmd}`);
    const command = commands[cmd.toLowerCase()];
    if (command) {
      setTimeout(command, 500);
    } else {
      addLog(`Command not found: ${cmd}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && currentCommand.trim()) {
      executeCommand(currentCommand.trim());
      setCurrentCommand('');
    }
  };

  return (
    <div className="app">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .network-viz {
  width: 100%;
  height: 200px;
  background: radial-gradient(circle, rgba(0, 245, 255, 0.1) 0%, transparent 70%);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.status-pulse {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #ffd93d;
  border-radius: 50%;
  margin-right: 8px;
  animation: pulse-yellow 2s infinite;
}

.status-pulse-green {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #4ecdc4;
  border-radius: 50%;
  margin-right: 8px;
  animation: pulse-green 2s infinite;
}

@keyframes pulse-yellow {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.5); }
}

@keyframes pulse-green {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.5); }
}

.node {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #00f5ff;
  border-radius: 50%;
  box-shadow: 0 0 10px #00f5ff;
  animation: float 3s ease-in-out infinite;
}

.connection {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00f5ff, transparent);
  animation: pulse 2s infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}


        .app {
          font-family: 'Courier New', monospace;
          background: #0a0a0a;
          color: #c0c0c0;
          min-height: 100vh;
          padding: 20px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background: #1a1a1a;
          border: 1px solid #333;
          margin-bottom: 20px;
        }

        .prompt {
          color: #ff6b6b;
          font-weight: bold;
        }

        .path {
          color: #4ecdc4;
        }

        .header-right {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .status {
          color: #4ecdc4;
        }

        .status.api-connected {
          color: #4ecdc4;
        }

        .status.api-disconnected {
          color: #ffd93d;
        }

        .time {
          color: #ffd93d;
          font-size: 0.9rem;
        }

        .synqbox-hero {
          grid-column: 1 / -1;
          background: #1a1a1a;
          border: 1px solid #333;
          padding: 30px;
          text-align: center;
          margin-bottom: 20px;
        }

        .synqbox-image {
          width: 200px;
          height: auto;
          margin: 0 auto 20px;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }

        .hero-title {
          font-size: 1.5rem;
          color: #4ecdc4;
          margin-bottom: 10px;
        }

        .hero-subtitle {
          color: #c0c0c0;
          margin-bottom: 15px;
        }

        .api-status {
          display: inline-block;
          padding: 5px 15px;
          background: rgba(255, 217, 61, 0.1);
          border: 1px solid #ffd93d;
          color: #ffd93d;
          border-radius: 20px;
          font-size: 0.8rem;
        }

        .api-status.connected {
          background: rgba(78, 205, 196, 0.1);
          border-color: #4ecdc4;
          color: #4ecdc4;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .full-width {
          grid-column: 1 / -1;
        }

        .two-third {
          grid-column: span 2;
        }

        .terminal {
          background: #1a1a1a;
          border: 1px solid #333;
        }

        .terminal-header {
          padding: 10px 15px;
          background: #2a2a2a;
          border-bottom: 1px solid #333;
        }

        .terminal-title {
          color: #4ecdc4;
          font-size: 0.9rem;
        }

        .terminal-body {
          padding: 20px;
        }

        .status-line {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          font-size: 0.9rem;
        }

        .label {
          color: #ffd93d;
          min-width: 100px;
        }

        .dots {
          color: #333;
          flex: 1;
        }

        .value {
          color: #4ecdc4;
          font-weight: bold;
          min-width: 80px;
          text-align: right;
        }

        .value.warning {
          color: #ffd93d;
        }

        .value.error {
          color: #ff6b6b;
        }

        .controls {
          grid-column: 1 / -1;
        }

        .btn-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }

        .btn {
          padding: 12px 20px;
          background: #2a2a2a;
          border: 1px solid #4ecdc4;
          color: #4ecdc4;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s ease;
        }

        .btn:hover {
          background: #4ecdc4;
          color: #1a1a1a;
        }

        .btn.danger {
          border-color: #ff6b6b;
          color: #ff6b6b;
        }

        .btn.danger:hover {
          background: #ff6b6b;
          color: #1a1a1a;
        }

        .terminal-input {
          grid-column: 1 / -1;
        }

        .logs {
          max-height: 150px;
          overflow-y: auto;
          margin-bottom: 15px;
          padding: 10px;
          background: #0a0a0a;
          border: 1px solid #333;
        }

        .log-line {
          margin-bottom: 4px;
          font-size: 0.85rem;
        }

        .input-line {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .input-prompt {
          color: #ffd93d;
        }

        .input {
          flex: 1;
          background: transparent;
          border: none;
          color: #c0c0c0;
          font-family: inherit;
          outline: none;
          padding: 5px;
        }

        .wallet {
          grid-column: 1 / -1;
          text-align: center;
        }

        .wallet-status {
          margin-bottom: 15px;
          color: ${walletConnected ? '#4ecdc4' : '#ff6b6b'};
        }

        .wallet-address {
          font-size: 0.8rem;
          color: #ffd93d;
          background: #0a0a0a;
          padding: 10px;
          border: 1px solid #333;
          margin-bottom: 15px;
          word-break: break-all;
        }

        .info {
          grid-column: 1 / -1;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 15px;
        }

        .tag {
          background: #2a2a2a;
          border: 1px solid #4ecdc4;
          color: #4ecdc4;
          padding: 4px 12px;
          font-size: 0.8rem;
        }

        .meme {
          grid-column: 1 / -1;
          text-align: center;
        }

        .meme-text {
          color: #ff6b6b;
          font-size: 1rem;
          margin-bottom: 10px;
          font-style: italic;
        }

        @media (max-width: 1024px) {
          .grid {
            grid-template-columns: 1fr 1fr;
          }
          
          .full-width {
            grid-column: 1 / -1;
          }
          
          .two-third {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }
          
          .full-width, .two-third {
            grid-column: 1;
          }
          
          .btn-grid {
            grid-template-columns: 1fr 1fr;
          }
          
          .header {
            flex-direction: column;
            gap: 10px;
          }
          
          .synqbox-image {
            width: 150px;
          }
          
          .hero-title {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .app {
            padding: 10px;
          }
          
          .btn-grid {
            grid-template-columns: 1fr;
          }
          
          .container {
            padding: 0;
          }
          
          .terminal-body {
            padding: 15px;
          }
          
          .header {
            padding: 10px 15px;
          }
          
          .synqbox-image {
            width: 120px;
          }
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }

        ::-webkit-scrollbar-thumb {
          background: #4ecdc4;
        }
      `}</style>

      <div className="container">
        <TerminalHeader apiConnected={apiConnected} />

        <div className="synqbox-hero">
          <img
            src="/synboxhardware.png"
            alt="SynqBox Hardware"
            className="synqbox-image"
          />
          <div className="hero-title">SynqBox Hardware Control Portal</div>
          <div className="hero-subtitle">Professional synchronizer node management interface</div>
          <div className="api-status">
            ● Contest Demo Mode
          </div>
        </div>

        <div className="grid">
          <Terminal title="node_status">
            <StatusLine label="uptime" value={nodeData.uptime} />
            <StatusLine label="sync_points" value={nodeData.syncPoints.toLocaleString()} />
            <StatusLine label="peers" value={nodeData.peers} />
            <StatusLine label="latency" value={`${nodeData.latency}ms`} status={nodeData.latency > 30 ? 'warning' : 'ok'} />
            <StatusLine label="cpu" value={`${nodeData.cpu}%`} status={nodeData.cpu > 70 ? 'warning' : 'ok'} />
            <StatusLine label="temp" value={`${nodeData.temp}°C`} status={nodeData.temp > 50 ? 'warning' : 'ok'} />
            <StatusLine label="accuracy" value={`${nodeData.accuracy}%`} />
            <StatusLine label="last_sync" value={`${nodeData.lastSync}s ago`} />
          </Terminal>

          <Terminal title="earnings">
            <StatusLine label="daily" value={`${nodeData.earnings.toLocaleString()} SP`} />
            <StatusLine label="weekly" value={`${(nodeData.earnings * 7).toLocaleString()} SP`} />
            <StatusLine label="monthly" value={`${(nodeData.earnings * 30).toLocaleString()} SP`} />
            <StatusLine label="rank" value="#127" />
            <StatusLine label="multiplier" value="2.3x" />
            <StatusLine label="efficiency" value="98.2%" />
            <StatusLine label="rewards" value="Active" />
            <StatusLine label="boost" value="Elite Package" />
          </Terminal>

          <Terminal title="system_info">
            <StatusLine label="hardware" value="SynqBox v1.0" />
            <StatusLine label="memory" value="67% used" />
            <StatusLine label="storage" value="23.4 GB" />
            <StatusLine label="network" value="1.2 MB/s" />
            <StatusLine label="uptime_pct" value="99.9%" />
            <StatusLine label="version" value="2.0.0" />
            <StatusLine label="errors" value="0" />
            <StatusLine label="restarts" value="1" />
          </Terminal>

          <div className="full-width">
            <Terminal title="controls">
              <div className="btn-grid">
                <Button onClick={() => executeCommand('sync')}>Force Sync</Button>
                <Button onClick={() => executeCommand('restart')} type="danger">Restart Node</Button>
                <Button onClick={() => executeCommand('status')}>Check Status</Button>
                <Button onClick={() => executeCommand('wallet')}>Toggle Wallet</Button>
                <Button onClick={() => fetchNodeData()}>Refresh Data</Button>
              </div>
            </Terminal>
          </div>

          <div className="two-third">
            <Terminal title="terminal">
              <div className="logs">
                {logs.map((log, index) => (
                  <div key={index} className="log-line">{log}</div>
                ))}
              </div>
              <div className="input-line">
                <span className="input-prompt">$</span>
                <input
                  type="text"
                  className="input"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Commands: help, sync, restart, status, wallet"
                />
              </div>
            </Terminal>


          </div>

          <Terminal title="wallet">
            <div className="wallet-status">
              {walletConnected ? '● CONNECTED' : '● DISCONNECTED'} | Multisynq Network
            </div>
            {walletConnected && (
              <>
                <div className="wallet-address">
                  0x742d35Cc6634C0532925a3b8D404d1e5e0a4B7DC
                </div>
                <StatusLine label="balance" value="1,247 MON" />
                <StatusLine label="gas_fees" value="0.002 MON" />
                <StatusLine label="transactions" value="1,429" />
              </>
            )}
            {!walletConnected && (
              <div style={{ textAlign: 'center', padding: '20px', color: '#ff6b6b' }}>
                No wallet connected
              </div>
            )}
          </Terminal>

          <div className="full-width">
            <Terminal title="network_overview">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                <div>
                  <StatusLine label="nodes" value="2,847" />
                  <StatusLine label="sessions" value="1,429" />
                  <StatusLine label="uptime" value="99.97%" />
                </div>
                <div>
                  <StatusLine label="throughput" value="847 MB/s" />
                  <StatusLine label="latency" value="15ms" />
                  <StatusLine label="errors" value="0.01%" />
                </div>
                <div>
                  <StatusLine label="efficiency" value="98.2%" />
                  <StatusLine label="reliability" value="99.99%" />
                  <StatusLine label="status" value="OPTIMAL" />
                </div>
              </div>
            </Terminal>
          </div>
        </div>
      </div>
      <GlobalSyncMap />
      <ShitpostCorner addLog={addLog} />
    </div>
  );
};

export default App;