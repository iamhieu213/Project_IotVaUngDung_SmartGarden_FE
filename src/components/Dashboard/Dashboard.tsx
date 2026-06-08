import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  // Collapsed Sidebar state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // State for active zone
  const [activeZone, setActiveZone] = useState<'zone1' | 'zone2'>('zone1');
  const [selectedHouse, setSelectedHouse] = useState<'A' | 'B'>('A');

  // Atmosphere pulse effect on glass cards
  useEffect(() => {
    const interval = setInterval(() => {
      const cards = document.querySelectorAll('.glass-card');
      cards.forEach((card) => {
        const opacity = 0.8 + Math.random() * 0.05;
        (card as HTMLElement).style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`dashboard-page ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar Component */}
      <Sidebar
        activeId="dashboard"
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Top Navigation Bar */}
        <header className="dashboard-header">
          <div className="header-left">
            <h2 className="header-title">Tổng quan</h2>
            <div className="header-zones">
              <button
                type="button"
                className={`zone-tab ${selectedHouse === 'A' ? 'active' : 'inactive'}`}
                onClick={() => setSelectedHouse('A')}
              >
                Nhà nấm A
              </button>
              <button
                type="button"
                className={`zone-tab ${selectedHouse === 'B' ? 'active' : 'inactive'}`}
                onClick={() => setSelectedHouse('B')}
              >
                Nhà nấm B
              </button>
              <div style={{ width: '1px', backgroundColor: 'var(--db-outline-variant)', height: '16px', margin: 'auto 8px' }}></div>
              <button
                type="button"
                className={`zone-tab ${activeZone === 'zone1' ? 'active' : 'inactive'}`}
                onClick={() => setActiveZone('zone1')}
              >
                Khu vực 1
              </button>
              <button
                type="button"
                className={`zone-tab ${activeZone === 'zone2' ? 'active' : 'inactive'}`}
                onClick={() => setActiveZone('zone2')}
              >
                Khu vực 2
              </button>
            </div>
          </div>
          <div className="header-right">
            <button type="button" className="icon-btn" title="Thông báo">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button type="button" className="icon-btn" title="Kết nối mạng">
              <span className="material-symbols-outlined">wifi_tethering</span>
            </button>
            <button type="button" className="icon-btn" title="Lập lịch">
              <span className="material-symbols-outlined">schedule</span>
            </button>
            <img
              alt="User Avatar"
              className="user-avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUhP0qwcFzZvxH4W9dayvqQGEU7KJ09PzAfCbeJ35yb2LiDn4PnCp61YGNeLMxuMJc235sxbo13nCAbBDCYUUaP8EgeKgNZHIt1ZeYKktrlPBwQr8FRabb2HVnaKVVQXEVsPbLxZx3fzujZdYmy-hpfXnMypcWrqywzsahIBlNAFBuF921Ewmaj7DUPBNf4dFFM7_p88ySyNRlwi_C9Thmh7CqM4mX82XOsqCvefKsCNBW_15ExsE2Jt_ycvCUTVbrZ_-N25K6sd8L"
            />
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* KPI Section */}
          <section className="kpi-section">
            {/* KPI 1 */}
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="material-symbols-outlined kpi-icon">apartment</span>
                <span className="kpi-trend">+2 tháng này</span>
              </div>
              <p className="kpi-title">Tổng số nhà nấm</p>
              <p className="kpi-value">12</p>
            </div>
            {/* KPI 2 */}
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="material-symbols-outlined kpi-icon">sensors</span>
                <span className="kpi-trend">100% hoạt động</span>
              </div>
              <p className="kpi-title">Thiết bị hoạt động</p>
              <p className="kpi-value">148</p>
            </div>
            {/* KPI 3 */}
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="material-symbols-outlined kpi-icon">thermometer</span>
                <span className="kpi-trend warning">Ổn định</span>
              </div>
              <p className="kpi-title">Nhiệt độ TB</p>
              <p className="kpi-value">24.5°C</p>
            </div>
            {/* KPI 4 */}
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="material-symbols-outlined kpi-icon">humidity_mid</span>
                <span className="kpi-trend">Tối ưu</span>
              </div>
              <p className="kpi-title">Độ ẩm TB</p>
              <p className="kpi-value">92%</p>
            </div>
            {/* KPI 5 */}
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="material-symbols-outlined kpi-icon">water_pump</span>
                <span className="kpi-trend neutral">4 đang chạy</span>
              </div>
              <p className="kpi-title">Máy bơm hoạt động</p>
              <p className="kpi-value">18</p>
            </div>
            {/* KPI 6 */}
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="material-symbols-outlined kpi-icon" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                <span className="kpi-trend">Khỏe mạnh</span>
              </div>
              <p className="kpi-title">Trạng thái hệ thống</p>
              <p className="kpi-value">Bình thường</p>
            </div>
          </section>

          {/* Real-time Monitoring Section */}
          <section>
            <div className="section-header">
              <h3 className="section-title">Giám sát thời gian thực</h3>
              <button type="button" className="live-feed-btn">
                Xem trực tiếp <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
              </button>
            </div>
            <div className="monitoring-grid">
              {/* Sensor Card 1 */}
              <div className="glass-card">
                <div className="sensor-header">
                  <div className="sensor-info">
                    <div className="sensor-icon-wrapper">
                      <span className="material-symbols-outlined">thermostat</span>
                    </div>
                    <span className="sensor-name">Nhiệt độ</span>
                  </div>
                  <span className="sensor-status-badge">BÌNH THƯỜNG</span>
                </div>
                <div className="sensor-body">
                  <span className="sensor-value-wrapper">
                    23.8<small className="sensor-unit">°C</small>
                  </span>
                  <div className="sensor-mini-chart">
                    <div className="chart-bar" style={{ height: '40%' }}></div>
                    <div className="chart-bar" style={{ height: '60%' }}></div>
                    <div className="chart-bar highlight" style={{ height: '80%' }}></div>
                    <div className="chart-bar" style={{ height: '50%' }}></div>
                    <div className="chart-bar" style={{ height: '70%' }}></div>
                  </div>
                </div>
              </div>

              {/* Sensor Card 2 */}
              <div className="glass-card">
                <div className="sensor-header">
                  <div className="sensor-info">
                    <div className="sensor-icon-wrapper">
                      <span className="material-symbols-outlined">humidity_high</span>
                    </div>
                    <span className="sensor-name">Độ ẩm</span>
                  </div>
                  <span className="sensor-status-badge">BÌNH THƯỜNG</span>
                </div>
                <div className="sensor-body">
                  <span className="sensor-value-wrapper">
                    94<small className="sensor-unit">%</small>
                  </span>
                  <div className="sensor-mini-chart">
                    <div className="chart-bar" style={{ height: '30%' }}></div>
                    <div className="chart-bar" style={{ height: '40%' }}></div>
                    <div className="chart-bar highlight" style={{ height: '90%' }}></div>
                    <div className="chart-bar" style={{ height: '75%' }}></div>
                    <div className="chart-bar" style={{ height: '85%' }}></div>
                  </div>
                </div>
              </div>

              {/* Sensor Card 3 */}
              <div className="glass-card">
                <div className="sensor-header">
                  <div className="sensor-info">
                    <div className="sensor-icon-wrapper warning">
                      <span className="material-symbols-outlined">opacity</span>
                    </div>
                    <span className="sensor-name">Độ ẩm đất</span>
                  </div>
                  <span className="sensor-status-badge warning">THẤP</span>
                </div>
                <div className="sensor-body">
                  <span className="sensor-value-wrapper" style={{ color: 'var(--db-tertiary)' }}>
                    32<small className="sensor-unit">%</small>
                  </span>
                  <div className="sensor-mini-chart warning">
                    <div className="chart-bar warning-bar" style={{ height: '80%' }}></div>
                    <div className="chart-bar warning-bar" style={{ height: '60%' }}></div>
                    <div className="chart-bar warning-bar highlight" style={{ height: '40%' }}></div>
                    <div className="chart-bar warning-bar" style={{ height: '30%' }}></div>
                    <div className="chart-bar warning-bar" style={{ height: '20%' }}></div>
                  </div>
                </div>
              </div>

              {/* Sensor Card 4 */}
              <div className="glass-card">
                <div className="sensor-header">
                  <div className="sensor-info">
                    <div className="sensor-icon-wrapper">
                      <span className="material-symbols-outlined">light_mode</span>
                    </div>
                    <span className="sensor-name">Cường độ ánh sáng</span>
                  </div>
                  <span className="sensor-status-badge">BÌNH THƯỜNG</span>
                </div>
                <div className="sensor-body">
                  <span className="sensor-value-wrapper">
                    420<small className="sensor-unit">lux</small>
                  </span>
                  <div className="sensor-mini-chart">
                    <div className="chart-bar" style={{ height: '20%' }}></div>
                    <div className="chart-bar" style={{ height: '40%' }}></div>
                    <div className="chart-bar highlight" style={{ height: '50%' }}></div>
                    <div className="chart-bar" style={{ height: '80%' }}></div>
                    <div className="chart-bar" style={{ height: '95%' }}></div>
                  </div>
                </div>
              </div>

              {/* Sensor Card 5 */}
              <div className="glass-card">
                <div className="sensor-header">
                  <div className="sensor-info">
                    <div className="sensor-icon-wrapper">
                      <span className="material-symbols-outlined">co2</span>
                    </div>
                    <span className="sensor-name">Nồng độ CO2</span>
                  </div>
                  <span className="sensor-status-badge stable">ỔN ĐỊNH</span>
                </div>
                <div className="sensor-body">
                  <span className="sensor-value-wrapper">
                    750<small className="sensor-unit">ppm</small>
                  </span>
                  <div className="sensor-mini-chart">
                    <div className="chart-bar" style={{ height: '60%' }}></div>
                    <div className="chart-bar" style={{ height: '65%' }}></div>
                    <div className="chart-bar highlight" style={{ height: '63%' }}></div>
                    <div className="chart-bar" style={{ height: '68%' }}></div>
                    <div className="chart-bar" style={{ height: '70%' }}></div>
                  </div>
                </div>
              </div>

              {/* Sensor Card 6 */}
              <div className="glass-card">
                <div className="sensor-header">
                  <div className="sensor-info">
                    <div className="sensor-icon-wrapper">
                      <span className="material-symbols-outlined">database</span>
                    </div>
                    <span className="sensor-name">Mực nước bồn chứa</span>
                  </div>
                  <span className="sensor-status-badge">ĐẦY</span>
                </div>
                <div className="sensor-body">
                  <div className="sensor-body-horizontal">
                    <span className="sensor-value-wrapper">
                      85<small className="sensor-unit">%</small>
                    </span>
                    <div className="water-tank-bar-bg">
                      <div className="water-tank-bar-fill" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Analytics Overview Section */}
          <section className="charts-grid">
            {/* Temperature Chart Area */}
            <div className="chart-card">
              <div className="chart-card-header">
                <div>
                  <h4 className="chart-card-title">Phân tích nhiệt độ</h4>
                  <p className="chart-card-subtitle">Xu hướng trong 24 giờ qua</p>
                </div>
                <select className="chart-select">
                  <option>24 giờ qua</option>
                  <option>7 ngày qua</option>
                </select>
              </div>
              <div className="mock-line-chart">
                <div className="chart-grid-lines">
                  <div className="grid-line"></div>
                  <div className="grid-line"></div>
                  <div className="grid-line"></div>
                  <div className="grid-line"></div>
                </div>
                <div className="chart-nodes-bar" style={{ height: '60%' }}></div>
                <div className="chart-nodes-bar" style={{ height: '65%' }}></div>
                <div className="chart-nodes-bar" style={{ height: '70%' }}></div>
                <div className="chart-nodes-bar" style={{ height: '68%' }}></div>
                <div className="chart-nodes-bar" style={{ height: '75%' }}></div>
                <div className="chart-nodes-bar" style={{ height: '85%' }}></div>
                <div className="chart-nodes-bar" style={{ height: '80%' }}></div>
                <div className="chart-nodes-bar" style={{ height: '60%' }}></div>
                <div className="chart-nodes-bar" style={{ height: '55%' }}></div>
                <div className="chart-nodes-bar" style={{ height: '50%' }}></div>
                <div className="chart-nodes-bar" style={{ height: '45%' }}></div>
                <div className="chart-nodes-bar" style={{ height: '55%' }}></div>
              </div>
            </div>

            {/* Humidity Chart Area */}
            <div className="chart-card">
              <div className="chart-card-header">
                <div>
                  <h4 className="chart-card-title">Xu hướng độ ẩm</h4>
                  <p className="chart-card-subtitle">Xu hướng trong 24 giờ qua</p>
                </div>
                <select className="chart-select">
                  <option>24 giờ qua</option>
                  <option>7 ngày qua</option>
                </select>
              </div>
              <div className="mock-line-chart">
                <div className="chart-grid-lines">
                  <div className="grid-line"></div>
                  <div className="grid-line"></div>
                  <div className="grid-line"></div>
                  <div className="grid-line"></div>
                </div>
                <div className="chart-nodes-bar secondary-theme" style={{ height: '85%' }}></div>
                <div className="chart-nodes-bar secondary-theme" style={{ height: '90%' }}></div>
                <div className="chart-nodes-bar secondary-theme" style={{ height: '92%' }}></div>
                <div className="chart-nodes-bar secondary-theme" style={{ height: '88%' }}></div>
                <div className="chart-nodes-bar secondary-theme" style={{ height: '85%' }}></div>
                <div className="chart-nodes-bar secondary-theme" style={{ height: '82%' }}></div>
                <div className="chart-nodes-bar secondary-theme" style={{ height: '80%' }}></div>
                <div className="chart-nodes-bar secondary-theme" style={{ height: '85%' }}></div>
                <div className="chart-nodes-bar secondary-theme" style={{ height: '87%' }}></div>
                <div className="chart-nodes-bar secondary-theme" style={{ height: '95%' }}></div>
                <div className="chart-nodes-bar secondary-theme" style={{ height: '93%' }}></div>
                <div className="chart-nodes-bar secondary-theme" style={{ height: '90%' }}></div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Floating Action Button for adding device */}
      <button type="button" className="fab-btn" title="Thêm thiết bị">
        <span className="fab-icon">add</span>
      </button>
    </div>
  );
};

export default Dashboard;
