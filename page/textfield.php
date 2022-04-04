<div class="col s12 m6" data-list="posts">
    <div class="card">
        <form z-form="login">
            <div class="card-content">
                <span class="card-title">Textfield</span>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="textfield-username" name="username" type="text" required z-validate="min: 3 & max: 6" z-live="username">
                        <label for="textfield-username">Username</label>
                    </div>
                    <div class="input-field col s12">
                        <input id="textfield-password" name="password" type="password" required z-live="password" data-length="16">
                        <label for="textfield-password" z-bind="password">Password</label>
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