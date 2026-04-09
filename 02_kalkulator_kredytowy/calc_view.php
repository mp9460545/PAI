<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>Kalkulator Kredytowy</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 500px; margin: 40px auto; padding: 0 20px; }
        label { display: block; margin-top: 15px; font-weight: bold; }
        input[type="text"] { width: 100%; padding: 8px; margin-top: 4px; box-sizing: border-box; }
        button { margin-top: 20px; padding: 10px 25px; background: #2c7be5; color: #fff; border: none; cursor: pointer; }
        .error { color: red; font-size: 0.9em; }
        .wyniki { margin-top: 30px; background: #f0f4ff; padding: 20px; border-radius: 4px; }
    </style>
</head>
<body>
    <h1>Kalkulator Kredytowy</h1>

    <form method="POST" action="calc.php">

        <label>Kwota kredytu (PLN)</label>
        <input type="text" name="kwota" value="<?= htmlspecialchars($_POST['kwota'] ?? '') ?>">
        <?php if (isset($bledy['kwota'])): ?>
            <span class="error"><?= htmlspecialchars($bledy['kwota']) ?></span>
        <?php endif; ?>

        <label>Okres spłaty (lata)</label>
        <input type="text" name="lata" value="<?= htmlspecialchars($_POST['lata'] ?? '') ?>">
        <?php if (isset($bledy['lata'])): ?>
            <span class="error"><?= htmlspecialchars($bledy['lata']) ?></span>
        <?php endif; ?>

        <label>Oprocentowanie roczne (%)</label>
        <input type="text" name="oprocentowanie" value="<?= htmlspecialchars($_POST['oprocentowanie'] ?? '') ?>">
        <?php if (isset($bledy['oprocentowanie'])): ?>
            <span class="error"><?= htmlspecialchars($bledy['oprocentowanie']) ?></span>
        <?php endif; ?>

        <button type="submit">Oblicz ratę</button>

    </form>

    <?php if ($rata_miesieczna !== null): ?>
    <div class="wyniki">
        <h2>Wyniki</h2>
        <p>Miesięczna rata: <strong><?= number_format($rata_miesieczna, 2, ',', ' ') ?> PLN</strong></p>
        <p>Suma wszystkich spłat: <strong><?= number_format($suma_splat, 2, ',', ' ') ?> PLN</strong></p>
        <p>Łączne odsetki: <strong><?= number_format($suma_odsetek, 2, ',', ' ') ?> PLN</strong></p>
    </div>
    <?php endif; ?>

</body>
</html>
