import React from 'react';

interface FarmMapLegendProps {
  showSensors: boolean;
  setShowSensors: (val: boolean) => void;
  show3dOverlay: boolean;
  setShow3dOverlay: (val: boolean) => void;
}

export const FarmMapLegend: React.FC<FarmMapLegendProps> = ({
  showSensors,
  setShowSensors,
  show3dOverlay,
  setShow3dOverlay,
}) => {
  return (
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
  );
};
