<div class="col s12 m6" data-list="posts">
    <div class="card">
        <form z-form="login">
            <div class="card-content">
                <span class="card-title">Autocomplete</span>
                <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">textsms</i>
                        <input type="text" id="autocomplete-input" class="autocomplete">
                        <label for="autocomplete-input">Autocomplete</label>
                    </div>
                    <div class="input-field col s12">
                        <input id="login-username" name="username" type="text" required z-validate="min: 3 & max: 6" z-live="username">
                        <label for="login-username">Username</label>
                    </div>
                    <div class="input-field col s12">
                        <input id="login-password" name="password" type="password" required z-live="password" data-length="16">
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