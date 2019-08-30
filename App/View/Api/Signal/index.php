<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta http-equiv="Content-Language" content="zh-tw">
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">
    
    <title>GPS 訊號查詢</title>
    <?php echo $asset->renderCSS();?>
    <?php echo $asset->renderJS();?>
  </head>
  <body>
    <h1>GPS 訊號查詢</h1>
    
    <a class='delete' href="<?php echo Url::router('ApiSignalDeleteAll');?>">清空</a>

    <?php echo \HTML\Div::create(array_map(function($signal) {
      return \HTML\Div::create([
        \HTML\Span::create($signal->id)->class('id')->data('title', 'ID'),
        \HTML\Span::create($signal->latitude)->class('latitude')->data('title', '緯度'),
        \HTML\Span::create($signal->longitude)->class('longitude')->data('title', '經度'),
        \HTML\Span::create($signal->pressure)->class('pressure')->data('title', '氣壓'),
        \HTML\Span::create($signal->temperature)->class('temperature')->data('title', '溫度'),
        \HTML\Span::create($signal->humidity)->class('humidity')->data('title', '濕度'),
        \HTML\Span::create($signal->cntSatellite)->class('cntSatellite')->data('title', '衛星數'),
        \HTML\Span::create($signal->timeAt)->class('timeAt')->data('title', 'GPS 時間'),
      ]);
    }, $signals))->id('main');

    echo $pages ? \HTML\Div::create(\HTML\Div::create($pages))->id('pages') : ''; ?>
  </body>
</html>

