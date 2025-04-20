<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<style>
    form {
        display: flex;
        width: 20rem;
        flex-direction: column;
        gap: 0.4rem;
    }

    input,
    button {
        padding: 0.5rem 1rem;
    }
</style>

<body>
    <form action="/" method="post">
        <input type="text" name="name" placeholder="enter name">
        <input type="text" name="email" placeholder="enter email">
        <button type="submit">submit</button>
    </form>
</body>

</html>