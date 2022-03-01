class App {
    load() {
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js", (Materialize) => {
            eval(Materialize);
            console.log("Materialize " + M.version + " loaded!");
        });
    }
    onloaded() {
        window.addEventListener('DOMContentLoaded', () => {
            M.AutoInit();
        });
    }
    constructor(name) {
        this.name = name;
        this.cookie = new Cookie();

        this.href = new Href();
        this.http = new Http();
        this.mat = new Materialize(this.el);
        this.storage = new Storage();

        return this;
    }

    toast(msg) {
        return new Toast(msg, undefined, this.storage)
    };

    elm(e = undefined) {
        return new Elm(e);
    };

    reload(delay = 0) {
        setTimeout(() => { location.reload() }, delay);
    };
}