<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TasksController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware'=> 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'auth'
], function($router) {
    Route::post('login','AuthController@login');
    Route::post('register','AuthController@register');
    Route::post('logout','AuthController@logout');
    // Route::get('profile',AuthController::class,]);
    Route::post('refresh','AuthController@refresh');
});

Route::group([
    'middleware'=> 'api',
    'namespace' => 'App\Http\Controllers',
], function($router) {
    Route::get("tasks", [TasksController::class, 'list']);
    Route::post("tasks", [TasksController::class, 'add']);
    Route::put("edit",[TasksController::class,'edit']);
    Route::delete("delete/{id}", [TasksController::class,'delete']);
    Route::get("search", [TasksController::class, 'search']);
});