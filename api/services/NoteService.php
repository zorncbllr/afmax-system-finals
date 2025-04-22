<?php

namespace Services;

use Core\App;
use Models\Note;
use PDO;

class NoteService
{
    /** @return array<Note> */
    static function getAllNotes(): array
    {
        $db = App::getDatabase();

        $stmt = $db->prepare("select * from notes");
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_CLASS, Note::class);
    }

    static function createNote(string $note, int $userId): Note
    {
        $db = App::getDatabase();

        $stmt = $db->prepare("insert into notes (note, userId) values (:note, :userId)");

        $stmt->execute([
            'note' => $note,
            'userId' => $userId
        ]);

        $noteId = $db->lastInsertId();

        $newNote = new Note();

        $newNote->noteId = $noteId;
        $newNote->note = $note;
        $newNote->userId = $userId;

        return $newNote;
    }
}
