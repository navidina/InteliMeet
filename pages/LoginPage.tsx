import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogoIcon } from '../components/Icons';
import { toPersianDigits } from '../constants';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [time, setTime] = useState(new Date());

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (username.trim() === '') {
        setError('نام کاربری نمی‌تواند خالی باشد.');
        return;
    }
    login(username, () => navigate('/dashboard'));
  };
  
  const formattedDate = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(time);

  const formattedTime = time.toLocaleTimeString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
  });


  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
        <header className="py-4 px-8 flex justify-between items-center text-gray-600">
            <div className="flex items-center gap-2">
                <LogoIcon className="w-8 h-8"/>
                <span className="font-semibold">دستیار مستندساز هوشمند</span>
            </div>
            <div>
                 <span>{formattedDate} ساعت {formattedTime}</span>
            </div>
        </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">ورود به سامانه</h2>
            <p className="text-gray-500 mt-2">
              لطفا اطلاعات خود را برای ورود وارد کنید
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
                نام کاربری
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="نام کاربری را وارد کنید"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                      رمز عبور
                  </label>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور را وارد کنید"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition"
                required
              />
            </div>
            
            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="w-full bg-sky-500 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition shadow-md"
            >
              ورود
            </button>
          </form>
        </div>
      </main>
       <footer className="text-center py-4 text-gray-500 text-sm">
            <p>{toPersianDigits('2025')} کلیه حقوق محفوظ است.</p>
       </footer>
    </div>
  );
};

export default LoginPage;