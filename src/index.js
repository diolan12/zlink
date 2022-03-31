class Zlink {
    version = '1.0.0-alpha';
    config = {
        debug: false,
        M: "https://cdn.jsdelivr.net/npm/@materializecss/materialize@1.1.0-alpha/dist/js/materialize.min.js",
        scripts: [
            "http", "cookie"
        ]
    };
    load() {
        try {
            $.getScript(this.config.M, (Materialize) => {
                eval(Materialize);
                new Log("Materialize " + M.version + " loaded!");
            });
        } catch (error) {
            if (error.message == '$ is not defined') {
                console.error("JQuery is not loaded");
            } else {
                console.error(error.message);
            }
        }
    }
    DOMContentLoaded(f = undefined) {
        window.addEventListener('DOMContentLoaded', () => {
            M.AutoInit();
            this.bind();
            if (f) f();
        });
    }
    constructor(name, config = undefined) {
        if (config != undefined) {
            this.config = config;
        }
        console.log = this.config.debug ? console.log : () => {};
        console.info = this.config.debug ? console.info : () => {};
        console.warn = this.config.debug ? console.warn : () => {};
        console.error = this.config.debug ? console.error : () => {};
        this.load();

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

    lmn = new Lmn();


    reload(delay = 0) {
        setTimeout(() => { location.reload() }, delay);
    };
    findLiveData(name) {
        return (function(name) { return globalThis[name] }).call(null, name);
    }
    bind() {
        this.liveElements = document.querySelectorAll('[z-live]');
        this.bindElements = document.querySelectorAll('[z-bind]');
        for (let el of this.liveElements) {
            let ld = this.findLiveData(el.getAttribute('z-live'));
            if (ld != undefined) {
                let input = new Input(el);
                input.setLiveData(ld);
                ld.observe((it) => {
                    input.el.value = it;
                    input.update();
                });
            }
        }

        for (let el of this.bindElements) {
            let ld = this.findLiveData(el.getAttribute('z-bind'));
            if (ld != undefined) {
                ld.observe((it) => {
                    el.innerHTML = it;
                })
            }
        }
    }
}