<?php

Router::dir('api', 'Api', function() {
  Router::get('signals')->controller('Signal@index');
  Router::post('signals')->controller('Signal@create');
  Router::get('signals2')->controller('Signal@createGet');
  Router::get('signals/deleteAll')->controller('Signal@deleteAll');
  Router::get('signals/map')->controller('Signal@map');
  Router::get('signals/api')->controller('Signal@api');
});