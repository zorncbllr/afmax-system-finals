<?php

use Controllers\NoteController;
use Controllers\UserController;
use Core\Router;

$router = new Router();

$router->route("/users")
    ->get([UserController::class, 'getUsers'])
    ->post([UserController::class, 'createUser']);

$router->route('/notes')
    ->get([NoteController::class, 'getNotes'])
    ->post([NoteController::class, 'createNote']);

$router->get("/users/{userId}", [UserController::class, 'getUserById']);
$router->get("/notes/{noteId}", [NoteController::class, 'getNoteById']);


$router->_404(function () {
    status(404);
    return json(['msg' => '404 resource not found.']);
});
