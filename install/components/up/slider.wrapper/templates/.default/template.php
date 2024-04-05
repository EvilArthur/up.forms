<?
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}
CJSCore::Init("sidepanel");
?>
<!DOCTYPE html>
<html>
<head>
	<script type="text/javascript">
		// Prevent loading page without header and footer
		if(window == window.top)
		{
			window.location = "<?=CUtil::JSEscape($APPLICATION->GetCurPageParam('', array('IFRAME'))); ?>";
		}
	</script>
	<?$APPLICATION->ShowHead();?>
</head>
<body class="disk-slider-body">

<div class="disk-slider-title"><? $APPLICATION->ShowTitle(); ?></div>
<div class="disk-slider-workarea">
	<div class="disk-slider-sidebar"><? $APPLICATION->ShowViewContent("sidebar"); ?></div>
	<div class="disk-slider-content">
		<?
		$APPLICATION->IncludeComponent(
			$arParams['COMPONENT_NAME'],
			$arParams['COMPONENT_TEMPLATE_NAME'],
			$arParams['COMPONENT_PARAMS']
		);
		?>
	</div>
</div>
</body>
</html>
<?