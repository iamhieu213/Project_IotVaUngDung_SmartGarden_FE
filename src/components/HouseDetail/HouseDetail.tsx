import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './HouseDetail.css';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import api from '../../utils/api';

export const HouseDetail: React.FC = () => {
  const { logout } = useAuth();
  const { id: houseId } = useParams<{ id: string }>();

  const [houseName, setHouseName] = useState<string>('Đang tải...');
  const [houseInfo, setHouseInfo] = useState<any>(null);
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleLogout = async () => {
    await logout();
    Swal.fire({
      icon: 'success',
      title: 'Đăng xuất thành công',
      text: 'Hẹn gặp lại bạn!',
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Fetch house details and devices
  const fetchHouseDetail = async () => {
    if (!houseId) return;
    try {
      const response = await api.get(`/houses/${houseId}`);
      if (response.data.success) {
        setHouseName(response.data.data.name);
        setHouseInfo(response.data.data);
      }
    } catch (err: any) {
      console.error('Lỗi khi tải chi tiết nhà nấm:', err);
    }
  };

  const fetchDevices = async () => {
    if (!houseId) return;
    try {
      const response = await api.get(`/devices/house/${houseId}`);
      if (response.data.success) {
        setDevices(response.data.data);
      }
    } catch (err: any) {
      console.error('Lỗi khi tải danh sách thiết bị:', err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchHouseDetail(), fetchDevices()]);
      setLoading(false);
    };
    loadData();
  }, [houseId]);

  // Handle registering a device
  const handleAddDevice = async () => {
    if (!houseId) return;
    try {
      // Fetch unregistered devices list
      const res = await api.get('/devices/unregistered');
      const unregisteredList: string[] = res.data.success ? res.data.data : [];

      const selectOptions = unregisteredList.map(
        id => `<option value="${id}">${id}</option>`
      ).join('');

      const { value: formValues } = await Swal.fire({
        title: 'Đăng ký thiết bị mới',
        html: `
          <style>
            .swal-form-container {
              display: flex;
              flex-direction: column;
              gap: 16px;
              padding: 10px 0;
              font-family: 'Inter', sans-serif;
            }
            .swal-form-group {
              display: flex;
              flex-direction: column;
              gap: 6px;
              text-align: left;
              width: 100%;
              box-sizing: border-box;
            }
            .swal-form-label {
              font-size: 11px;
              font-weight: 600;
              color: var(--db-on-surface-variant);
              display: flex;
              align-items: center;
              gap: 6px;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
            .swal-form-label .material-symbols-outlined {
              font-size: 16px;
              color: var(--db-primary);
            }
            .swal-form-input, .swal-form-select {
              width: 100%;
              padding: 12px 14px;
              border: 1px solid var(--db-outline-variant);
              border-radius: 8px;
              font-size: 14px;
              box-sizing: border-box;
              outline: none;
              background-color: var(--db-surface-container-low);
              color: var(--db-on-surface);
              transition: all 0.2s ease;
            }
            .swal-form-input:focus, .swal-form-select:focus {
              border-color: var(--db-primary);
              background-color: var(--db-surface-container-lowest);
              box-shadow: 0 0 0 3px rgba(0, 108, 73, 0.15);
            }
            .custom-swal-popup {
              border-radius: 16px !important;
              background-color: var(--db-surface-container-lowest) !important;
              border: 1px solid var(--db-outline-variant) !important;
              padding: 24px !important;
            }
            .custom-swal-confirm-btn {
              background-color: var(--db-primary) !important;
              color: #ffffff !important;
              border: none !important;
              padding: 10px 24px !important;
              border-radius: 8px !important;
              font-size: 14px !important;
              font-weight: 500 !important;
              cursor: pointer !important;
              margin-left: 8px !important;
              transition: all 0.2s ease !important;
            }
            .custom-swal-confirm-btn:hover {
              opacity: 0.9 !important;
            }
            .custom-swal-cancel-btn {
              background-color: transparent !important;
              color: var(--db-on-surface-variant) !important;
              border: 1px solid var(--db-outline-variant) !important;
              padding: 10px 24px !important;
              border-radius: 8px !important;
              font-size: 14px !important;
              font-weight: 500 !important;
              cursor: pointer !important;
              transition: all 0.2s ease !important;
            }
            .custom-swal-cancel-btn:hover {
              background-color: var(--db-surface-container-low) !important;
            }
          </style>
          <div class="swal-form-container">
            <div class="swal-form-group">
              <label class="swal-form-label">
                <span class="material-symbols-outlined">wifi_find</span> Thiết bị phát hiện được
              </label>
              ${
                unregisteredList.length > 0
                  ? `<select id="swal-input-device-id" class="swal-form-select">
                      ${selectOptions}
                     </select>`
                  : `<input id="swal-input-device-id" class="swal-form-input" placeholder="Nhập mã thiết bị (deviceId/MAC)">
                     <div style="font-size: 11px; color: var(--db-on-surface-variant); margin-top: 4px;">
                       Không phát hiện thiết bị nào trong hàng chờ Redis. Bạn có thể tự nhập thủ công.
                     </div>`
              }
            </div>
            <div class="swal-form-group">
              <label class="swal-form-label">
                <span class="material-symbols-outlined">badge</span> Tên thiết bị
              </label>
              <input id="swal-input-name" class="swal-form-input" placeholder="Ví dụ: Cảm biến khu trung tâm">
            </div>
            <div class="swal-form-group">
              <label class="swal-form-label">
                <span class="material-symbols-outlined">key</span> ThingsBoard Access Token
              </label>
              <input id="swal-input-tb-token" class="swal-form-input" placeholder="Nhập token kết nối ThingsBoard (không bắt buộc)">
            </div>
          </div>
        `,
        customClass: {
          popup: 'custom-swal-popup',
          confirmButton: 'custom-swal-confirm-btn',
          cancelButton: 'custom-swal-cancel-btn',
        },
        buttonsStyling: false,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Đăng ký',
        cancelButtonText: 'Hủy',
        preConfirm: () => {
          const deviceId = (document.getElementById('swal-input-device-id') as HTMLInputElement | HTMLSelectElement).value;
          const name = (document.getElementById('swal-input-name') as HTMLInputElement).value;
          const thingsboardAccessToken = (document.getElementById('swal-input-tb-token') as HTMLInputElement).value;

          if (!deviceId || !name) {
            Swal.showValidationMessage('Vui lòng chọn/nhập mã thiết bị và tên thiết bị');
            return false;
          }
          return {
            deviceId,
            name,
            houseId,
            thingsboardAccessToken: thingsboardAccessToken || undefined,
          };
        },
      });

      if (formValues) {
        try {
          const response = await api.post('/devices/create', formValues);
          if (response.data.success) {
            Swal.fire({
              icon: 'success',
              title: 'Thành công',
              text: 'Đã liên kết thiết bị vào nhà nấm thành công!',
              timer: 1500,
              showConfirmButton: false,
            });
            fetchDevices();
          }
        } catch (err: any) {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi đăng ký',
            text: err.response?.data?.message || 'Có lỗi xảy ra khi liên kết thiết bị.',
          });
        }
      }
    } catch (err) {
      console.error('Lỗi khi lấy danh sách thiết bị chưa đăng ký:', err);
    }
  };

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

  // Tính toán các giá trị trung bình từ thiết bị
  const activeDevicesWithTelemetry = devices.filter((d: any) => d.status === 'online' && d.latestTelemetry);

  const averageHumidity = activeDevicesWithTelemetry.length > 0
    ? Math.round(activeDevicesWithTelemetry.reduce((acc, curr) => acc + curr.latestTelemetry.humidity, 0) / activeDevicesWithTelemetry.length)
    : null;

  const averageTemperature = activeDevicesWithTelemetry.length > 0
    ? (activeDevicesWithTelemetry.reduce((acc, curr) => acc + curr.latestTelemetry.temperature, 0) / activeDevicesWithTelemetry.length).toFixed(1)
    : null;

  const averageLight = activeDevicesWithTelemetry.length > 0
    ? Math.round(activeDevicesWithTelemetry.reduce((acc, curr) => acc + curr.latestTelemetry.lightIntensity, 0) / activeDevicesWithTelemetry.length)
    : null;

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
            <h1 className="header-title" style={{ fontSize: '18px' }}>{houseName}</h1>
            <div style={{ width: '1px', backgroundColor: 'var(--db-outline-variant)', height: '16px', margin: '0 8px' }}></div>
            <span className="zone-tab active" style={{ fontSize: '14px' }}>
              {houseInfo?.address || 'Khu vực nuôi trồng'}
            </span>
          </div>
          <div className="header-right">
            <div className="flex gap-4" style={{ display: 'flex', gap: '16px', color: 'var(--db-on-surface-variant)', alignItems: 'center' }}>
              <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">notifications</span>
              <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">wifi_tethering</span>
              <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">schedule</span>
              <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors" title="Đăng xuất" onClick={handleLogout} style={{ cursor: 'pointer' }}>logout</span>
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
                         <span className={`status-dot ${averageTemperature !== null ? 'active' : 'error animate-pulse'}`}></span>
                         <span className="material-symbols-outlined text-primary">thermostat</span>
                         <span className="card-lbl" style={{ whiteSpace: 'nowrap' }}>
                           {averageTemperature !== null ? `${averageTemperature}°C` : 'NHIỆT ĐỘ'}
                         </span>
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
                       <div className={`floating-3d-card ${averageHumidity !== null ? '' : 'alert-border'}`}>
                         <span className={`status-dot ${averageHumidity !== null ? 'active' : 'error animate-pulse'}`}></span>
                         <span className="material-symbols-outlined text-error">humidity_percentage</span>
                         <span className="card-lbl" style={{ color: averageHumidity !== null ? 'inherit' : 'var(--db-error)', whiteSpace: 'nowrap' }}>
                           {averageHumidity !== null ? `${averageHumidity}%` : 'ĐỘ ẨM'}
                         </span>
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
                         <span className={`status-dot ${averageLight !== null ? 'active' : 'error animate-pulse'}`}></span>
                         <span className="material-symbols-outlined text-primary">wb_sunny</span>
                         <span className="card-lbl" style={{ whiteSpace: 'nowrap' }}>
                           {averageLight !== null ? `${averageLight} lx` : 'ÁNH SÁNG'}
                         </span>
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
                    <span className="panel-metric-num primary-color">
                      {averageHumidity !== null ? averageHumidity : '--'}
                    </span>
                    <span className="panel-metric-unit">%</span>
                  </div>
                  <div className="panel-progress-bg">
                    <div className="panel-progress-fill" style={{ width: averageHumidity !== null ? `${averageHumidity}%` : '0%' }}></div>
                  </div>
                </div>

                {/* Metric 2 - Temperature */}
                <div className="panel-metric-card">
                  <span className="panel-metric-lbl">Nhiệt độ</span>
                  <div className="panel-metric-val-row">
                    <span className="panel-metric-num">
                      {averageTemperature !== null ? averageTemperature : '--'}
                    </span>
                    <span className="panel-metric-unit">°C</span>
                  </div>
                  <div className="panel-progress-bg">
                    <div className="panel-progress-fill secondary-color" style={{ width: averageTemperature !== null ? `${Math.min(Math.max((Number(averageTemperature) / 50) * 100, 0), 100)}%` : '0%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Device Registry list */}
            <div className="registry-list-section custom-scrollbar">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 className="registry-section-title" style={{ margin: 0 }}>Danh sách thiết bị</h3>
                <button
                  type="button"
                  onClick={handleAddDevice}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    backgroundColor: 'var(--db-primary)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
                  Thêm thiết bị
                </button>
              </div>

              <div className="device-rows-container">
                {devices.length === 0 ? (
                  <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--db-on-surface-variant)', fontSize: '13px' }}>
                    Chưa có thiết bị nào trong nhà nấm này.
                  </div>
                ) : (
                  devices.map((device) => {
                    const isOnline = device.status === 'online';
                    const lastSeenStr = device.lastSeen
                      ? `Ping cuối: ${new Date(device.lastSeen).toLocaleTimeString()}`
                      : 'Chưa hoạt động';

                    return (
                      <div key={device.id} className={`device-row ${!isOnline ? 'error-theme' : ''}`}>
                        <div className="device-row-content">
                          <div className={`device-icon-wrapper ${!isOnline ? 'error-theme' : ''}`}>
                            <span className="material-symbols-outlined">sensors</span>
                          </div>
                          <div className="device-info">
                            <div className="device-name-row">
                              <span className="device-name">{device.name}</span>
                              <span className={`device-status ${isOnline ? 'online' : 'error'}`}>
                                {isOnline ? 'ONLINE' : 'OFFLINE'}
                              </span>
                            </div>
                            <div className="device-details">ID: {device.deviceId} | {lastSeenStr}</div>
                          </div>
                          {isOnline ? (
                            <span className="material-symbols-outlined device-arrow" style={{ fontSize: '20px' }}>
                              chevron_right
                            </span>
                          ) : (
                            <span className="material-symbols-outlined text-error" style={{ fontSize: '20px' }}>
                              error
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
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
