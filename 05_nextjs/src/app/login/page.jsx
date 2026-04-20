'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push('/');
      router.refresh();
    } else {
      try {
        const data = await res.json();
        setError(data.error || 'Niepoprawny login lub hasło');
      } catch {
        setError('Niepoprawny login lub hasło');
      }
    }
  }

  return (
    <div id="page-wrapper">

      <div id="header-wrapper">
        <div className="container">
          <h1 id="logo"><a href="#">Kalkulator Kredytowy</a></h1>
        </div>
        <section id="hero" className="container">
          <header>
            <h2>Logowanie</h2>
          </header>
          <p>Zaloguj się, aby uzyskać dostęp do kalkulatora.</p>
        </section>
      </div>

      <div className="wrapper">
        <section className="container">
          <header className="major">
            <h2>Podaj dane logowania</h2>
          </header>

          <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>

            <label htmlFor="login">Login</label>
            <input
              id="login"
              type="text"
              placeholder="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              style={{ width: '100%', marginTop: '0.5em', marginBottom: '1em' }}
            />

            <label htmlFor="password">Hasło</label>
            <input
              id="password"
              type="password"
              placeholder="hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', marginTop: '0.5em' }}
            />

            {error && (
              <p style={{ color: '#e44', margin: '0.8em 0 0', fontSize: '0.9em' }}>
                {error}
              </p>
            )}

            <ul className="actions major" style={{ marginTop: '2em' }}>
              <li>
                <input
                  type="submit"
                  value={loading ? 'Logowanie...' : 'Zaloguj'}
                  className="button"
                  disabled={loading}
                />
              </li>
            </ul>

          </form>
        </section>
      </div>

      <div id="footer-wrapper">
        <div id="copyright" className="container">
          <ul className="menu">
            <li>&copy; Kalkulator Kredytowy</li>
          </ul>
        </div>
      </div>

    </div>
  );
}
