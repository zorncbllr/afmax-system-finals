<?php

namespace Core;

interface Resource
{
    function getAll(Request $request);
    function getById(Request $request, string $id);
    function create(Request $request);
    function update(Request $request, string $id);
    function delete(Request $request, string $id);
}
