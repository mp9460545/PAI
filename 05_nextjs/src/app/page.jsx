'use client';

import { useState } from 'react';

function obliczRate(kwota, lata, oprocentowanie) {
  const n = lata * 12;
  const r = oprocentowanie / 12 / 100;

  const rata =
    r === 0
      ? kwota / n
      : (kwota * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);

  const sumaSplat = rata * n;
  const sumaOdsetek = sumaSplat - kwota;

  return { rata, sumaSplat, sumaOdsetek };
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
  const [kwota, setKwota] = useState('');
  const [lata, setLata] = useState('');
  const [oprocentowanie, setOprocentowanie] = useState('');
  const [bledy, setBledy] = useState({});
  const [wyniki, setWyniki] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const noweBledy = {};
    const kwotaNum = parseFloat(kwota);
    const lataNum = parseInt(lata, 10);
    const opr = parseFloat(oprocentowanie);

    if (!kwota || isNaN(kwotaNum) || kwotaNum <= 0)
      noweBledy.kwota = 'Podaj prawidłową kwotę kredytu (liczba > 0).';

    if (!lata || isNaN(lataNum) || lataNum <= 0 || lataNum > 50 || !Number.isInteger(lataNum))
      noweBledy.lata = 'Podaj liczbę lat spłaty (liczba całkowita 1–50).';

    if (!oprocentowanie || isNaN(opr) || opr <= 0 || opr > 100)
      noweBledy.oprocentowanie = 'Podaj prawidłowe oprocentowanie (0–100%).';

    setBledy(noweBledy);

    if (Object.keys(noweBledy).length === 0) {
      setWyniki(obliczRate(kwotaNum, lataNum, opr));
    } else {
      setWyniki(null);
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
                <label htmlFor="kwota">Kwota kredytu (PLN)</label>
                <input
                  type="text"
                  id="kwota"
                  name="kwota"
                  placeholder="np. 300000"
                  value={kwota}
                  onChange={(e) => setKwota(e.target.value)}
                  style={{ width: '100%', marginTop: '0.5em' }}
                />
                {bledy.kwota && (
                  <p style={{ color: '#e44', margin: '0.3em 0 0', fontSize: '0.9em' }}>
                    {bledy.kwota}
                  </p>
                )}
              </div>

              <div className="col-4 col-12-narrower">
                <label htmlFor="lata">Okres spłaty (lata)</label>
                <input
                  type="text"
                  id="lata"
                  name="lata"
                  placeholder="np. 25"
                  value={lata}
                  onChange={(e) => setLata(e.target.value)}
                  style={{ width: '100%', marginTop: '0.5em' }}
                />
                {bledy.lata && (
                  <p style={{ color: '#e44', margin: '0.3em 0 0', fontSize: '0.9em' }}>
                    {bledy.lata}
                  </p>
                )}
              </div>

              <div className="col-4 col-12-narrower">
                <label htmlFor="oprocentowanie">Oprocentowanie roczne (%)</label>
                <input
                  type="text"
                  id="oprocentowanie"
                  name="oprocentowanie"
                  placeholder="np. 7.5"
                  value={oprocentowanie}
                  onChange={(e) => setOprocentowanie(e.target.value)}
                  style={{ width: '100%', marginTop: '0.5em' }}
                />
                {bledy.oprocentowanie && (
                  <p style={{ color: '#e44', margin: '0.3em 0 0', fontSize: '0.9em' }}>
                    {bledy.oprocentowanie}
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
      {wyniki && (
        <>
          <div id="promo-wrapper">
            <section id="promo">
              <h2>Miesięczna rata: {formatPLN(wyniki.rata)}</h2>
              <a href="#szczegoly" className="button">Zobacz szczegóły</a>
            </section>
          </div>

          <div className="wrapper" id="szczegoly">
            <section className="container">
              <header className="major">
                <h2>Wyniki obliczeń</h2>
                <p>Podsumowanie parametrów Twojego kredytu</p>
              </header>
              <div className="row features">

                <section className="col-4 col-12-narrower feature">
                  <header><h2>Miesięczna rata</h2></header>
                  <p style={{ fontSize: '1.4em', fontWeight: 'bold' }}>
                    {formatPLN(wyniki.rata)}
                  </p>
                  <p>Stała rata kapitałowo-odsetkowa płatna co miesiąc przez cały okres spłaty.</p>
                </section>

                <section className="col-4 col-12-narrower feature">
                  <header><h2>Suma wszystkich spłat</h2></header>
                  <p style={{ fontSize: '1.4em', fontWeight: 'bold' }}>
                    {formatPLN(wyniki.sumaSplat)}
                  </p>
                  <p>Łączna kwota, jaką zapłacisz bankowi przez cały okres kredytowania.</p>
                </section>

                <section className="col-4 col-12-narrower feature">
                  <header><h2>Łączne odsetki</h2></header>
                  <p style={{ fontSize: '1.4em', fontWeight: 'bold' }}>
                    {formatPLN(wyniki.sumaOdsetek)}
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
