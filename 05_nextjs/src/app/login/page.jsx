'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [blad, setBlad] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setBlad('');

    const result = await signIn('credentials', {
      login,
      password: pass,
      redirect: false,
    });

    if (result?.ok) {
      router.push('/');
      router.refresh();
    } else {
      setBlad('Niepoprawny login lub hasło');
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

            <label htmlFor="pass">Hasło</label>
            <input
              id="pass"
              type="password"
              placeholder="hasło"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              style={{ width: '100%', marginTop: '0.5em' }}
            />

            {blad && (
              <p style={{ color: '#e44', margin: '0.8em 0 0', fontSize: '0.9em' }}>{blad}</p>
            )}

            <ul className="actions major" style={{ marginTop: '2em' }}>
              <li><input type="submit" value="Zaloguj" className="button" /></li>
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
