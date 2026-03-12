<?php
require_once _ROOT_PATH.'/app/calc.php';
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>Kalkulator Kredytowy</title>
</head>
<body>

<h1>Kalkulator Kredytowy</h1>

<form method="POST">
    <p>
        <label for="kwota">Kwota kredytu (PLN):</label><br>
        <input type="text" id="kwota" name="kwota" value="<?= htmlspecialchars($_POST['kwota'] ?? '') ?>">
        <?php if (isset($bledy['kwota'])): ?>
            <br><span><?= htmlspecialchars($bledy['kwota']) ?></span>
        <?php endif; ?>
    </p>
    <p>
        <label for="lata">Okres splaty (lata):</label><br>
        <input type="text" id="lata" name="lata" value="<?= htmlspecialchars($_POST['lata'] ?? '') ?>">
        <?php if (isset($bledy['lata'])): ?>
            <br><span><?= htmlspecialchars($bledy['lata']) ?></span>
        <?php endif; ?>
    </p>
    <p>
        <label for="oprocentowanie">Oprocentowanie roczne (%):</label><br>
        <input type="text" id="oprocentowanie" name="oprocentowanie" value="<?= htmlspecialchars($_POST['oprocentowanie'] ?? '') ?>">
        <?php if (isset($bledy['oprocentowanie'])): ?>
            <br><span><?= htmlspecialchars($bledy['oprocentowanie']) ?></span>
        <?php endif; ?>
    </p>
    <p>
        <input type="submit" value="Oblicz">
    </p>
</form>

<?php if ($rata_miesieczna !== null): ?>
    <hr>
    <p>Miesieczna rata: <strong><?= number_format($rata_miesieczna, 2, ',', ' ') ?> PLN</strong></p>
    <p>Suma wszystkich splat: <?= number_format($suma_splat, 2, ',', ' ') ?> PLN</p>
    <p>Laczne odsetki: <?= number_format($suma_odsetek, 2, ',', ' ') ?> PLN</p>
<?php endif; ?>

</body>
</html>