<?php


define('MODX_API_MODE', true);
require_once dirname(dirname(dirname(dirname(__FILE__)))) . '/index.php';

//require_once 'calc.init.php';

$modx->getService('error','error.modError');
$modx->setLogLevel(modX::LOG_LEVEL_ERROR);
$modx->setLogTarget('FILE');


if ($_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest') {
    $modx->sendRedirect($modx->makeUrl($modx->getOption('site_start'),'','','full'));
}

$output = array(
    'success' => false,
    'errors' => array(),
    'result' => array(
        'cost' => 0, 
        'duration' => 0,
        'message' => '',
    ),
);

$post = $modx->sanitize($_REQUEST, $modx->sanitizePatterns);
$square = (int)$post['square'];
$plan = (int)$post['plan'];
$concept = (int)$post['concept'];
$doc = (int)$post['doc'];
$complect = (int)$post['complect'];
$nadzor = (int)$post['nadzor'];

if (empty($square)) {
    $output['errors'][] = 'Не заполнено поле "Метраж"';
}

if (!empty($square) && $square < 50) {
    $output['errors'][] = 'Метраж должен быть больше 50 кв.м.'; 
}

if (empty($plan) && empty($concept) && empty($doc) && empty($complect) && empty($nadzor)) {
    $output['errors'][] = 'Не выбрана ни одна услуга'; 
}

if (count($output['errors']) > 0) {
    echo json_encode($output);
    die();
}

$group = getGroup($square);


$aResult['duration'] = '';
$aResult['cost'] = '';

$aGroup[1] = '50 – 499 кв.м.';
$aGroup[2] = '500 – 999 кв.м.';
$aGroup[3] = 'От 1000 кв.м.';



$aParams['plan'][1]['price'] = '5000';
$aParams['plan'][2]['price'] = '10000';
$aParams['plan'][3]['price'] = '15000';

$aParams['concept'][1]['price'] = '600';
$aParams['concept'][2]['price'] = '540';
$aParams['concept'][3]['price'] = '480';

$aParams['doc'][1]['price'] = '300';
$aParams['doc'][2]['price'] = '270';
$aParams['doc'][3]['price'] = '240';

$aParams['complect'][1]['price'] = '100';
$aParams['complect'][2]['price'] = '90';
$aParams['complect'][3]['price'] = '80';

$aParams['nadzor'][1]['price'] = '20000';
$aParams['nadzor'][2]['price'] = '20000';
$aParams['nadzor'][3]['price'] = '20000';


$message = array();

$message[] = 'Тип помещения: '. $post['place'];
$message[] = 'Метраж: '. $post['square'];

$duration = 10;
//При метраже от 1000 – остальные позиции (галки) каждая от 15 дней
if ($square >= 1000) {
    $duration = 15;
}
//При метраже от 499 до 999 – каждая 10-15 дней.
if ($square >= 499 && $square <=999) {
    $duration = 10;    
}
if (!empty($plan)) { 
    $output['result']['duration'] += $duration;
    $output['result']['cost'] += $aParams['plan'][$group]['price'];
    $message[] = 'Выбрано: Планировочное решение (+'.$aParams['plan'][$group]['price'].')';
}
if (!empty($concept)) {
    $output['result']['duration'] += $duration;
    $output['result']['cost'] += $aParams['concept'][$group]['price'] * $square;
    $message[] = 'Выбрано: Концепция (+'.$aParams['concept'][$group]['price'].' * '.$square.')';
}
if (!empty($doc)) {
    $output['result']['duration'] += $duration;
    $output['result']['cost'] += $aParams['doc'][$group]['price'] * $square;
    $message[] = 'Выбрано: Рабочая документация (+'.$aParams['doc'][$group]['price'].' * '.$square.')';
}
if (!empty($complect)) {
    $output['result']['duration'] += $duration;
    $output['result']['cost'] += $aParams['complect'][$group]['price'] * $square;
    $message[] = 'Выбрано: Комплектация (+'.$aParams['doc'][$group]['complect'].' * '.$square.')';
}
if (!empty($nadzor)) {
    $output['result']['cost'] += $aParams['nadzor'][$group]['price'];
    $message[] = 'Выбрано: Авторский надзор с выездом на объект (+'.$aParams['nadzor'][$group]['price'].')';
}

//Если только планировочное решение (первая галка) – 5 дней (от 50 до 499 м2)/7 дней (от 500 и больше м2).
if (!empty($plan) && empty($concept) && empty($doc) && empty($complect)) {
    if ($square >= 50 && $square <=499) {
        $output['result']['duration'] = 5;
    }
    if ($square >= 500) {
        $output['result']['duration'] = 7;
    }
}


//При этом, в случае выбора всех галок, время планировочного решения не учитывается (не складывается 5/7 дней), потому что этот процесс будут делать другие люди параллельно. Вот. То есть полные сроки от 50 до 999 м2 – 30-45 дней, а от 1000 м2 – от 45 дней.
if (!empty($plan) && empty(!$concept) && !empty($doc) && !empty($complect)) {
    $output['result']['duration'] -= $duration;
}



if (count($output['errors']) == 0) {
    $output['success'] = true;
    $cost = number_format($output['result']['cost'], 0, '.', ' ');
    $output['result']['cost_html'] = '<span class="c-result__cost">'.$cost.'</span> руб.';
    $days = $output['result']['duration'];
    $days_name = 'дней';
    if ($days > 0) {
        $output['result']['duration_html'] = '<span class="c-result__period">'.$days.'</span> '.$days_name;    
    } else {
        $output['result']['duration_html'] = '';    
    }
    $message[] = '';
    $message[] = 'Итого: '.$cost . ' руб.';
    $message[] = 'Срок: '.$days .' дней';
    $output['result']['message'] = '<p>'.implode('</p><p>', $message).'</p>';
}
echo json_encode($output);
die();


function getGroup($square) {
    if ($square >= 50 && $square <= 499) {
        return 1;
    }
    if ($square >= 500 && $square <= 999) {
        return 2;
    }
    if ($square >= 1000) {
        return 3;
    }
    return 0;
}