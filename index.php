<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Zlink</title>
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@materializecss/materialize@1.1.0-alpha/dist/css/materialize.min.css">

    <!-- Compiled and minified JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/@materializecss/materialize@1.1.0-alpha/dist/js/materialize.min.js"></script>
    <script src="/dist/zlink.min.js"></script>

</head>

<body>
    <script>
        const app = new App('Zlink Demo');
        console.log(app);
    </script>
    <header></header>
    <main>
        <div class="container">
            <div class="row">
                <div id="post" class="col s12 m6" data-list="posts">

                </div>
            </div>
        </div>
    </main>
    <footer></footer>
    <script>
        post = app.elm().byId('post');
        console.log(post);
        console.log(post.classes());
        console.log(post.classes().add('teal'));
        console.log(post.classes());

        text = app.elm('P');
        console.log(text);


        app.http.get('https://jsonplaceholder.typicode.com/posts/21').then((response) => {
            console.log(response.json.body);
            text.text(response.json.body);
            post.append(text.e);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            app.toast("xhr finished").show();
            console.log(app);
        });
    </script>

</body>

</html>