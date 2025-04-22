<?php

namespace Controllers;

use Models\Note;
use PDOException;
use Services\NoteService;

class NoteController
{
    function getNotes()
    {
        $notes = NoteService::getAllNotes();

        status(200);
        return json($notes);
    }

    /** @param Note $body */
    function createNote($body)
    {
        try {
            $note = NoteService::createNote(
                note: $body->note,
                userId: $body->userId
            );

            status(200);
            return json([
                'msg' => "New note has been created.",
                'note' => $note
            ]);
        } catch (PDOException $e) {

            if ($e->getCode() == 23000) {
                status(409);
                return json(['msg' => "User does not exists."]);
            }

            status("500");
            return json(['msg' => "Unable to create new note.", "code" => $e->getCode()]);
        }
    }
}
