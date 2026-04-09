<?php
/* Smarty version 5.4.2, created on 2026-04-08 20:17:17
  from 'file:/Applications/XAMPP/xamppfiles/htdocs/pai/04_szablonowanie_smarty/app/../templates/main.html' */

/* @var \Smarty\Template $_smarty_tpl */
if ($_smarty_tpl->getCompiled()->isFresh($_smarty_tpl, array (
  'version' => '5.4.2',
  'unifunc' => 'content_69d6b7cdc14b39_83917147',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '8f0d7d7e30495f55870a259b16e4722a06341b28' => 
    array (
      0 => '/Applications/XAMPP/xamppfiles/htdocs/pai/04_szablonowanie_smarty/app/../templates/main.html',
      1 => 1775679403,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
))) {
function content_69d6b7cdc14b39_83917147 (\Smarty\Template $_smarty_tpl) {
$_smarty_current_dir = '/Applications/XAMPP/xamppfiles/htdocs/pai/04_szablonowanie_smarty/templates';
$_smarty_tpl->getInheritance()->init($_smarty_tpl, false);
?>
<!DOCTYPE html>
<html lang="pl">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<title><?php echo (($tmp = $_smarty_tpl->getValue('page_title') ?? null)===null||$tmp==='' ? "Kalkulator Kredytowy" ?? null : $tmp);?>
</title>
		<link rel="stylesheet" href="<?php echo $_smarty_tpl->getValue('app_url');?>
/../03_style/assets/css/main.css" />
		<style>html { scroll-behavior: smooth; }</style>
	</head>
	<body class="homepage is-preload">
		<div id="page-wrapper">

			<!-- Header -->
			<div id="header-wrapper">
				<div id="header" class="container">
					<h1 id="logo"><a href="<?php echo $_smarty_tpl->getValue('app_url');?>
/"><?php echo (($tmp = $_smarty_tpl->getValue('page_title') ?? null)===null||$tmp==='' ? "Kalkulator Kredytowy" ?? null : $tmp);?>
</a></h1>
					<nav id="nav">
						<ul>
						</ul>
					</nav>
				</div>

				<!-- Hero -->
				<section id="hero" class="container">
					<header>
						<h2><?php echo (($tmp = $_smarty_tpl->getValue('page_header') ?? null)===null||$tmp==='' ? "Kalkulator Kredytowy" ?? null : $tmp);?>
</h2>
					</header>
					<p><?php echo (($tmp = $_smarty_tpl->getValue('page_description') ?? null)===null||$tmp==='' ? '' ?? null : $tmp);?>
</p>
					<ul class="actions">
						<li><a href="#app_content" class="button">Przejdź do kalkulatora</a></li>
					</ul>
				</section>
			</div>

			<!-- Treść strony -->
			<div class="wrapper" id="app_content">
				<section class="container">

					<?php 
$_smarty_tpl->getInheritance()->instanceBlock($_smarty_tpl, 'Block_78399840469d6b7cdc13533_36470101', 'content');
?>


				</section>
			</div>

			<!-- Footer -->
			<div id="footer-wrapper">
				<div id="footer" class="container">
					<header class="major">
						<h2><?php echo (($tmp = $_smarty_tpl->getValue('page_title') ?? null)===null||$tmp==='' ? "Kalkulator Kredytowy" ?? null : $tmp);?>
</h2>
						<p><?php 
$_smarty_tpl->getInheritance()->instanceBlock($_smarty_tpl, 'Block_191090038669d6b7cdc14007_94734358', 'footer');
?>
</p>
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
		<?php echo '<script'; ?>
 src="<?php echo $_smarty_tpl->getValue('app_url');?>
/../03_style/assets/js/jquery.min.js"><?php echo '</script'; ?>
>
		<?php echo '<script'; ?>
 src="<?php echo $_smarty_tpl->getValue('app_url');?>
/../03_style/assets/js/jquery.dropotron.min.js"><?php echo '</script'; ?>
>
		<?php echo '<script'; ?>
 src="<?php echo $_smarty_tpl->getValue('app_url');?>
/../03_style/assets/js/browser.min.js"><?php echo '</script'; ?>
>
		<?php echo '<script'; ?>
 src="<?php echo $_smarty_tpl->getValue('app_url');?>
/../03_style/assets/js/breakpoints.min.js"><?php echo '</script'; ?>
>
		<?php echo '<script'; ?>
 src="<?php echo $_smarty_tpl->getValue('app_url');?>
/../03_style/assets/js/util.js"><?php echo '</script'; ?>
>
		<?php echo '<script'; ?>
 src="<?php echo $_smarty_tpl->getValue('app_url');?>
/../03_style/assets/js/main.js"><?php echo '</script'; ?>
>

	</body>
</html>
<?php }
/* {block 'content'} */
class Block_78399840469d6b7cdc13533_36470101 extends \Smarty\Runtime\Block
{
public function callBlock(\Smarty\Template $_smarty_tpl) {
$_smarty_current_dir = '/Applications/XAMPP/xamppfiles/htdocs/pai/04_szablonowanie_smarty/templates';
?>
Domyślna treść<?php
}
}
/* {/block 'content'} */
/* {block 'footer'} */
class Block_191090038669d6b7cdc14007_94734358 extends \Smarty\Runtime\Block
{
public function callBlock(\Smarty\Template $_smarty_tpl) {
$_smarty_current_dir = '/Applications/XAMPP/xamppfiles/htdocs/pai/04_szablonowanie_smarty/templates';
?>
Narzędzie do szacowania kosztów kredytu.<?php
}
}
/* {/block 'footer'} */
}
