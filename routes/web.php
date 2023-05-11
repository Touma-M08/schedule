<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MentorController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\StudentController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::controller(MentorController::class)->group(function() {
    Route::get("/mentors", "index")->name("mentor.index");
    Route::post("/mentors", "store")->name("mentor.store");
});

Route::controller(EventController::class)->group(function() {
    Route::get('/', "top")->name("top");
    Route::get("/events", "index")->name("event.index");
    Route::post("/events", "store")->name("event.store");
});

Route::controller(StudentController::class)->group(function() {
    Route::get("/students", "index")->name("student.index");
    Route::post("/students", "store")->name("student.store");
    Route::get("/decision", "decision")->name("decision.create");
    Route::post("/decision", "decisionStore")->name("decision.store");
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
