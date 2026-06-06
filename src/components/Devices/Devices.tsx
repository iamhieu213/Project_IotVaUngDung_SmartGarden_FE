import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './Devices.css';

interface Device {
  id: string;
  name: string;
  type: string;
  iconName: string;
  deviceId: string;
  houseName: string;
  status: boolean;
  lastUpdate: string;
  isOffline?: boolean;
}

export const Devices: React.FC = () => {
  // Collapsed Sidebar state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');

  // Selected device for side drawer
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Devices state list
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 'humidifier',
      name: 'Máy tạo ẩm-Z1-A',
      type: 'Máy bơm sương',
      iconName: 'humidity_high',
      deviceId: 'SG-PUMP-001',
      houseName: 'Nhà nấm A-01',
      status: true,
      lastUpdate: '2 phút trước',
    },
    {
      id: 'co2',
      name: 'Cảm biến CO2 chính',
      type: 'Cảm biến',
      iconName: 'air',
      deviceId: 'SG-SENS-442',
      houseName: 'Nhà nấm B-04',
      status: true,
      lastUpdate: 'Vừa xong',
    },
    {
      id: 'fan',
      name: 'Quạt hút-02',
      type: 'Động cơ',
      iconName: 'toys_fan',
      deviceId: 'SG-FAN-089',
      houseName: 'Nhà nấm A-02',
      status: false,
      lastUpdate: 'Ngoại tuyến (14p)',
      isOffline: true,
    },
    {
      id: 'light',
      name: 'Đèn tăng trưởng-Z2',
      type: 'Hệ đèn LED',
      iconName: 'light_mode',
      deviceId: 'SG-LED-912',
      houseName: 'Nhà nấm C-01',
      status: true,
      lastUpdate: '15 phút trước',
    },
  ]);

  // Toggle status state
  const handleToggleStatus = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid opening drawer on checkbox toggle click
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === id ? { ...device, status: !device.status } : device
      )
    );
  };

  // Open Drawer handler
  const handleOpenDrawer = (device: Device) => {
    setSelectedDevice(device);
    setIsDrawerOpen(true);
  };

  // Close Drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Filter list
  const filteredDevices = devices.filter((device) =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.deviceId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`dashboard-page ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar Navigation */}
      <Sidebar
        activeId="devices"
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Workspace */}
      <main className="dashboard-main min-w-0">
        {/* TopNavBar */}
        <header className="dashboard-header">
          <div className="header-left">
            <h2 className="header-title">Thiết bị</h2>
            <div className="header-zones">
              <span className="zone-tab inactive">Nhà nấm A</span>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--db-outline-variant)' }}>
                chevron_right
              </span>
              <span className="zone-tab active">Khu vực 1</span>
            </div>
          </div>
          <div className="header-right">
            <div className="flex gap-4" style={{ display: 'flex', gap: '16px', color: 'var(--db-on-surface-variant)' }}>
              <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">notifications</span>
              <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">wifi_tethering</span>
              <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">schedule</span>
            </div>
            <div style={{ width: '1px', backgroundColor: 'var(--db-outline-variant)', height: '32px', margin: '0 8px' }}></div>
            <img
              alt="User Avatar"
              className="user-avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBB6KfERPErEb1eetV2WNXuZwYa1vwD_40kdqFaWm5_Bgkhf1dbhEFbZaDQIZJki2zCctqjKu8U47WlbwQG_rf2ASpnvJ2YWT-fe5FyghKtQbWFMzoKtDCiwRVC5TLutuVz1rHxwUWBkRRHl09VuCOAXNIDJ99hF4wPKDc6h28Dah5FTteAtVci8iKCcuY6Pyf3ihF77X2tU8O3NAUTp2FiP9MQElzifR6ayEDatZATenWFElTG8JGZbD5QH56YYrMKjyi8qZIQrigc"
            />
          </div>
        </header>

        {/* Page Content Canvas */}
        <div className="dashboard-content custom-scrollbar" style={{ overflowY: 'auto', flex: 1, height: 'calc(100vh - 64px)' }}>
          {/* Dashboard Header & Actions */}
          <div className="houses-header-actions">
            <div className="houses-title-wrapper">
              <h2>Hệ thống thiết bị</h2>
              <p>Điều khiển tập trung cho hệ sinh thái IoT của bạn.</p>
            </div>
            <div className="search-add-wrapper">
              <div className="search-box-wrapper">
                <span className="material-symbols-outlined search-icon">search</span>
                <input
                  type="text"
                  placeholder="Tìm kiếm thiết bị..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button type="button" className="card-action-btn border-outline" style={{ height: '44px', padding: '0 16px' }}>
                <span className="material-symbols-outlined">filter_alt</span>
                Bộ lọc
              </button>
              <button type="button" className="add-house-btn" style={{ height: '44px' }}>
                <span className="material-symbols-outlined">add</span>
                Thêm thiết bị
              </button>
            </div>
          </div>

          {/* Metrics Overview (Bento Style) */}
          <div className="devices-metrics-grid">
            <div className="devices-metrics-card">
              <div className="metrics-card-header">
                <div className="metrics-icon-wrapper primary">
                  <span className="material-symbols-outlined">sensors</span>
                </div>
                <span className="metrics-badge primary">Hoạt động 98%</span>
              </div>
              <p className="metrics-title">Tổng số thiết bị</p>
              <p className="metrics-value">124</p>
            </div>
            <div className="devices-metrics-card">
              <div className="metrics-card-header">
                <div className="metrics-icon-wrapper secondary">
                  <span className="material-symbols-outlined">hub</span>
                </div>
                <span className="metrics-badge secondary">4 Đang chạy</span>
              </div>
              <p className="metrics-title">Số nhà nấm</p>
              <p className="metrics-value">12</p>
            </div>
            <div className="devices-metrics-card">
              <div className="metrics-card-header">
                <div className="metrics-icon-wrapper error">
                  <span className="material-symbols-outlined">report_problem</span>
                </div>
                <span className="metrics-badge error">Cần chú ý</span>
              </div>
              <p className="metrics-title">Cảnh báo quan trọng</p>
              <p className="metrics-value error">03</p>
            </div>
            <div className="devices-metrics-card">
              <div className="metrics-card-header">
                <div className="metrics-icon-wrapper container-theme">
                  <span className="material-symbols-outlined">bolt</span>
                </div>
                <span className="metrics-badge primary">-12% năng lượng</span>
              </div>
              <p className="metrics-title">Tải lượng mạng</p>
              <p className="metrics-value">42.8 kb/s</p>
            </div>
          </div>

          {/* Main Device Table */}
          <div className="device-table-card">
            <div className="table-responsive">
              <table className="device-table">
                <thead>
                  <tr>
                    <th>Tên thiết bị</th>
                    <th>Loại</th>
                    <th>Mã ID</th>
                    <th>Tên nhà nấm</th>
                    <th>Trạng thái</th>
                    <th>Cập nhật cuối</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDevices.map((device) => (
                    <tr key={device.id} onClick={() => handleOpenDrawer(device)}>
                      <td>
                        <div className="device-name-cell">
                          <span
                            className={`device-status-indicator ${device.isOffline ? 'offline' : 'online'}`}
                          ></span>
                          <span className="device-name-text">{device.name}</span>
                        </div>
                      </td>
                      <td>
                        <div className="device-type-cell">
                          <span className="device-type-icon">{device.iconName}</span>
                          <span className="text-sm">{device.type}</span>
                        </div>
                      </td>
                      <td className="device-id-mono">{device.deviceId}</td>
                      <td className="text-sm" style={{ color: 'var(--db-on-surface-variant)' }}>
                        {device.houseName}
                      </td>
                      <td>
                        <label className="switch-wrapper" onClick={(e) => handleToggleStatus(device.id, e)}>
                          <input type="checkbox" checked={device.status} className="switch-input" readOnly />
                          <span className="switch-slider"></span>
                        </label>
                      </td>
                      <td className={`text-sm ${device.isOffline ? 'text-error' : ''}`} style={{ color: device.isOffline ? 'var(--db-error)' : 'var(--db-on-surface-variant)' }}>
                        {device.lastUpdate}
                      </td>
                      <td>
                        <div className="row-actions-wrapper">
                          <button
                            type="button"
                            className="row-action-btn"
                            title="Chỉnh sửa"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                              edit
                            </span>
                          </button>
                          <button
                            type="button"
                            className="row-action-btn"
                            title="Lịch sử hoạt động"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                              history
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="houses-pagination" style={{ borderTop: '1px solid var(--db-outline-variant)', padding: '16px 24px' }}>
              <p>Hiển thị 1-10 trên 124 thiết bị</p>
              <div className="pagination-btn-group">
                <button type="button" className="pagination-btn" title="Trang trước">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button type="button" className="pagination-number-btn active">
                  1
                </button>
                <button type="button" className="pagination-number-btn">
                  2
                </button>
                <button type="button" className="pagination-number-btn">
                  3
                </button>
                <button type="button" className="pagination-btn" title="Trang sau">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Details Side Drawer Overlay (Hidden by default) */}
      <div
        className={`drawer-backdrop ${isDrawerOpen ? 'drawer-open' : ''}`}
        onClick={handleCloseDrawer}
      ></div>

      {/* Side Drawer Panel */}
      <div className={`side-drawer ${isDrawerOpen ? 'drawer-open' : ''}`}>
        {selectedDevice && (
          <>
            <div className="drawer-header">
              <div className="drawer-header-left">
                <div className="drawer-header-icon-wrapper">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {selectedDevice.iconName}
                  </span>
                </div>
                <div>
                  <h4 className="drawer-device-title">{selectedDevice.name}</h4>
                  <p className="drawer-device-subtitle">
                    ID: {selectedDevice.deviceId} • {selectedDevice.status ? 'Trực tuyến' : 'Ngoại tuyến'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={handleCloseDrawer}
                title="Đóng bảng"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="drawer-content custom-scrollbar">
              {/* Live Sensor Stream Section */}
              <div className="drawer-section">
                <div className="drawer-section-title-row">
                  <h5 className="drawer-section-title">Số liệu thực tế</h5>
                  <span className="drawer-live-badge">
                    <span className="drawer-live-dot"></span>
                    TRỰC TIẾP
                  </span>
                </div>
                <div className="drawer-chart-card">
                  <div className="drawer-chart-bars">
                    <div className="drawer-chart-bar-item" style={{ height: '50%' }}></div>
                    <div className="drawer-chart-bar-item" style={{ height: '75%' }}></div>
                    <div className="drawer-chart-bar-item" style={{ height: '66%' }}></div>
                    <div className="drawer-chart-bar-item high" style={{ height: '100%' }}></div>
                    <div className="drawer-chart-bar-item high" style={{ height: '80%' }}></div>
                    <div className="drawer-chart-bar-item" style={{ height: '50%' }}></div>
                    <div className="drawer-chart-bar-item" style={{ height: '66%' }}></div>
                    <div className="drawer-chart-bar-item primary-fill" style={{ height: '75%' }}></div>
                  </div>
                  <div className="drawer-chart-overlay-value">
                    <span className="drawer-chart-number">92.4%</span>
                    <span className="drawer-chart-lbl">Độ ẩm tương đối</span>
                  </div>
                </div>
              </div>

              {/* Device Config Grid */}
              <div className="drawer-section">
                <h5 className="drawer-section-title" style={{ marginBottom: '16px' }}>Cấu hình thiết bị</h5>
                <div className="drawer-config-grid">
                  <div className="config-item-box">
                    <p className="config-item-lbl">Phiên bản phần sụn</p>
                    <p className="config-item-val">v2.4.1-stable</p>
                  </div>
                  <div className="config-item-box">
                    <p className="config-item-lbl">Địa chỉ MAC</p>
                    <p className="config-item-val">00:1B:44:11:3A:B7</p>
                  </div>
                  <div className="config-item-box">
                    <p className="config-item-lbl">Điện năng tiêu thụ</p>
                    <p className="config-item-val">12.5 W</p>
                  </div>
                  <div className="config-item-box">
                    <p className="config-item-lbl">Tín hiệu RSSI</p>
                    <p className="config-item-val signal-green">-54 dBm</p>
                  </div>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="drawer-section">
                <h5 className="drawer-section-title" style={{ marginBottom: '16px' }}>Nhật ký hoạt động</h5>
                <div className="timeline-container">
                  <div className="timeline-item">
                    <div className="timeline-dot-wrapper active">
                      <span className="timeline-inner-dot"></span>
                    </div>
                    <p className="timeline-title">Kích hoạt chu kỳ tự động</p>
                    <p className="timeline-time">Hôm nay lúc 14:24</p>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot-wrapper">
                      <span className="timeline-inner-dot"></span>
                    </div>
                    <p className="timeline-title">Hoàn thành hiệu chuẩn</p>
                    <p className="timeline-time">Hôm nay lúc 09:12</p>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot-wrapper">
                      <span className="timeline-inner-dot"></span>
                    </div>
                    <p className="timeline-title">Cập nhật phần sụn v2.4.1</p>
                    <p className="timeline-time">Hôm qua lúc 22:45</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Actions */}
            <div className="drawer-footer-actions">
              <button type="button" className="drawer-footer-btn border-outline">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  settings_remote
                </span>
                Khởi động lại
              </button>
              <button type="button" className="drawer-footer-btn primary-btn">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  tune
                </span>
                Cấu hình
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Devices;
