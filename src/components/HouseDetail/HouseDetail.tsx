import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './HouseDetail.css';

export const HouseDetail: React.FC = () => {
  // Collapsed Sidebar state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // HUD & Isometric state
  const [zoom, setZoom] = useState(1.0);
  const [rotation, setRotation] = useState(-45);
  const [showSensors, setShowSensors] = useState(true);
  const [show3dOverlay, setShow3dOverlay] = useState(true);

  // Zoom handlers
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2.0));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  };

  // Rotation handler
  const handleRotate = () => {
    setRotation((prev) => prev + 90);
  };

  return (
    <div className={`dashboard-page ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar Navigation */}
      <Sidebar
        activeId="mushroom-houses"
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Workspace */}
      <main className="dashboard-main overflow-hidden relative">
        {/* TopNavBar */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1 className="header-title" style={{ fontSize: '18px' }}>Nhà nấm A</h1>
            <div style={{ width: '1px', backgroundColor: 'var(--db-outline-variant)', height: '16px', margin: '0 8px' }}></div>
            <span className="zone-tab active" style={{ fontSize: '14px' }}>
              Khu vực 1 - Nhân giống nấm Sò
            </span>
          </div>
          <div className="header-right">
            <div className="flex gap-4" style={{ display: 'flex', gap: '16px', color: 'var(--db-on-surface-variant)' }}>
              <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">notifications</span>
              <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">wifi_tethering</span>
              <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">schedule</span>
            </div>
            <img
              alt="User Avatar"
              className="user-avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeTg-x7fx4RwQxmgdWEgGLIMLVMsShv9zcEwTBcef1HSDjQB-OaWQXOxpJYXPsq7KuXxle8bA7fz-nWGKDHOCHP_UVWPOLIFUknw110qE8Ko0LWtl9_7hjQMB81IuJnwlyl6-9DK88Lqc4ikWu5VUTwsoX9lccdwTdMc_JfaIR7d45to0I2B7cGuQQ-2HHwlqdTrR_JtwNFV0kr8QesCIsiQbRmEv2yL2qAgVcdb4-VURcm4Wrt2CTceBJF90xeKxirw4rjx0FaULo"
            />
          </div>
        </header>

        {/* Content Area: 3D Isometric Map + Sidebar */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden', height: 'calc(100vh - 64px)' }}>
          {/* Interactive 3D Farm Layout Map */}
          <div className="isometric-scene flex-1 relative farm-grid overflow-hidden">
            {/* Zoom & Control HUD */}
            <div className="hud-controls-wrapper">
              <div className="hud-button-group">
                <button
                  type="button"
                  className="hud-btn"
                  onClick={handleZoomIn}
                  title="Phóng to"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
                <div style={{ height: '1px', backgroundColor: 'var(--db-outline-variant)' }}></div>
                <button
                  type="button"
                  className="hud-btn"
                  onClick={handleZoomOut}
                  title="Thu nhỏ"
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
              </div>
              <div className="hud-button-group">
                <button
                  type="button"
                  className="hud-btn active"
                  title="Công cụ chọn"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    near_me
                  </span>
                </button>
                <button
                  type="button"
                  className="hud-btn"
                  onClick={handleRotate}
                  title="Xoay góc nhìn"
                >
                  <span className="material-symbols-outlined">refresh</span>
                </button>
                <button
                  type="button"
                  className="hud-btn"
                  title="Góc nhìn 3D"
                >
                  <span className="material-symbols-outlined">view_in_ar</span>
                </button>
              </div>
            </div>

            {/* Map Legend / Filters */}
            <div className="map-legend">
              <div className="legend-item">
                <span className="legend-dot active"></span>
                <span className="legend-text">Đang hoạt động</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot alert"></span>
                <span className="legend-text">Cảnh báo</span>
              </div>
              <div style={{ width: '1px', backgroundColor: 'var(--db-outline-variant)', height: '16px' }}></div>
              <div className="legend-item">
                <label className="legend-checkbox-label">
                  <input
                    type="checkbox"
                    checked={showSensors}
                    onChange={(e) => setShowSensors(e.target.checked)}
                    className="legend-checkbox text-primary focus:ring-primary"
                  />
                  <span className="legend-text" style={{ textTransform: 'none' }}>Cảm biến</span>
                </label>
              </div>
              <div className="legend-item">
                <label className="legend-checkbox-label">
                  <input
                    type="checkbox"
                    checked={show3dOverlay}
                    onChange={(e) => setShow3dOverlay(e.target.checked)}
                    className="legend-checkbox text-primary focus:ring-primary"
                  />
                  <span className="legend-text" style={{ textTransform: 'none' }}>Lớp phủ 3D</span>
                </label>
              </div>
            </div>

            {/* 3D Base Layout */}
            <div
              className="isometric-base"
              style={{
                transform: `scale(${zoom}) rotateX(60deg) rotateZ(${rotation}deg)`,
              }}
            >
              {/* Main Grid Base with Axes */}
              <div style={{ position: 'absolute', inset: 0, border: '1px dashed rgba(108, 122, 113, 0.3)' }}></div>
              <div className="axis-label-x" style={{ transform: 'rotateZ(45deg) rotateX(-60deg) translateY(30px) translateX(-50px)', color: 'var(--db-error)', fontWeight: 'bold' }}>200 m</div>
              <div className="axis-label-y" style={{ transform: 'rotateZ(45deg) rotateX(-60deg) translateX(30px) translateY(-50px)', color: 'var(--db-error)', fontWeight: 'bold' }}>250 m</div>
              
              {/* Zones Grid */}
              <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 48px 1fr 1fr', gap: '8px' }}>
                {/* Zone 1 */}
                <div className="farm-zone">
                  {showSensors && (
                    <div className="isometric-card" style={{ position: 'absolute', top: '20%', left: '30%' }}>
                      <div className="floating-3d-card">
                        <span className="status-dot active"></span>
                        <span className="material-symbols-outlined text-primary">thermostat</span>
                        <span className="card-lbl">NHIỆT ĐỘ</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Zone 2 */}
                <div className="farm-zone"></div>

                {/* Path/Road */}
                <div className="path-road"></div>

                {/* Zone 3 */}
                <div className="farm-zone">
                  {showSensors && (
                    <div className="isometric-card" style={{ position: 'absolute', top: '40%', left: '50%' }}>
                      <div className="floating-3d-card alert-border">
                        <span className="status-dot error animate-pulse"></span>
                        <span className="material-symbols-outlined text-error">humidity_percentage</span>
                        <span className="card-lbl" style={{ color: 'var(--db-error)' }}>ĐỘ ẨM</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Zone 4 */}
                <div className="farm-zone">
                  {showSensors && (
                    <div className="isometric-card" style={{ position: 'absolute', top: '10%', left: '70%' }}>
                      <div className="floating-3d-card">
                        <span className="status-dot active"></span>
                        <span className="material-symbols-outlined text-secondary">co2</span>
                        <span className="card-lbl">CO2</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Zone 5 */}
                <div className="farm-zone">
                  {showSensors && (
                    <div className="isometric-card" style={{ position: 'absolute', top: '50%', left: '20%' }}>
                      <div className="floating-3d-card">
                        <span className="status-dot active"></span>
                        <span className="material-symbols-outlined text-primary">wb_sunny</span>
                        <span className="card-lbl">ÁNH SÁNG</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Zone 6 */}
                <div className="farm-zone"></div>
              </div>

              {/* Central Control Post */}
              {show3dOverlay && (
                <div className="central-control-post isometric-card">
                  <div className="control-pillar">
                    <span className="material-symbols-outlined">sensors</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Status Panel */}
          <aside className="status-panel">
            {/* Header info */}
            <div className="status-panel-section">
              <div className="status-panel-header">
                <h2 className="status-panel-title">Trạng thái thực tế</h2>
                <span className="status-badge">TRỰC TUYẾN</span>
              </div>
              <div className="panel-metrics-grid">
                {/* Metric 1 - Humidity */}
                <div className="panel-metric-card">
                  <span className="panel-metric-lbl">Độ ẩm</span>
                  <div className="panel-metric-val-row">
                    <span className="panel-metric-num primary-color">92</span>
                    <span className="panel-metric-unit">%</span>
                  </div>
                  <div className="panel-progress-bg">
                    <div className="panel-progress-fill" style={{ width: '92%' }}></div>
                  </div>
                </div>

                {/* Metric 2 - Temperature */}
                <div className="panel-metric-card">
                  <span className="panel-metric-lbl">Nhiệt độ</span>
                  <div className="panel-metric-val-row">
                    <span className="panel-metric-num">18.4</span>
                    <span className="panel-metric-unit">°C</span>
                  </div>
                  <div className="panel-progress-bg">
                    <div className="panel-progress-fill secondary-color" style={{ width: '50%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Device Registry list */}
            <div className="registry-list-section custom-scrollbar">
              <h3 className="registry-section-title">Danh sách thiết bị</h3>
              <div className="device-rows-container">
                {/* Device 1 */}
                <div className="device-row">
                  <div className="device-row-content">
                    <div className="device-icon-wrapper">
                      <span className="material-symbols-outlined">sensors</span>
                    </div>
                    <div className="device-info">
                      <div className="device-name-row">
                        <span className="device-name">Nút cảm biến 042</span>
                        <span className="device-status online">ONLINE</span>
                      </div>
                      <div className="device-details">Ping cuối: 2 giây trước</div>
                    </div>
                    <span className="material-symbols-outlined device-arrow" style={{ fontSize: '20px' }}>
                      chevron_right
                    </span>
                  </div>
                </div>

                {/* Device 2 */}
                <div className="device-row">
                  <div className="device-row-content">
                    <div className="device-icon-wrapper secondary-theme">
                      <span className="material-symbols-outlined">mode_fan</span>
                    </div>
                    <div className="device-info">
                      <div className="device-name-row">
                        <span className="device-name">Quạt thông gió A1</span>
                        <span className="device-status running">ĐANG CHẠY</span>
                      </div>
                      <div className="device-details">Tốc độ: 1200 vòng/phút</div>
                    </div>
                    <span className="material-symbols-outlined device-arrow" style={{ fontSize: '20px' }}>
                      chevron_right
                    </span>
                  </div>
                </div>

                {/* Device 3 */}
                <div className="device-row error-theme">
                  <div className="device-row-content">
                    <div className="device-icon-wrapper error-theme">
                      <span className="material-symbols-outlined">water_drop</span>
                    </div>
                    <div className="device-info">
                      <div className="device-name-row">
                        <span className="device-name">Máy bơm chính 01</span>
                        <span className="device-status error">LỖI</span>
                      </div>
                      <div className="device-details">Phát hiện áp suất thấp</div>
                    </div>
                    <span className="material-symbols-outlined text-error" style={{ fontSize: '20px' }}>
                      error
                    </span>
                  </div>
                </div>
              </div>

              {/* Sparkline Chart Production Trend */}
              <div className="production-trend-wrapper">
                <h3 className="registry-section-title">Xu hướng sản xuất</h3>
                <div className="trend-card">
                  <div className="trend-bars-wrapper">
                    <div className="trend-bar-fill" style={{ height: '50%' }}></div>
                    <div className="trend-bar-fill" style={{ height: '75%' }}></div>
                    <div className="trend-bar-fill" style={{ height: '66%' }}></div>
                    <div className="trend-bar-fill" style={{ height: '80%' }}></div>
                    <div className="trend-bar-fill highlight" style={{ height: '100%' }}></div>
                    <div className="trend-bar-fill" style={{ height: '60%' }}></div>
                    <div className="trend-bar-fill" style={{ height: '50%' }}></div>
                  </div>
                  <div className="trend-info-row">
                    <span className="trend-label">Tốc độ tăng trưởng</span>
                    <span className="trend-value">+12%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Control Panel */}
            <div className="panel-footer-controls">
              <button type="button" className="system-control-btn">
                <span className="material-symbols-outlined">settings_suggest</span>
                Điều khiển hệ thống
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default HouseDetail;
