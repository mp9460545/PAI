<!DOCTYPE html>
<html lang="pl">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<title>Kalkulator Kredytowy</title>
		<link rel="stylesheet" href="assets/css/main.css" />
		<style>
			html { scroll-behavior: smooth; }
		</style>
	</head>
	<body class="homepage is-preload">
		<div id="page-wrapper">

			<!-- Header -->
			<div id="header-wrapper">
				<div id="header" class="container">
					<h1 id="logo"><a href="index.php">Kalkulator Kredytowy</a></h1>
					<nav id="nav">
						<ul>
							<!-- <li class="current"><a href="index.php">Strona główna</a></li> -->
						</ul>
					</nav>
				</div>

				<!-- Hero -->
				<section id="hero" class="container">
					<header>
						<h2>Kalkulator Kredytowy</h2>
					</header>
					<p>Oblicz miesięczną ratę, sumę spłat i łączne odsetki<br />
					dla swojego kredytu hipotecznego lub gotówkowego.</p>
					<ul class="actions">
						<li><a href="#kalkulator" class="button">Przejdź do kalkulatora</a></li>
					</ul>
				</section>

			</div>

			<!-- Formularz -->
			<div class="wrapper" id="kalkulator">
				<section class="container">
					<header class="major">
						<h2>Wprowadź dane kredytu</h2>
						<p>Wypełnij poniższy formularz, aby obliczyć parametry kredytu</p>
					</header>

					<!-- Formularz wywołuje kontroler -->
					<form method="POST" action="calc.php">
						<div class="row">

							<div class="col-4 col-12-narrower">
								<label for="kwota">Kwota kredytu (PLN)</label>
								<input
									type="text"
									id="kwota"
									name="kwota"
									placeholder="np. 300000"
									value="<?= htmlspecialchars($_POST['kwota'] ?? '') ?>"
									style="width:100%; margin-top:0.5em;"
								/>
								<?php if (isset($bledy['kwota'])): ?>
									<p style="color:#e44; margin:0.3em 0 0; font-size:0.9em;">
										<?= htmlspecialchars($bledy['kwota']) ?>
									</p>
								<?php endif; ?>
							</div>

							<div class="col-4 col-12-narrower">
								<label for="lata">Okres spłaty (lata)</label>
								<input
									type="text"
									id="lata"
									name="lata"
									placeholder="np. 25"
									value="<?= htmlspecialchars($_POST['lata'] ?? '') ?>"
									style="width:100%; margin-top:0.5em;"
								/>
								<?php if (isset($bledy['lata'])): ?>
									<p style="color:#e44; margin:0.3em 0 0; font-size:0.9em;">
										<?= htmlspecialchars($bledy['lata']) ?>
									</p>
								<?php endif; ?>
							</div>

							<div class="col-4 col-12-narrower">
								<label for="oprocentowanie">Oprocentowanie roczne (%)</label>
								<input
									type="text"
									id="oprocentowanie"
									name="oprocentowanie"
									placeholder="np. 7.5"
									value="<?= htmlspecialchars($_POST['oprocentowanie'] ?? '') ?>"
									style="width:100%; margin-top:0.5em;"
								/>
								<?php if (isset($bledy['oprocentowanie'])): ?>
									<p style="color:#e44; margin:0.3em 0 0; font-size:0.9em;">
										<?= htmlspecialchars($bledy['oprocentowanie']) ?>
									</p>
								<?php endif; ?>
							</div>

						</div>

						<ul class="actions major" style="margin-top:2em;">
							<li><input type="submit" value="Oblicz ratę" class="button" /></li>
						</ul>
					</form>

				</section>
			</div>

			<!-- Wyniki -->
			<?php if ($rata_miesieczna !== null): ?>
			<div id="promo-wrapper">
				<section id="promo">
					<h2>Miesięczna rata: <?= number_format($rata_miesieczna, 2, ',', ' ') ?> PLN</h2>
					<a href="#szczegoly" class="button">Zobacz szczegóły</a>
				</section>
			</div>

			<div class="wrapper" id="szczegoly">
				<section class="container">
					<header class="major">
						<h2>Wyniki obliczeń</h2>
						<p>Podsumowanie parametrów Twojego kredytu</p>
					</header>
					<div class="row features">

						<section class="col-4 col-12-narrower feature">
							<header>
								<h2>Miesięczna rata</h2>
							</header>
							<p style="font-size:1.4em; font-weight:bold;">
								<?= number_format($rata_miesieczna, 2, ',', ' ') ?> PLN
							</p>
							<p>Stała rata kapitałowo-odsetkowa płatna co miesiąc przez cały okres spłaty.</p>
						</section>

						<section class="col-4 col-12-narrower feature">
							<header>
								<h2>Suma wszystkich spłat</h2>
							</header>
							<p style="font-size:1.4em; font-weight:bold;">
								<?= number_format($suma_splat, 2, ',', ' ') ?> PLN
							</p>
							<p>Łączna kwota, jaką zapłacisz bankowi przez cały okres kredytowania.</p>
						</section>

						<section class="col-4 col-12-narrower feature">
							<header>
								<h2>Łączne odsetki</h2>
							</header>
							<p style="font-size:1.4em; font-weight:bold;">
								<?= number_format($suma_odsetek, 2, ',', ' ') ?> PLN
							</p>
							<p>Koszt kredytu — różnica między sumą spłat a pożyczoną kwotą.</p>
						</section>

					</div>
				</section>
			</div>
			<?php endif; ?>

			<!-- Footer -->
			<div id="footer-wrapper">
				<div id="footer" class="container">
					<header class="major">
						<h2>Kalkulator Kredytowy</h2>
						<p>Narzędzie do szacowania kosztów kredytu hipotecznego i gotówkowego.
					</header>
				</div>
				<div id="copyright" class="container">
					<ul class="menu">
						<li>&copy; Kalkulator Kredytowy</li>
						<li>Szablon: <a href="http://html5up.net">HTML5 UP</a></li>
					</ul>
				</div>
			</div>

		</div>

		<!-- Scripts -->
		<script src="assets/js/jquery.min.js"></script>
		<script src="assets/js/jquery.dropotron.min.js"></script>
		<script src="assets/js/browser.min.js"></script>
		<script src="assets/js/breakpoints.min.js"></script>
		<script src="assets/js/util.js"></script>
		<script src="assets/js/main.js"></script>

	</body>
</html>
