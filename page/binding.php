<div class="col s12 m6" data-list="posts">
    <div class="card">
        <form z-form="login">
            <div class="card-content">
                <span class="card-title">Binding</span>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="binding-input" name="input" type="text" z-bind="input" required z-validate="min: 3 & max: 6">
                        <label for="binding-input">Input Here</label>
                    </div>
                    <div class="input-field col s12">
                        <input id="binding-default" name="input" type="text" z-bind="input" data-length="16">
                        <label for="binding-default">HTML Binding Default</label>
                    </div>
                    <div class="input-field col s12">
                        <input id="binding-debounce" name="input" type="text" z-bind-debounce="input" data-length="16">
                        <label for="binding-debounce">HTML Binding Debounce</label>
                    </div>
                    <div class="input-field col s12">
                        <input id="binding-throttle" name="input" type="text" z-bind-throttle="input" data-length="16">
                        <label for="binding-throttle">HTML Binding Throttle</label>
                    </div>
                </div>
                <p>HTML Live Default: <b z-live="input">HTML LiveData Default</b></p>
                <p>HTML Live Debounce: <b z-live-debounce="input">HTML LiveData Debounce</b></p>
                <p>HTML Live Throttle: <b z-live-throttle="input">HTML LiveData Throttle</b></p>
            </div>
            <div class="card-action right-align">
                <a onclick="reset()" href="#">Reset</a>
                <a onclick="getValue()" href="#">Get Value</a>
            </div>
        </form>
    </div>
</div>
<script type="text/javascript">
    input = new LiveData('Hello World!');
    input.observe((it) => {
        console.log(`observe default: ${it}`);
    });
    input.debounceObserve((it) => {
        console.log(`observe debounce: ${it}`);
    });
    input.throttleObserve((it) => {
        console.log(`observe throttle: ${it}`);
    });
    function reset() {
        input.postValue('Hello World!');
    }
    function getValue() {
        input.getValue();
        z.toast('Value: ' + input.getValue()).show();
    }
</script>