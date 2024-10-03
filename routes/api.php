<?php


use App\Http\Controllers\CallcenterControler;
use App\Http\Controllers\callscontroller;
use App\Http\Controllers\chargescontroller;
use App\Http\Controllers\ChefequipeController;
use App\Http\Controllers\clientcontroller;
use App\Http\Controllers\columnscontroller;
use App\Http\Controllers\operationscontroller;
use App\Http\Controllers\pointcontroller;
use App\Http\Controllers\SysadminController;
use App\Models\charge;
use App\Models\sysadmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
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

Route::middleware(['auth:sanctum,admin,call_center,sysadmin,chef_equipe'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('callcenter',CallcenterControler::class);
Route::apiResource('chefequipe',ChefequipeController::class);
Route::apiResource('sysadmin',SysadminController::class);
Route::apiResource('call',callscontroller::class);
Route::apiResource('client',clientcontroller::class);
Route::apiResource('column',columnscontroller::class);

Route::apiResource('charge',chargescontroller::class);
Route::apiResource('operations',operationscontroller::class);
Route::apiResource('points',pointcontroller::class);


Route::get('/operations_clients/{id}', [operationscontroller::class, 'operations_clients']);
Route::get('/Affected_operations/{id}', [operationscontroller::class, 'Affected_operations']);

Route::get('/operationsCount', [operationscontroller::class, 'operationsCount']);


Route::get('/points_operation/{id}', [pointcontroller::class, 'points_operation']);



Route::get('/calls-clients', [callscontroller::class, 'client_calls']);

Route::get('/calls-clients/{id}', [CallsController::class, 'getCallById']);

Route::get('/getCalls/{id}', [CallsController::class, 'getCalls']);

Route::get('/message/{id}', [CallsController::class, 'message_callcenter']);



Route::get('/getclientinfo/{id}', [clientcontroller::class, 'getclientinfo']);


Route::get('/charges_chef/{id}', [chargescontroller::class, 'filteredcharges']);

Route::get('/download/{directory}/{filename}', function ($directory, $filename) {
    // Full path to the file in 'storage/app/public'
    $path = storage_path('app/public/' . $directory . '/' . $filename);

    // Check if the file exists
    if (file_exists($path)) {
        // Use response()->download to return the file
        return response()->download($path);
    } else {
        return response()->json(['error' => 'File not found'], 404);
    }
});
