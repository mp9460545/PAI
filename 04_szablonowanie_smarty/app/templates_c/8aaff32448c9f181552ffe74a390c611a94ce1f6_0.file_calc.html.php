<?php
/* Smarty version 5.4.2, created on 2026-04-08 20:17:17
  from 'file:/Applications/XAMPP/xamppfiles/htdocs/pai/04_szablonowanie_smarty/app/calc.html' */

/* @var \Smarty\Template $_smarty_tpl */
if ($_smarty_tpl->getCompiled()->isFresh($_smarty_tpl, array (
  'version' => '5.4.2',
  'unifunc' => 'content_69d6b7cdc0aa41_43819405',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '8aaff32448c9f181552ffe74a390c611a94ce1f6' => 
    array (
      0 => '/Applications/XAMPP/xamppfiles/htdocs/pai/04_szablonowanie_smarty/app/calc.html',
      1 => 1775679415,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
))) {
function content_69d6b7cdc0aa41_43819405 (\Smarty\Template $_smarty_tpl) {
$_smarty_current_dir = '/Applications/XAMPP/xamppfiles/htdocs/pai/04_szablonowanie_smarty/app';
$_smarty_tpl->getInheritance()->init($_smarty_tpl, true);
?>


<?php 
$_smarty_tpl->getInheritance()->instanceBlock($_smarty_tpl, 'Block_184674643869d6b7cdbffbd0_23609617', 'footer');
?>


<?php 
$_smarty_tpl->getInheritance()->instanceBlock($_smarty_tpl, 'Block_144958109869d6b7cdc01a29_03822237', 'content');
?>

<?php $_smarty_tpl->getInheritance()->endChild($_smarty_tpl, "../templates/main.html", $_smarty_current_dir);
}
/* {block 'footer'} */
class Block_184674643869d6b7cdbffbd0_23609617 extends \Smarty\Runtime\Block
{
public function callBlock(\Smarty\Template $_smarty_tpl) {
$_smarty_current_dir = '/Applications/XAMPP/xamppfiles/htdocs/pai/04_szablonowanie_smarty/app';
?>
Wyniki mają charakter informacyjny<?php
}
}
/* {/block 'footer'} */
/* {block 'content'} */
class Block_144958109869d6b7cdc01a29_03822237 extends \Smarty\Runtime\Block
{
public function callBlock(\Smarty\Template $_smarty_tpl) {
$_smarty_current_dir = '/Applications/XAMPP/xamppfiles/htdocs/pai/04_szablonowanie_smarty/app';
?>


<header class="major">
	<h2>Wprowadź dane kredytu</h2>
	<p>Wypełnij poniższy formularz, aby obliczyć parametry kredytu</p>
</header>

<form method="POST" action="<?php echo $_smarty_tpl->getValue('app_url');?>
/app/calc.php">
	<div class="row">

		<div class="col-4 col-12-narrower">
			<label for="kwota">Kwota kredytu (PLN)</label>
			<input type="text" id="kwota" name="kwota" placeholder="np. 300000"
				value="<?php if ((null !== ($_smarty_tpl->getValue('form')['kwota'] ?? null))) {
echo htmlspecialchars((string)$_smarty_tpl->getValue('form')['kwota'], ENT_QUOTES, 'UTF-8', true);
}?>"
				style="width:100%; margin-top:0.5em;" />
		</div>

		<div class="col-4 col-12-narrower">
			<label for="lata">Okres spłaty (lata)</label>
			<input type="text" id="lata" name="lata" placeholder="np. 25"
				value="<?php if ((null !== ($_smarty_tpl->getValue('form')['lata'] ?? null))) {
echo htmlspecialchars((string)$_smarty_tpl->getValue('form')['lata'], ENT_QUOTES, 'UTF-8', true);
}?>"
				style="width:100%; margin-top:0.5em;" />
		</div>

		<div class="col-4 col-12-narrower">
			<label for="oprocentowanie">Oprocentowanie roczne (%)</label>
			<input type="text" id="oprocentowanie" name="oprocentowanie" placeholder="np. 7.5"
				value="<?php if ((null !== ($_smarty_tpl->getValue('form')['oprocentowanie'] ?? null))) {
echo htmlspecialchars((string)$_smarty_tpl->getValue('form')['oprocentowanie'], ENT_QUOTES, 'UTF-8', true);
}?>"
				style="width:100%; margin-top:0.5em;" />
		</div>

	</div>

	<ul class="actions major" style="margin-top:2em;">
		<li><input type="submit" value="Oblicz ratę" class="button" /></li>
	</ul>
</form>

<?php if ((null !== ($_smarty_tpl->getValue('messages') ?? null)) && $_smarty_tpl->getSmarty()->getModifierCallback('count')($_smarty_tpl->getValue('messages')) > 0) {?>
	<ul style="color:#e44; margin-top:1em;">
	<?php
$_from = $_smarty_tpl->getSmarty()->getRuntime('Foreach')->init($_smarty_tpl, $_smarty_tpl->getValue('messages'), 'msg');
$foreach0DoElse = true;
foreach ($_from ?? [] as $_smarty_tpl->getVariable('msg')->value) {
$foreach0DoElse = false;
?>
		<li><?php echo $_smarty_tpl->getValue('msg');?>
</li>
	<?php
}
$_smarty_tpl->getSmarty()->getRuntime('Foreach')->restore($_smarty_tpl, 1);?>
	</ul>
<?php }?>

<?php if ((null !== ($_smarty_tpl->getValue('result') ?? null))) {?>
<div class="row features" style="margin-top:2em;">

	<section class="col-4 col-12-narrower feature">
		<header><h2>Miesięczna rata</h2></header>
		<p style="font-size:1.4em; font-weight:bold;"><?php echo $_smarty_tpl->getValue('result')['rata'];?>
 PLN</p>
		<p>Stała rata kapitałowo-odsetkowa płatna co miesiąc.</p>
	</section>

	<section class="col-4 col-12-narrower feature">
		<header><h2>Suma wszystkich spłat</h2></header>
		<p style="font-size:1.4em; font-weight:bold;"><?php echo $_smarty_tpl->getValue('result')['suma_splat'];?>
 PLN</p>
		<p>Łączna kwota zapłacona bankowi przez cały okres.</p>
	</section>

	<section class="col-4 col-12-narrower feature">
		<header><h2>Łączne odsetki</h2></header>
		<p style="font-size:1.4em; font-weight:bold;"><?php echo $_smarty_tpl->getValue('result')['suma_odsetek'];?>
 PLN</p>
		<p>Koszt kredytu — różnica między sumą spłat a kwotą.</p>
	</section>

</div>
<?php }?>

<?php
}
}
/* {/block 'content'} */
}
