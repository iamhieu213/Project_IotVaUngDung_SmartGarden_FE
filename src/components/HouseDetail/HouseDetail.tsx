import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './HouseDetail.css';
import { Thermometer, Droplets, Sun, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom'
// Import sub-components
import { SensorStatsBar } from './SensorStatsBar';
import { FarmHudControls } from './FarmHudControls';
import { FarmMapLegend } from './FarmMapLegend';
import { SensorCard } from './SensorCard';
import { RightStatusPanel } from './RightStatusPanel';

// Import custom hook
import { useHouseDetailState } from './useHouseDetailState';

const getSensorLucideIcon = (sensorKey: string) => {
  const size = 14;
  switch (sensorKey) {
    case 'temperature':
      return <Thermometer size={size} style={{ color: '#ef4444' }} />;
    case 'humidity':
      return <Droplets size={size} style={{ color: '#3b82f6' }} />;
    case 'soilMoisture':
      return <Droplets size={size} style={{ color: '#4f46e5' }} />;
    case 'lightIntensity':
      return <Sun size={size} style={{ color: '#d97706' }} />;
    default:
      return <HelpCircle size={size} style={{ color: '#6b7280' }} />;
  }
};

export const HouseDetail: React.FC = () => {
  const {
    houseName,
    houseInfo,
    devices,
    expandedDevices,
    selectedSensor,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    zoom,
    rotation,
    showSensors,
    setShowSensors,
    show3dOverlay,
    setShow3dOverlay,
    isPlacementMode,
    selectedDeviceForPlacement,
    mapRef,
    isDragging,
    draggedSensor,
    handleLogout,
    handleAddDevice,
    handleDeleteDevice,
    handleSensorDoubleClick,
    handleLocateDeviceClick,
    handleSensorMouseDown,
    handleStartDragNewSensor,
    toggleDeviceExpand,
    handleMouseMove,
    handleMouseUp,
    handleMapClick,
    handleZoomIn,
    handleZoomOut,
    handleRotate,
    countSensors,
    activeCount,
    inactiveCount,
    isFlatView,
  } = useHouseDetailState();

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
          <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link to="/houses" style={{ display: 'flex', alignItems: 'center', color: 'var(--db-on-surface-variant)', textDecoration: 'none' }} title="Quay lại danh sách nhà nấm">
              <span className="material-symbols-outlined" style={{ fontSize: '20px', cursor: 'pointer' }}>arrow_back</span>
            </Link>
            <div style={{ width: '1px', backgroundColor: 'var(--db-outline-variant)', height: '16px', margin: '0 4px' }}></div>
            <h1 className="header-title" style={{ fontSize: '18px', margin: 0 }}>{houseName}</h1>
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
          <div
            className="isometric-scene flex-1 relative farm-grid overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Thanh thống kê cảm biến trên đầu sơ đồ */}
            <SensorStatsBar
              activeCount={activeCount}
              inactiveCount={inactiveCount}
              countSensors={countSensors}
            />

            {/* Zoom & Control HUD */}
            <FarmHudControls
              handleZoomIn={handleZoomIn}
              handleZoomOut={handleZoomOut}
              handleRotate={handleRotate}
            />

            {/* Map Legend / Filters */}
            <FarmMapLegend
              showSensors={showSensors}
              setShowSensors={setShowSensors}
              show3dOverlay={show3dOverlay}
              setShow3dOverlay={setShow3dOverlay}
            />

            {/* 3D Base Layout */}
            <div
              className="isometric-base"
              ref={mapRef}
              onClick={handleMapClick}
              style={{
                transform: isFlatView ? `scale(${zoom})` : `scale(${zoom}) rotateX(60deg) rotateZ(${rotation}deg)`,
                cursor: isDragging ? 'grabbing' : isPlacementMode ? 'crosshair' : 'default',
              }}
            >
              {/* Main Grid Base with Axes */}
              <div style={{ position: 'absolute', inset: 0, border: '1px dashed rgba(108, 122, 113, 0.3)' }}></div>
              <div className="axis-label-x" style={{ transform: 'rotateZ(45deg) rotateX(-60deg) translateY(30px) translateX(-50px)', color: 'var(--db-error)', fontWeight: 'bold' }}>
                {houseInfo?.height !== undefined && houseInfo?.height !== null ? `${houseInfo.height} m` : '200 m'}
              </div>
              <div className="axis-label-y" style={{ transform: 'rotateZ(45deg) rotateX(-60deg) translateX(30px) translateY(-50px)', color: 'var(--db-error)', fontWeight: 'bold' }}>
                {houseInfo?.width !== undefined && houseInfo?.width !== null ? `${houseInfo.width} m` : '250 m'}
              </div>

              {/* Zones Grid */}
              <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 48px 1fr 1fr', gap: '8px' }}>
                <div className="farm-zone"></div>
                <div className="farm-zone"></div>
                <div className="path-road"></div>
                <div className="farm-zone"></div>
                <div className="farm-zone"></div>
                <div className="farm-zone"></div>
                <div className="farm-zone"></div>
              </div>

              {/* Render động các cảm biến thành phần */}
              {showSensors && devices.map((device) => {
                const isOnline = device.status === 'online';
                const telemetry = device.latestTelemetry;
                const positions = device.sensorPositions || {};

                const SENSOR_ICONS: Record<string, string> = {
                  temperature: 'thermostat',
                  humidity: 'humidity_percentage',
                  soilMoisture: 'water_drop',
                  lightIntensity: 'wb_sunny',
                };

                const getSensorValueStr = (key: string) => {
                  if (!isOnline || !telemetry || telemetry[key] === undefined) return '--';
                  const val = telemetry[key];
                  if (val === -127 || val === -999 || val === -1 || String(val).toLowerCase() === 'nan' || (key === 'soilMoisture' && val < 0)) {
                    return '⚠️ ERR';
                  }
                  if (key === 'temperature') return `${val}°C`;
                  if (key === 'humidity') return `${val}%`;
                  if (key === 'soilMoisture') return `${val}%`;
                  if (key === 'lightIntensity') return `${val} lx`;
                  return String(val);
                };

                return Object.entries(positions).map(([sensorKey, pos]: [string, any]) => {
                  if (pos.spaceX === undefined || pos.spaceY === undefined) return null;

                  const icon = SENSOR_ICONS[sensorKey] || 'sensors';
                  const valStr = getSensorValueStr(sensorKey);
                  const isSensorError = valStr === '⚠️ ERR';
                  const isSensorOnline = isOnline && !isSensorError;
                  const isSelected = selectedSensor?.deviceId === device.id && selectedSensor?.sensorKey === sensorKey;
                  const SENSOR_LABELS: Record<string, string> = {
                    temperature: 'Nhiệt độ',
                    humidity: 'Độ ẩm không khí',
                    soilMoisture: 'Độ ẩm đất',
                    lightIntensity: 'Cường độ ánh sáng',
                  };
                  const labelText = pos.displayName || `${SENSOR_LABELS[sensorKey] || sensorKey}`;

                  return (
                    <SensorCard
                      key={`sensor-${device.id}-${sensorKey}`}
                      device={device}
                      sensorKey={sensorKey}
                      pos={pos}
                      valStr={valStr}
                      isSensorOnline={isSensorOnline}
                      icon={icon}
                      rotation={rotation}
                      isFlatView={isFlatView}
                      isDragging={isDragging}
                      draggedSensor={draggedSensor}
                      isSelected={isSelected}
                      labelText={labelText}
                      handleSensorMouseDown={handleSensorMouseDown}
                      handleSensorDoubleClick={handleSensorDoubleClick}
                    />
                  );
                });
              })}

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
          <RightStatusPanel
            devices={devices}
            expandedDevices={expandedDevices}
            toggleDeviceExpand={toggleDeviceExpand}
            selectedDeviceForPlacement={selectedDeviceForPlacement}
            handleLocateDeviceClick={handleLocateDeviceClick}
            handleDeleteDevice={handleDeleteDevice}
            handleStartDragNewSensor={handleStartDragNewSensor}
            handleSensorDoubleClick={handleSensorDoubleClick}
            handleAddDevice={handleAddDevice}
            getSensorLucideIcon={getSensorLucideIcon}
          />
        </div>
      </main>
    </div>
  );
};

export default HouseDetail;
