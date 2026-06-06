// src/components/ResetPassword/ResetPassword.tsx
import React, { useState, useEffect, useMemo } from 'react';
import './ResetPassword.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import Swal from 'sweetalert2';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  const getUrlToken = (): string => {
    const params = new URLSearchParams(window.location.search);
    return params.get('token') || '';
  };

  const [token, setToken] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');
  
  const [hasUrlToken, setHasUrlToken] = useState<boolean>(false);

  useEffect(() => {
    const t = getUrlToken();
    if (t) {
      setToken(t);
      setHasUrlToken(true);
    }
  }, []);

  const strength = useMemo(() => {
    const val = newPassword;
    let score = 0;

    const requirements = {
      length: val.length >= 8,
      specialOrNumber: /[!@#$%^&*(),.?":{}|<>0-9]/.test(val),
      uppercase: /[A-Z]/.test(val),
      long: val.length > 12,
    };

    if (requirements.length) score++;
    if (requirements.specialOrNumber) score++;
    if (requirements.uppercase) score++;
    if (requirements.long) score++;

    const labels = ['Yêu cầu thêm', 'Trung bình', 'Mạnh', 'Bảo mật cao'];
    const colors = ['weak', 'fair', 'strong', 'secure'];

    return {
      score,
      requirements,
      label: val.length > 0 ? labels[score - 1] : 'Hãy nhập mật khẩu',
      colorClass: val.length > 0 ? colors[score - 1] : '',
    };
  }, [newPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setStatus('error');
      setMessage('Mã Token xác thực không được để trống.');
      Swal.fire({
        icon: 'warning',
        title: 'Thiếu Token',
        text: 'Vui lòng cung cấp mã Token khôi phục mật khẩu.',
        confirmButtonText: 'Đóng',
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatus('error');
      setMessage('Mật khẩu xác nhận không trùng khớp.');
      Swal.fire({
        icon: 'warning',
        title: 'Mật khẩu không khớp',
        text: 'Mật khẩu xác nhận phải giống mật khẩu mới.',
        confirmButtonText: 'Đóng',
      });
      return;
    }
    if (newPassword.length < 8) {
      setStatus('error');
      setMessage('Mật khẩu mới phải có ít nhất 8 ký tự.');
      Swal.fire({
        icon: 'warning',
        title: 'Mật khẩu yếu',
        text: 'Vui lòng đảm bảo mật khẩu mới dài ít nhất 8 ký tự.',
        confirmButtonText: 'Đóng',
      });
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await api.post('/auth/reset-password', {
        token,
        newPassword,
        confirmPassword,
      });

      if (response.data.success) {
        setStatus('success');
        setMessage(response.data.message || 'Mật khẩu của bạn đã được cập nhật thành công.');
        
        await Swal.fire({
          icon: 'success',
          title: 'Đặt lại thành công',
          text: 'Mật khẩu mới đã được cập nhật! Hệ thống đang chuyển về trang Đăng nhập.',
          timer: 2000,
          showConfirmButton: false,
        });

        navigate('/login');
      }
    } catch (error: any) {
      setStatus('error');
      const errorMsg = error.response?.data?.message || 'Token không hợp lệ hoặc đã hết hạn.';
      setMessage(errorMsg);

      await Swal.fire({
        icon: 'error',
        title: 'Đặt lại thất bại',
        text: errorMsg,
        confirmButtonText: 'Thử lại',
      });
    }
  };

  return (
    <div className="reset-password-container">
      <main className="main-layout">
        
        {/* Left Side: Immersive Imagery */}
        <section className="imagery-section">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDwN9XhVB2jMBqw7MWPMK6HSUSOt4u3tpHC4P9LZcpPy_KLArp6BR2TypxPT9ngwC_5IpWAAvRDqaKj0RhsC7ba50-Su4T6h_ZrLTtDkjx09McNjjEY6dT1eQ6uxFxrevV0OTtd1oC82fAQFMrkq7WwqtF5mVmy1jhe1boxN9G-mVrQ2V90AXC3zOXRaD6cJHOjSyhAwxJ1OMtdRvYSY7YqEoLRfoFNWqmOdw2_dYRC1FITak9mSO2IGcfRu23GFdRHGzqTNdjfhAn" 
            alt="Smart Farm Monitoring" 
            className="bg-image"
          />
          <div className="gradient-overlay"></div>
          <div className="branding-content">
            <div className="glass-panel">
              <h2 className="branding-title">Nâng Tầm Trí Tuệ Trang Trại.</h2>
              <p className="branding-subtitle">
                Hệ thống tự động hóa và độ chính xác cao của chúng tôi đảm bảo năng suất của bạn được tối ưu hóa thông qua dữ liệu nấm và điều phối môi trường thời gian thực.
              </p>
            </div>
          </div>
        </section>

        {/* Right Side: Reset Password Form */}
        <section className="form-section">
          <div className="form-content">
            
            <div className="brand-header">
              <div className="brand-logo-group">
                <span className="material-symbols-outlined logo-icon">grid_view</span>
                <span className="brand-name">Mycelium Intelligence</span>
              </div>
              <h1 className="form-title">Đặt lại mật khẩu</h1>
              <p className="form-subtitle">
                Tạo một mật khẩu mới an toàn cho tài khoản của bạn để tiếp tục kiểm tra và giám sát trang trại.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="form-fields">
              
              {!hasUrlToken && (
                <div className="form-group">
                  <label className="input-label" htmlFor="token">Mã Token xác thực</label>
                  <div className="input-relative">
                    <span className="material-symbols-outlined input-icon">key</span>
                    <input
                      id="token"
                      name="token"
                      type="text"
                      required
                      placeholder="Dán mã Token khôi phục tại đây"
                      className="form-input"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="input-label" htmlFor="new-password">Mật khẩu mới</label>
                <div className="input-relative">
                  <span className="material-symbols-outlined input-icon">lock</span>
                  <input
                    id="new-password"
                    name="new-password"
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    className="form-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="eye-button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    <span className="material-symbols-outlined">
                      {showNewPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                
                <div className="strength-bars-container">
                  <div className={`strength-bar ${strength.score >= 1 ? strength.colorClass : ''}`}></div>
                  <div className={`strength-bar ${strength.score >= 2 ? strength.colorClass : ''}`}></div>
                  <div className={`strength-bar ${strength.score >= 3 ? strength.colorClass : ''}`}></div>
                  <div className={`strength-bar ${strength.score >= 4 ? strength.colorClass : ''}`}></div>
                </div>
                <p className="strength-text">
                  Mức độ bảo mật: <span className={`strength-label ${strength.colorClass}`}>{strength.label}</span>
                </p>
              </div>

              <div className="form-group">
                <label className="input-label" htmlFor="confirm-password">Xác nhận mật khẩu mới</label>
                <div className="input-relative">
                  <span className="material-symbols-outlined input-icon">lock_reset</span>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    className="form-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="eye-button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <span className="material-symbols-outlined">
                      {showConfirmPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="requirements-card">
                <p className="requirements-title">YÊU CẦU MẬT KHẨU BẮT BUỘC:</p>
                <ul className="requirements-list">
                  <li className={`requirement-item ${strength.requirements.length ? 'valid' : ''}`}>
                    <span className="material-symbols-outlined">
                      {strength.requirements.length ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                    <span>Có tối thiểu 8 ký tự</span>
                  </li>
                  <li className={`requirement-item ${strength.requirements.specialOrNumber ? 'valid' : ''}`}>
                    <span className="material-symbols-outlined">
                      {strength.requirements.specialOrNumber ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                    <span>Có ít nhất 1 số hoặc ký tự đặc biệt (!@#...)</span>
                  </li>
                </ul>
              </div>

              {status === 'error' && (
                <div className="alert-box error-alert">
                  <span className="material-symbols-outlined">error</span>
                  <span>{message}</span>
                </div>
              )}

              {status === 'success' && (
                <div className="alert-box success-alert">
                  <span className="material-symbols-outlined">check_circle</span>
                  <span>{message} Đang về trang đăng nhập...</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="submit-btn"
              >
                {status === 'loading' ? (
                  <>
                    <span className="material-symbols-outlined spinner-rotate">progress_activity</span>
                    <span>Đang cập nhật...</span>
                  </>
                ) : (
                  <>
                    <span>Cập nhật mật khẩu</span>
                    <span className="material-symbols-outlined">sync</span>
                  </>
                )}
              </button>

              <div className="back-navigation">
                <Link to="/login" className="back-to-signin-link">Quay lại Đăng nhập</Link>
              </div>

            </form>
          </div>
        </section>

      </main>

      <footer className="footer-container">
        <p className="footer-copyright">© 2024 Mycelium Intelligence Systems</p>
        <div className="footer-links">
          <a href="#support" className="footer-link">Hỗ trợ</a>
          <a href="#privacy" className="footer-link">Bảo mật</a>
        </div>
      </footer>
    </div>
  );
};