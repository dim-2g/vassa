<?php
define('MODX_API_MODE', true);
require_once $_SERVER['DOCUMENT_ROOT'] . '/index.php';

$modx->getService('error','error.modError');
$modx->setLogLevel(modX::LOG_LEVEL_ERROR);
$modx->setLogTarget('FILE');
if ($_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest') {
    $modx->sendRedirect($modx->makeUrl($modx->getOption('site_start'),'','','full'));
}


session_start();
//$session_id = session_id();
if (empty($_SESSION['xcode'])) {
    $session_id = uniqid();
    $_SESSION['xcode'] = $session_id;   
} else {
    $session_id = $_SESSION['xcode'];
}

echo $session_id;
//$modx->log(xPDO::LOG_LEVEL_ERROR, 'session file : '.var_export($_SESSION, true));
?>