import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

interface RegisterProps {
  onRegisterSuccess?: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'idle') return;

    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không trùng khớp!');
      return;
    }

    if (!agreeTerms) {
      alert('Bạn phải đồng ý với Điều khoản dịch vụ và Chính sách bảo mật!');
      return;
    }

    setStatus('submitting');

    setTimeout(() => {
      setStatus('success');
      if (onRegisterSuccess) {
        setTimeout(onRegisterSuccess, 1000);
      }
    }, 1500);
  };

  return (
    <div className="register-page-body">
      <main className="register-container">
        {/* Nút quay lại trang chủ ở góc trái */}
        <Link to="/" className="btn-back-home">
          <span className="material-symbols-outlined">arrow_back</span>
          Trang chủ
        </Link>
        {/* Left Side: Visual/Branding */}
        <section className="branding-section">
          {/* Animated Background Pattern */}
          <div className="branding-bg-dots" />
          
          <div className="branding-content-wrapper">
            <div className="branding-glass-card glass-card">
              <img
                alt="Công nghệ nuôi trồng nấm"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0CZoq81D6oUrKjpz2iUdonPf2gsoxZV7CTyWAGuqEzuZHnIeSg4DCNVm3uIz52X1E0bV2vwxt7eadvFdDevHE1ONib6mb1l4qqWlqY9gcf3lgnWGWWAbKiAVoAYu_hEjqeejvs5_ZOO5h7ohkwAldZ5aZlix1d1ZOp4UlxBy8MBsNghnTRaZVp_B32fOLv64ZJTbQe3DrNLvRjqrCDfCmWYoAqSZfasztlSZvmyTrdw1GdS3m6izzIogqJ2NzXFXQtucIJJu1q9Fo"
              />
              <h1 className="branding-title">Canh Tác Chính Xác.</h1>
              <p className="branding-desc">
                Tham gia mạng lưới IoT nấm tiên tiến nhất thế giới. Giám sát độ ẩm, nồng độ CO2 và chu kỳ sinh trưởng với độ chính xác thời gian thực từ mọi thiết bị.
              </p>
            </div>
            
            <div className="stats-grid">
              <div className="stat-card glass-card">
                <span className="material-symbols-outlined">analytics</span>
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Thời gian hoạt động</div>
              </div>
              <div className="stat-card glass-card">
                <span className="material-symbols-outlined">memory</span>
                <div className="stat-number">12k+</div>
                <div className="stat-label">Cảm biến kết nối</div>
              </div>
            </div>
          </div>
          
          {/* Decorative blur elements */}
          <div className="glow-bottom-left" />
          <div className="glow-top-right" />
        </section>

        {/* Right Side: Registration Form */}
        <section className="register-form-section">
          <div className="form-wrapper">
            {/* Header & Logo */}
            <div className="logo-header">
              <div className="logo-box">
                <div className="logo-icon-box">
                  <span className="material-symbols-outlined">potted_plant</span>
                </div>
                <span className="logo-text">Smart Garden</span>
              </div>
              <div className="header-texts">
                <h2>Tạo tài khoản của bạn</h2>
                <p>Bắt đầu tối ưu hóa năng suất nấm của bạn ngay hôm nay.</p>
              </div>
            </div>

            {/* Registration Form */}
            <form className="register-form" onSubmit={handleSubmit}>
              {/* Username (Sửa fullname thành username theo yêu cầu) */}
              <div className="input-group">
                <label className="input-label" htmlFor="username">
                  Tên đăng nhập
                </label>
                <div className={`input-wrapper ${focusedField === 'username' ? 'scaled' : ''}`}>
                  <span className="material-symbols-outlined input-icon">person</span>
                  <input
                    className="form-input"
                    id="username"
                    name="username"
                    type="text"
                    placeholder="johndoe"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField(null)}
                    disabled={status !== 'idle'}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="input-group">
                <label className="input-label" htmlFor="email">
                  Địa chỉ Email
                </label>
                <div className={`input-wrapper ${focusedField === 'email' ? 'scaled' : ''}`}>
                  <span className="material-symbols-outlined input-icon">mail</span>
                  <input
                    className="form-input"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ten@congty.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    disabled={status !== 'idle'}
                  />
                </div>
              </div>

              {/* Password & Confirm Password Grid */}
              <div className="password-grid">
                <div className="input-group">
                  <label className="input-label" htmlFor="password">
                    Mật khẩu
                  </label>
                  <div className={`input-wrapper ${focusedField === 'password' ? 'scaled' : ''}`}>
                    <span className="material-symbols-outlined input-icon">lock</span>
                    <input
                      className="form-input"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      disabled={status !== 'idle'}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label" htmlFor="confirm_password">
                    Xác nhận mật khẩu
                  </label>
                  <div className={`input-wrapper ${focusedField === 'confirm_password' ? 'scaled' : ''}`}>
                    <span className="material-symbols-outlined input-icon">enhanced_encryption</span>
                    <input
                      className="form-input"
                      id="confirm_password"
                      name="confirm_password"
                      type="password"
                      placeholder="••••••••"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onFocus={() => setFocusedField('confirm_password')}
                      onBlur={() => setFocusedField(null)}
                      disabled={status !== 'idle'}
                    />
                  </div>
                </div>
              </div>

              {/* Agreement */}
              <div className="agreement-row">
                <input
                  className="agreement-checkbox"
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  disabled={status !== 'idle'}
                />
                <label className="agreement-label" htmlFor="terms">
                  Tôi đồng ý với{' '}
                  <a href="#terms-link" onClick={(e) => e.preventDefault()}>
                    Điều khoản dịch vụ
                  </a>{' '}
                  và{' '}
                  <a href="#privacy-link" onClick={(e) => e.preventDefault()}>
                    Chính sách bảo mật
                  </a>
                  .
                </label>
              </div>

              {/* CTA Action button with ripples */}
              <button
                className={`btn-submit ${status === 'submitting' ? 'submitting' : ''} ${status === 'success' ? 'success' : ''}`}
                type="submit"
                onClick={handleButtonClick}
                disabled={status !== 'idle'}
              >
                {status === 'idle' && 'Tạo tài khoản'}
                {status === 'submitting' && (
                  <>
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    Đang thiết lập...
                  </>
                )}
                {status === 'success' && (
                  <>
                    <span className="material-symbols-outlined">check_circle</span>
                    Thành công
                  </>
                )}
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="ripple active"
                    style={{ left: ripple.x, top: ripple.y }}
                  />
                ))}
              </button>
            </form>

            {/* Divider */}
            <div className="divider-container">
              <div className="divider-line" />
              <div className="divider-text-wrapper">Thiết lập bảo mật</div>
            </div>

            {/* Footer Link */}
            <p className="footer-text">
              Bạn đã có tài khoản?
              <Link className="signin-link" to="/login" style={{ fontWeight: 700, marginLeft: '6px' }}>
                Đăng nhập
              </Link>
            </p>
          </div>

          {/* Bottom Floating Decoration for Mobile */}
          <div className="mobile-security-badge">
            <span className="material-symbols-outlined">verified_user</span>
            <span className="material-symbols-outlined">shield</span>
            <span className="material-symbols-outlined">lock</span>
          </div>
        </section>
      </main>
    </div>
  );
};
