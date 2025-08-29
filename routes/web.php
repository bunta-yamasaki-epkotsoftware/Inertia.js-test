<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TodosController; // 追加

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Todoのルーティング
    Route::get('/todos', [TodosController::class, 'index'])->name('todos.index');
    Route::post('/todos/store', [TodosController::class, 'store'])->name('todos.store');
    Route::put('/todos/update/{id}', [TodosController::class, 'update'])->name('todos.update');
    Route::delete('/todos/destroy/{id}', [TodosController::class, 'destroy'])->name('todos.destroy');
});

require __DIR__.'/auth.php';
