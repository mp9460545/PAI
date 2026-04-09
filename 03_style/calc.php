<?php
// kontroler

$kwota = null;
$lata = null;
$oprocentowanie = null;
$rata_miesieczna = null;
$suma_splat = null;
$suma_odsetek = null;
$bledy = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $kwota = trim($_POST['kwota'] ?? '');
    $lata = trim($_POST['lata'] ?? '');
    $oprocentowanie = trim($_POST['oprocentowanie'] ?? '');

    if ($kwota === '' || !is_numeric($kwota) || (float)$kwota <= 0) {
        $bledy['kwota'] = 'Podaj prawidłową kwotę kredytu (liczba > 0).';
    }
    if ($lata === '' || !ctype_digit($lata) || (int)$lata <= 0 || (int)$lata > 50) {
        $bledy['lata'] = 'Podaj liczbę lat spłaty (liczba całkowita 1–50).';
    }
    if ($oprocentowanie === '' || !is_numeric($oprocentowanie) || (float)$oprocentowanie <= 0 || (float)$oprocentowanie > 100) {
        $bledy['oprocentowanie'] = 'Podaj prawidłowe oprocentowanie (0–100%).';
    }

    if (empty($bledy)) {
        $K = (float)$kwota;
        $n = (int)$lata * 12;
        $r = (float)$oprocentowanie / 12 / 100;

        if ($r == 0) {
            $rata_miesieczna = $K / $n;
        } else {
            $czynnik = pow(1 + $r, $n);
            $rata_miesieczna = $K * ($r * $czynnik) / ($czynnik - 1);
        }

        $suma_splat = $rata_miesieczna * $n;
        $suma_odsetek = $suma_splat - $K;
    }
}

// Kontroler wywołuje widok na końcu
include 'calc_view.php';
