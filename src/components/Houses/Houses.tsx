import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './Houses.css';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

interface House {
  id: string;
  name: string;
  width: number;
  height: number;
  deviceCount: number;
  status: 'ACTIVE' | 'MAINTENANCE' | 'OFFLINE';
  imageUrl?: string;
  metricLabel?: string;
  metricValue?: string;
  chartData?: number[];
  theme?: 'primary' | 'tertiary' | 'empty';
}

export const Houses: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

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

  // Collapsed Sidebar state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'ACTIVE' | 'MAINTENANCE' | 'OFFLINE'>('ALL');

  // Hardcoded Houses Data mapped from the HTML mockup with translations
  const housesData: House[] = [
    {
      id: 'oyster',
      name: 'Nhà nấm Sò Alpha',
      width: 24,
      height: 12,
      deviceCount: 14,
      status: 'ACTIVE',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA588jh4PVAdsely55yQmNcDdE9XZoNa2CkEIgGehBKik9Pd8eEtM5xHOmQnqUogRN9kLh_XGjcJhx-b-uXz9WfxIlGKwXBjOudm66IZfdn802sSDQFMsSvEX6eDxEF3xfvxakmM8bxtnfULfOvZoXqm-Uo5jhzY4gbvjjI_zhj4_bf7yHU-zm-8U2QH5mcbCpPeop5DTTJd70fJjsHSpjOZj2spH4pmcNuthFloeGcJMCsdUdubQStZjyd1bz651CkR9KiUTsjCR9H',
      metricLabel: 'ĐỘ ẨM',
      metricValue: '92.4%',
      chartData: [60, 75, 90, 85, 95],
      theme: 'primary',
    },
    {
      id: 'shiitake',
      name: 'Nhà nấm Hương Beta',
      width: 18,
      height: 10,
      deviceCount: 8,
      status: 'MAINTENANCE',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhN5QXfcX8_9d7d38CMyu1X941u-0X3arEfCZSPGvoM_dRLwgxNS90a7murfyqxUzz62jCNz3lWa_5-e0iGhhBICCfywlcCxuuPTTs-7QcsGqpREOfvsNVJULPkxqbTuuoojkwHcKMlVoUkEi0ZYgvwX8Pbhi-PLGpefgpsiVqugwpMZBg6cvmqmF0jvlKypdv90efNAyuId8AnLmqYr-p7rZqMU9JOUecZAbVktxe0LC48xiVWxp5Hrtuw0XWL4ihvPzaHCFQSuwj',
      metricLabel: 'NHIỆT ĐỘ',
      metricValue: '18.2°C',
      chartData: [40, 45, 50, 48, 52],
      theme: 'tertiary',
    },
    {
      id: 'lionsmane',
      name: 'Phòng Lab nấm Hầu Thủ',
      width: 12,
      height: 8,
      deviceCount: 22,
      status: 'ACTIVE',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCetwf6VFb4_Yj7oeUcNr8exw0l2DNEAwUh7O2pXww-ehalPfXtva7TnbFW6DtyOTFbhW7yMIYqKJyeWzOem9i-PCnwrcDv57NfpJSSR7yz_coC3VuLUV5q7l9NZpRnn9YCrUBQn17-LY-YEofNZcg2S0GoVDWUs_77txTxK4n4OIm_oR5S8CN-dh7abZOgDfyblDWYJuDC4CI55bFY5Tv5Xn9jDqZ02y4EGlXM3-LYy7BeZ1jYRBXYBxN_e1SJ28T34lG11dWuhMzT',
      metricLabel: 'NỒNG ĐỘ CO2',
      metricValue: '640 ppm',
      chartData: [30, 35, 40, 38, 42],
      theme: 'primary',
    },
    {
      id: 'nursery',
      name: 'Trạm ươm giống 04',
      width: 8,
      height: 6,
      deviceCount: 0,
      status: 'OFFLINE',
      theme: 'empty',
    },
  ];

  // Dynamic 3D tilt micro-interaction on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget as HTMLDivElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget as HTMLDivElement;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  // Filter & Search Logic
  const filteredHouses = housesData.filter((house) => {
    const matchesSearch = house.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === 'ALL' ||
      (activeFilter === 'ACTIVE' && house.status === 'ACTIVE') ||
      (activeFilter === 'MAINTENANCE' && house.status === 'MAINTENANCE') ||
      (activeFilter === 'OFFLINE' && house.status === 'OFFLINE');

    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`dashboard-page ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar Navigation */}
      <Sidebar
        activeId="mushroom-houses"
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Top Navigation Bar */}
        <header className="dashboard-header">
          <div className="header-left">
            <nav className="header-zones">
              <span className="zone-tab inactive">Nhà nấm A</span>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--db-outline-variant)' }}>
                chevron_right
              </span>
              <span className="zone-tab active">Khu vực 1</span>
            </nav>
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
            <button type="button" className="icon-btn" title="Đăng xuất" onClick={handleLogout}>
              <span className="material-symbols-outlined">logout</span>
            </button>
            <img
              alt="User Avatar"
              className="user-avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgHA_qU8Cc0gNeTIxCPo9ezJFPN3z5QcexsINbKwdKqX_VrKzM9u9z0vRauJQFAv_4YJkwoHbsGjNScOWDjw4GQtuSuqB1D8jR9sOUi2JyyvcVAcAMQhrNl5Xo8ot_hb_BaT80jzniC1_mx9CeUegn9zpE1LB4mrWOr05kTr43CRMe4nNMSV03qnO8LI-S8gj-B8QEyI5SQ_RgpUzMHCUTx_fLDXBaG-J-5Y9c1wIInBwCxx-rwCkhrKTpJx13CsGBdrqpOD2jU4AM"
            />
          </div>
        </header>

        {/* Workspace Content */}
        <div className="dashboard-content">
          {/* Header & Actions Row */}
          <div className="houses-header-actions">
            <div className="houses-title-wrapper">
              <h2>Quản lý Nhà nấm</h2>
              <p>Giám sát và quản lý môi trường nuôi trồng và các nút IoT đang hoạt động.</p>
            </div>
            <div className="search-add-wrapper">
              <div className="search-box-wrapper">
                <span className="material-symbols-outlined search-icon">search</span>
                <input
                  type="text"
                  placeholder="Tìm kiếm nhà nấm..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button type="button" className="add-house-btn">
                <span className="material-symbols-outlined">add</span>
                Thêm nhà nấm
              </button>
            </div>
          </div>

          {/* Filter Controls Row */}
          <div className="filter-controls">
            <button
              type="button"
              className={`filter-btn ${activeFilter === 'ALL' ? 'active' : 'inactive'}`}
              onClick={() => setActiveFilter('ALL')}
            >
              Tất cả (12)
            </button>
            <button
              type="button"
              className={`filter-btn ${activeFilter === 'ACTIVE' ? 'active' : 'inactive'}`}
              onClick={() => setActiveFilter('ACTIVE')}
            >
              Đang hoạt động (8)
            </button>
            <button
              type="button"
              className={`filter-btn ${activeFilter === 'MAINTENANCE' ? 'active' : 'inactive'}`}
              onClick={() => setActiveFilter('MAINTENANCE')}
            >
              Bảo trì (3)
            </button>
            <button
              type="button"
              className={`filter-btn ${activeFilter === 'OFFLINE' ? 'active' : 'inactive'}`}
              onClick={() => setActiveFilter('OFFLINE')}
            >
              Ngoại tuyến (1)
            </button>
            <div style={{ width: '1px', backgroundColor: 'var(--db-outline-variant)', height: '24px', margin: '0 8px' }}></div>
            <button type="button" className="filter-more-btn">
              <span className="material-symbols-outlined">filter_list</span>
              Lọc thêm
            </button>
          </div>

          {/* Bento Grid Layout of House Cards */}
          <div className="houses-grid">
            {filteredHouses.map((house) => {
              const isActive = house.status === 'ACTIVE';
              const isMaintenance = house.status === 'MAINTENANCE';

              return (
                <div
                  key={house.id}
                  className={`house-card ${house.theme === 'empty' ? 'border-dashed' : ''}`}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Card Header Image or Placeholder */}
                  {house.imageUrl ? (
                    <div className="card-image-wrapper">
                      <img alt={house.name} src={house.imageUrl} className="house-image" />
                      <div className={`card-status-badge ${isMaintenance ? 'maintenance' : ''}`}>
                        {isActive && <span className="badge-pulse"></span>}
                        {isActive ? 'ĐANG HOẠT ĐỘNG' : 'BẢO TRÌ'}
                      </div>
                    </div>
                  ) : (
                    <div className="house-card-placeholder">
                      <span className="material-symbols-outlined house-placeholder-icon">meeting_room</span>
                    </div>
                  )}

                  {/* Card Information */}
                  <div className="house-card-body">
                    <div className="card-title-row">
                      <div>
                        <h3 className="card-house-title">{house.name}</h3>
                        <p className="card-house-size">
                          <span className="material-symbols-outlined">straighten</span>
                          {house.width}m x {house.height}m
                        </p>
                      </div>
                      <div className="card-device-count-wrapper">
                        <span
                          className={`card-device-count ${
                            isMaintenance ? 'maintenance-theme' : house.theme === 'empty' ? 'empty-theme' : ''
                          }`}
                        >
                          {house.deviceCount < 10 && house.deviceCount > 0
                            ? `0${house.deviceCount}`
                            : house.deviceCount}
                        </span>
                        <span className="card-device-label">THIẾT BỊ</span>
                      </div>
                    </div>

                    {/* Sparkline / Environmental Metrics Preview */}
                    {house.theme !== 'empty' && house.metricLabel ? (
                      <div className="card-metric-preview">
                        <div className="card-metric-info">
                          <span className="card-metric-label">{house.metricLabel}</span>
                          <span className="card-metric-value">{house.metricValue}</span>
                        </div>
                        <div className={`card-metric-chart ${isMaintenance ? 'maintenance-theme' : ''}`}>
                          {house.chartData?.map((val, idx) => (
                            <div
                              key={idx}
                              className={`chart-bar ${isMaintenance ? 'warning-bar' : ''} ${
                                idx === 2 ? 'highlight' : ''
                              }`}
                              style={{ height: `${val}%` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="empty-state-notice">
                        <p>Đang chờ thiết lập phần cứng...</p>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="card-actions-row">
                      {house.theme !== 'empty' ? (
                        <>
                          <button
                            type="button"
                            className="card-action-btn border-outline"
                            onClick={() => navigate(`/houses/${house.id}`)}
                          >
                            <span className="material-symbols-outlined">visibility</span>
                            Xem
                          </button>
                          <button type="button" className="card-action-btn border-outline">
                            <span className="material-symbols-outlined">edit</span>
                            Sửa
                          </button>
                        </>
                      ) : (
                        <>
                          <button type="button" className="card-action-btn primary-btn">
                            <span className="material-symbols-outlined">add_circle</span>
                            Thiết lập
                          </button>
                          <button type="button" className="card-action-btn border-outline">
                            <span className="material-symbols-outlined">delete</span>
                            Xóa
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Row */}
          <div className="houses-pagination">
            <p>Hiển thị {filteredHouses.length} trên 12 Nhà nấm</p>
            <div className="pagination-btn-group">
              <button type="button" className="pagination-btn" disabled title="Trang trước">
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
      </main>
    </div>
  );
};

export default Houses;
