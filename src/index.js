class App {
    load() {
        $.getScript("https://cdn.jsdelivr.net/npm/@materializecss/materialize@1.1.0-alpha/dist/js/materialize.min.js", (Materialize) => {
            eval(Materialize);
            console.log("Materialize " + M.version + " loaded!");
        });
    }
    DOMContentLoaded(f = undefined) {
        window.addEventListener('DOMContentLoaded', () => {
            M.AutoInit();
            this.bind();
            if (f) f();
        });
    }
    constructor(name) {
        this.name = name;
        this.cookie = new Cookie();

        this.href = new Href();
        this.http = new Http();
        this.mat = new Materialize(this.el);
        this.storage = new Storage();

        this.DOMContentLoaded();
        return this;
    }
    form(name) {
        return new Form(name);
    }

    toast(msg) {
        return new Toast(msg, undefined, this.storage)
    };

    elm = new Elm();

    reload(delay = 0) {
        setTimeout(() => { location.reload() }, delay);
    };
    findLiveData(name) {
        return (function(name) { return globalThis[name] }).call(null, name);
    }
    bind() {
        this.inputElements = document.querySelectorAll('[z-live]');
        for (let el of this.inputElements) {
            let ld = this.findLiveData(el.getAttribute('z-live'));
            if (ld != undefined) {
                let input = new Input(el.id);
                input.setLiveData(ld);
                ld.observe((it) => {
                    input.el.value = it;
                });
            }
        }
    }
}