<?php

use backend\Route;

Route::get('movie-website/', "MainController@index");
Route::get('movie-website/searchResult', 'MainController@search');
Route::get('movie-website/getMovie', 'MainController@getMovie');
//Route::get('edit', 'MainController@edit');
//Route::get('update', 'MainController@update');
//Route::get('insert', 'MainController@insert');
//Route::get('signup', "UserController@registration");
//Route::get('login', "UserController@check_log");
//Route::get('logout', "UserController@logout");
