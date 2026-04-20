'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function calculateLoan(amount, years, interestRate) {
  const n = years * 12;
  const r = interestRate / 12 / 100;

  const monthlyPayment =
    r === 0
      ? amount / n
      : (amount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);

  const totalPayment = monthlyPayment * n;
  const totalInterest = totalPayment - amount;

  return { monthlyPayment, totalPayment, totalInterest };
}

function formatPLN(value) {
  return (
    value.toLocaleString('pl-PL', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + ' PLN'
  );
}

export default function Home() {
  const [amount, setAmount] = useState('');
  const [years, setYears] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    const amountNum = parseFloat(amount);
    const yearsNum = parseInt(years, 10);
    const rateNum = parseFloat(interestRate);

    if (!amount || isNaN(amountNum) || amountNum <= 0)
      newErrors.amount = 'Podaj prawidłową kwotę kredytu (liczba > 0).';

    if (!years || isNaN(yearsNum) || yearsNum <= 0 || yearsNum > 50 || !Number.isInteger(yearsNum))
      newErrors.years = 'Podaj liczbę lat spłaty (liczba całkowita 1–50).';

    if (!interestRate || isNaN(rateNum) || rateNum <= 0 || rateNum > 100)
      newErrors.interestRate = 'Podaj prawidłowe oprocentowanie (0–100%).';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setResult(calculateLoan(amountNum, yearsNum, rateNum));
    } else {
      setResult(null);
    }
  }

  return (
    <div id="page-wrapper">

      {/* Header */}
      <div id="header-wrapper">
        <div id="header" className="container">
          <h1 id="logo"><a href="#">Kalkulator Kredytowy</a></h1>
          <nav id="nav">
            <ul>
              <li className="current"><a href="#">Strona główna</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Wyloguj</a></li>
            </ul>
          </nav>
        </div>

        {/* Hero */}
        <section id="hero" className="container">
          <header>
            <h2>Kalkulator Kredytowy</h2>
          </header>
          <p>
            Oblicz miesięczną ratę, sumę spłat i łączne odsetki<br />
            dla swojego kredytu hipotecznego lub gotówkowego.
          </p>
          <ul className="actions">
            <li><a href="#kalkulator" className="button">Przejdź do kalkulatora</a></li>
          </ul>
        </section>
      </div>

      {/* Formularz */}
      <div className="wrapper" id="kalkulator">
        <section className="container">
          <header className="major">
            <h2>Wprowadź dane kredytu</h2>
            <p>Wypełnij poniższy formularz, aby obliczyć parametry kredytu</p>
          </header>

          <form method="POST" onSubmit={handleSubmit}>
            <div className="row">

              <div className="col-4 col-12-narrower">
                <label htmlFor="amount">Kwota kredytu (PLN)</label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  placeholder="np. 300000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{ width: '100%', marginTop: '0.5em' }}
                />
                {errors.amount && (
                  <p style={{ color: '#e44', margin: '0.3em 0 0', fontSize: '0.9em' }}>
                    {errors.amount}
                  </p>
                )}
              </div>

              <div className="col-4 col-12-narrower">
                <label htmlFor="years">Okres spłaty (lata)</label>
                <input
                  type="text"
                  id="years"
                  name="years"
                  placeholder="np. 25"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  style={{ width: '100%', marginTop: '0.5em' }}
                />
                {errors.years && (
                  <p style={{ color: '#e44', margin: '0.3em 0 0', fontSize: '0.9em' }}>
                    {errors.years}
                  </p>
                )}
              </div>

              <div className="col-4 col-12-narrower">
                <label htmlFor="interestRate">Oprocentowanie roczne (%)</label>
                <input
                  type="text"
                  id="interestRate"
                  name="interestRate"
                  placeholder="np. 7.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  style={{ width: '100%', marginTop: '0.5em' }}
                />
                {errors.interestRate && (
                  <p style={{ color: '#e44', margin: '0.3em 0 0', fontSize: '0.9em' }}>
                    {errors.interestRate}
                  </p>
                )}
              </div>

            </div>

            <ul className="actions major" style={{ marginTop: '2em' }}>
              <li><input type="submit" value="Oblicz ratę" className="button" /></li>
            </ul>
          </form>

        </section>
      </div>

      {/* Wyniki */}
      {result && (
        <>
          <div id="promo-wrapper">
            <section id="promo">
              <h2>Miesięczna rata: {formatPLN(result.monthlyPayment)}</h2>
              <a href="#details" className="button">Zobacz szczegóły</a>
            </section>
          </div>

          <div className="wrapper" id="details">
            <section className="container">
              <header className="major">
                <h2>Wyniki obliczeń</h2>
                <p>Podsumowanie parametrów Twojego kredytu</p>
              </header>
              <div className="row features">

                <section className="col-4 col-12-narrower feature">
                  <header><h2>Miesięczna rata</h2></header>
                  <p style={{ fontSize: '1.4em', fontWeight: 'bold' }}>
                    {formatPLN(result.monthlyPayment)}
                  </p>
                  <p>Stała rata kapitałowo-odsetkowa płatna co miesiąc przez cały okres spłaty.</p>
                </section>

                <section className="col-4 col-12-narrower feature">
                  <header><h2>Suma wszystkich spłat</h2></header>
                  <p style={{ fontSize: '1.4em', fontWeight: 'bold' }}>
                    {formatPLN(result.totalPayment)}
                  </p>
                  <p>Łączna kwota, jaką zapłacisz bankowi przez cały okres kredytowania.</p>
                </section>

                <section className="col-4 col-12-narrower feature">
                  <header><h2>Łączne odsetki</h2></header>
                  <p style={{ fontSize: '1.4em', fontWeight: 'bold' }}>
                    {formatPLN(result.totalInterest)}
                  </p>
                  <p>Koszt kredytu — różnica między sumą spłat a pożyczoną kwotą.</p>
                </section>

              </div>
            </section>
          </div>
        </>
      )}

      {/* Footer */}
      <div id="footer-wrapper">
        <div id="footer" className="container">
          <header className="major">
            <h2>Kalkulator Kredytowy</h2>
            <p>
              Narzędzie do szacowania kosztów kredytu hipotecznego i gotówkowego.
            </p>
          </header>
        </div>
        <div id="copyright" className="container">
          <ul className="menu">
            <li>&copy; Kalkulator Kredytowy</li>
            <li>Szablon: <a href="http://html5up.net">HTML5 UP</a></li>
          </ul>
        </div>
      </div>

    </div>
  );
}
