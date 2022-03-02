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
    <script src="/dist/zlink.js"></script>

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
                <div class="col s12 m6" data-list="posts">
                    <div class="card">
                        <form z-form="login">
                            <div class="card-content">
                                <span class="card-title">Login</span>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input id="login-username" name="username" type="text" required z-validate="min: 3 & max: 6" z-live="username">
                                        <label for="login-username">Username</label>
                                    </div>
                                    <div class="input-field col s12">
                                        <input id="login-password" name="password" type="password" z-live="password" data-length="16">
                                        <label for="login-password" z-bind="password">Password</label>
                                    </div>
                                </div>
                            </div>
                            <div class="card-action right-align">
                                <a href="#">Register</a>
                                <a onclick="getData()" href="#" class="submit">Login</a>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="post" class="col s12 m6" data-list="posts">
                    <div class="card">
                        <form z-form="register">
                            <div class="card-content">
                                <span class="card-title">Register</span>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input id="register-username" name="username" type="text" z-live="username" required z-validate="min: 3 & max: 6" >
                                        <label for="register-username">Username</label>
                                    </div>
                                    <div class="input-field col s12">
                                        <input id="register-password" name="password" type="password" z-live="password" data-length="16">
                                        <label for="register-password" z-bind="password">Password</label>
                                    </div>
                                </div>
                            </div>
                            <div class="card-action right-align">
                                <a href="#">Register</a>
                                <a onclick="getData()" href="#" class="submit">Login</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <footer></footer>
    <script>
        username = new LiveData('exxample12');
        // console.log(this);
        username.observe((it) => {
            console.log(`observe username: ${it}`);
            // app.elm.byId('register-username').value = it;
            // document.getElementById('login-username').value = it;
        });
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
            console.log(`observe password: ${it}`);
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

        post = app.elm.byId('post');
        // console.log(post);
        // console.log(post.classes());
        // console.log(post.classes().add('teal'));
        // console.log(post.classes());

        text = new Elm('P');
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