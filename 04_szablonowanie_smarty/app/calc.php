<?php
// KONTROLER strony kalkulatora kredytowego
require_once dirname(__FILE__).'/../config.php';
require_once _ROOT_PATH.'/lib/smarty/libs/Smarty.class.php';

// pobranie parametrów z formularza
function getParams(&$form) {
    $form['kwota']        = isset($_REQUEST['kwota'])        ? $_REQUEST['kwota']        : null;
    $form['lata']         = isset($_REQUEST['lata'])         ? $_REQUEST['lata']         : null;
    $form['oprocentowanie'] = isset($_REQUEST['oprocentowanie']) ? $_REQUEST['oprocentowanie'] : null;
}

// walidacja parametrów
function validate(&$form, &$msgs) {
    if (!isset($form['kwota']) && !isset($form['lata']) && !isset($form['oprocentowanie'])) return false;

    if ($form['kwota'] == '')               $msgs[] = 'Nie podano kwoty kredytu.';
    elseif (!is_numeric($form['kwota']) || (float)$form['kwota'] <= 0)
                                            $msgs[] = 'Kwota musi być liczbą większą od 0.';

    if ($form['lata'] == '')                $msgs[] = 'Nie podano liczby lat spłaty.';
    elseif (!ctype_digit($form['lata']) || (int)$form['lata'] <= 0 || (int)$form['lata'] > 50)
                                            $msgs[] = 'Liczba lat musi być liczbą całkowitą z zakresu 1–50.';

    if ($form['oprocentowanie'] == '')      $msgs[] = 'Nie podano oprocentowania.';
    elseif (!is_numeric($form['oprocentowanie']) || (float)$form['oprocentowanie'] <= 0 || (float)$form['oprocentowanie'] > 100)
                                            $msgs[] = 'Oprocentowanie musi być liczbą z zakresu 0–100.';

    return count($msgs) === 0;
}

// wykonanie obliczeń
function process(&$form, &$result) {
    $K = (float)$form['kwota'];
    $n = (int)$form['lata'] * 12;
    $r = (float)$form['oprocentowanie'] / 12 / 100;

    $rata = ($r == 0) ? $K / $n : $K * ($r * pow(1 + $r, $n)) / (pow(1 + $r, $n) - 1);

    $result['rata']        = number_format($rata, 2, ',', ' ');
    $result['suma_splat']  = number_format($rata * $n, 2, ',', ' ');
    $result['suma_odsetek']= number_format($rata * $n - $K, 2, ',', ' ');
}

// inicjacja zmiennych
$form     = null;
$messages = array();
$result   = null;

getParams($form);
if (validate($form, $messages)) {
    process($form, $result);
}

// przygotowanie danych dla szablonu
$smarty = new Smarty\Smarty();
$smarty->setCompileDir(_ROOT_PATH.'/app/templates_c/');

$smarty->assign('app_url',          _APP_URL);
$smarty->assign('page_title',       'Kalkulator Kredytowy');
$smarty->assign('page_description', 'Oblicz miesięczną ratę, sumę spłat i łączne odsetki dla swojego kredytu.');
$smarty->assign('page_header',      'Kalkulator Kredytowy');

$smarty->assign('form',     $form);
$smarty->assign('result',   $result);
$smarty->assign('messages', $messages);

// wywołanie szablonu
$smarty->display(_ROOT_PATH.'/app/calc.html');
