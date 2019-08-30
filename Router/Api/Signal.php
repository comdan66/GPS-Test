<?php

Router::dir('api', 'Api', function() {
  Router::get('signals')->controller('Signal@index');
  Router::post('signals')->controller('Signal@create');
  // Router::get('signals')->controller('Signal@create');
});