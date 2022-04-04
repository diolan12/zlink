<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Zlink</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@materializecss/materialize@1.1.0-alpha/dist/css/materialize.min.css">

    <!-- Compiled and minified JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/@materializecss/materialize@1.1.0-alpha/dist/js/materialize.min.js"></script>

    <!-- <script src="/dist/zlink.js"></script> -->
    <script src="/src/cookie.js"></script>
    <script src="/src/form.js"></script>
    <script src="/src/href.js"></script>
    <script src="/src/http.js"></script>
    <script src="/src/lmn.js"></script>
    <script src="/src/livedata.js"></script>
    <script src="/src/input.js"></script>
    <script src="/src/log.js"></script>
    <script src="/src/materialize.js"></script>
    <script src="/src/modal.js"></script>
    <script src="/src/storage.js"></script>
    <script src="/src/toast.js"></script>

    <script src="/src/index.js"></script>
</head>

<body>
    <script>
        const config = {
            debug: true,
            M: "https://cdn.jsdelivr.net/npm/@materializecss/materialize@1.1.0-alpha/dist/js/materialize.min.js",
            scripts: [
                "http", "cookie"
            ]
        };
        // const z = new Zlink('Zlink Demo');
        const z = new Zlink('Zlink Demo', config);
        console.log(z);
    </script>
    <header></header>
    <main>
        <div class="container">
            <div class="row">
                <?php
                include_once('page/binding.php');
                include_once('page/autocomplete.php');
                include_once('page/textfield.php');
                ?>
                
            </div>
        </div>
    </main>
    <footer></footer>
    <script>
        
        // username.observe((it) => {
        //     // app.elm.byId('register-username').value = it;
        //     document.getElementById('register-username').value = it;
        // });
        // loginUsername = new Input('login-username');
        // loginUsername.observe = (it) => {
        //     // console.log(it);
        //     username.postValue(it);
        // }
        // registerUsername = new Input('register-username');
        // registerUsername.observe = (it) => {
        //     // console.log(it);
        //     username.postValue(it);
        // }

        password = new LiveData('password');
        password.observe((it) => {
            console.info(`observe password: ${it}`);
            // app.elm.byId('register-password').value = it;
            // document.getElementById('login-password').value = it;
        });
        // var magic = (
        //     function(name) {
        //         return globalThis[name]
        //     }
        // ).call(null, "password");
        // console.log(magic);

        // form = app.form('login');
        // console.log(form);
        // form.isValid((validity) => {
        //     console.log(validity);
        // });

        function getData() {
            // console.log(form.data());
        }

        // post = z.elm.byId('post');
        // console.log(post);
        // console.log(post.classes());
        // console.log(post.classes().add('teal'));
        // console.log(post.classes());

        // text = new Elm().create('P');
        // console.log(text);


        // app.http.get('https://jsonplaceholder.typicode.com/posts/21').then((response) => {
        // console.log(response.json.body);
        //     text.text(response.json.body);
        //     post.append(text.e);
        // }).catch((error) => {
        //     console.log(error);
        // }).finally(() => {
        //     app.toast("xhr finished").show();
        //     console.log(app);
        // });
    </script>

</body>

</html>