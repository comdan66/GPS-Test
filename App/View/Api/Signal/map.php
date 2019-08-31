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

    <div id='maps'>
      <div id='map' data-api='<?php echo Url::router('ApiSignalApi');?>'></div>
      
      <a class='back' href="<?php echo Url::router('ApiSignalIndex');?>">回列表</a>
      <a class='reload' id='reload'>重新刷新</a>
    </div>

    <div id='loading'></div>

  </body>
</html>

