class Cookie {
    constructor() {
        this.key = undefined;
        this.value = undefined;
        this.has = (name) => {
            return this.get(name) !== null;
        }
        this.set = (name, value, age) => {
            const d = new Date();
            d.setTime(d.getTime() + (age * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = name + "=" + value + ";" + expires + ";path=/";
            this.key = name;
            this.value = value;
            return this;
        }
        this.get = (name) => {
            name += "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    let v = c.substring(name.length, c.length)
                    this.key = name;
                    this.value = v;
                    return v;
                }
            }
            return null
        }
        this.remove = (name) => {
            this.set(name, "", -1);
            return this;
        }
        return this;
    }
    toString() {
        return JSON.stringify({ key: this.key, value: this.value });
    }
}
class Elm {
    el = undefined;
    constructor(e = undefined) {
        if (e !== undefined) {
            this.el = document.createElement(e);
        }

        this.byId = (id) => {
            this.el = document.getElementById(id);
            if (this.el === null) {
                console.error(`Element with id ${id} not found!`);
            }

            return this;
        }
        this.byClass = (className) => {
            return document.getElementsByClassName(className);
        }
        this.text = (text) => {
            this.el.append(document.createTextNode(text));

            return this;
        }
        this.append = (el) => {
            this.el.appendChild(el);

            return this;
        }

        this.classes = () => {
            return this.el.classList;
        }

        return this;
    }

}
class Form {
    form = undefined;
    valid = [false];
    validityCallback = () => {};
    data = {};
    constructor(name) {
        this.form = document.querySelectorAll(`[z-form="${name}"]`)[0];
        this.inputs = this.form.querySelectorAll('input, textarea');

        // this.registerInput();
        // this.bindValidator();
        return this;
    }
    registerInput() {
        for (let input of this.inputs) {
            let i = new Input(input.id);
            this.isRequired(i);
            this.bind(i);
        }
    }
    isRequired(input) {
        if (input.hasAttribute('required')) {
            let parent = input.parentElement;
            let label = parent.querySelector('label');
            label.innerHTML += ' *';
        }
    }
    bind(input) {
        input.value.observe((it) => {
                this.data[e.target.name] = it;
            })
            // input.addEventListener('keyup', (e) => {
            // console.log(e.target.value);
            // console.log(e.target.getAttribute('z-validate'));
            // });
    }
    bindValidator() {
        for (let input of this.inputs) {
            if (input.type == 'text' || input.type == 'password') {
                console.log(input);
                // vals = input.attributes['z-vals'];
                input.addEventListener('keyup', (e) => {
                    const validation = e.target.getAttribute('z-validate');
                    e.target.validation = false;
                    let ar = [];
                    if (validation) {
                        let arr = validation.split('&');
                        for (let i = 0; i < arr.length; i++) {
                            // ar.push(arr[i].split(':'));
                            console.log(ar);
                            switch (ar[i][0]) {
                                case 'required':
                                    if (e.target.value.length > 0) {
                                        e.target.classList.remove('invalid');
                                        e.target.classList.add('valid');
                                        this.valid = true;
                                    } else {
                                        e.target.classList.remove('valid');
                                        e.target.classList.add('invalid');
                                        this.valid = false;
                                    }
                                    break;
                                case 'min':
                                    if (e.target.value.length >= ar[0][1]) {
                                        e.target.classList.remove('invalid');
                                        e.target.classList.add('valid');
                                        this.valid = true;
                                    } else {
                                        e.target.classList.remove('valid');
                                        e.target.classList.add('invalid');
                                        this.valid = false;
                                    }
                                    break;
                                case 'max':
                                    if (e.target.value.length <= ar[0][1]) {
                                        e.target.classList.remove('invalid');
                                        e.target.classList.add('valid');
                                        this.valid = true;
                                    } else {
                                        e.target.classList.remove('valid');
                                        e.target.classList.add('invalid');
                                        this.valid = false;
                                    }
                                    break;
                            }
                        }


                        console.log(e.target.value);
                        console.log(e.target.getAttribute('z-validate'));
                        // this.validate(e.target);
                    }
                });
                // input.addEventListener('input', (e) => {
                //     this.valid = this.validate();
                // });
            }
        }
    }
    isValid(callback) {
        this.validityCallback = callback;
        return this.validityCallback(!this.valid.includes(false));
    }
    data() {
        return this.data;
    }
}
class Href {
    constructor() {
        this.url = window.location.href;
        const path = this.url.split("?")[0];
        const param = this.url.split("?")[1];

        this.hasParam = (name) => {
            if (param === undefined) return false;
            let params = param.split("&");
            var r = false;
            for (var i = 0; i < params.length; i++) {
                var p = params[i].split("=");
                if (p[0] == name) {
                    r = true;
                    break;
                }
            }
            return r;
        }
        this.getParam = (name) => {
            if (!this.hasParam(name)) return undefined;
            let params = param.split("&");
            var r = undefined;
            for (var i = 0; i < params.length; i++) {
                var p = params[i].split("=");
                if (p[0] == name) {
                    try {
                        r = decodeURI(p[1]);
                    } catch (error) {
                        console.error(error);
                    }
                    break;
                }
            }
            return r;
        }
        this.clearParams = () => {
            replaceState(path);
            return this;
        }
        this.clearParam = (p = undefined) => {
            let newUrl = path;
            if (p == undefined) {
                replaceState(newUrl);
            } else if (typeof p === 'string' || p instanceof String) {

            }
            return this;
        }
        this.toString = () => {
            return this.url;
        }
        return this;
    }
}
class Http {
    constructor() {
        const http = new XMLHttpRequest();

        this.get = async(url) => {
            return new Promise(function(resolve, reject) {
                http.onloadend = function() {
                    var response = {
                        body: this.response,
                        status: {
                            code: this.status,
                            text: this.statusText
                        },
                        xhr: this
                    }
                    if (this.status >= 400) {
                        reject(response)
                    } else {
                        var json = undefined
                        try {
                            json = JSON.parse(this.response);
                        } catch (error) {
                            console.error(error);
                        }
                        if (json != undefined) {
                            response.json = json;
                        }
                        resolve(response);
                    }
                };
                http.onerror = function() {
                    var data = {
                        body: this.response,
                        status: {
                            code: this.status,
                            text: this.statusText
                        },
                        xhr: this
                    }
                    reject(data);
                };
                http.open("GET", url, true);
                http.send();
            })
        };

        this.post = async(url, data) => {
            return new Promise(function(resolve, reject) {
                http.onloadend = function(response) {
                    var response = {
                        body: this.response,
                        status: {
                            code: this.status,
                            text: this.statusText
                        },
                        xhr: this
                    }
                    if (this.status >= 400) {
                        reject(response);
                    } else {
                        var json = undefined
                        try {
                            json = JSON.parse(this.response);
                        } catch (error) {
                            console.error(error);
                        }
                        if (json != undefined) {
                            response.json = json;
                        }
                        resolve(response);
                    }
                };
                http.onerror = function(response) {
                    var data = {
                        body: this.response,
                        status: {
                            code: this.status,
                            text: this.statusText
                        },
                        xhr: this
                    }
                    reject(data);
                };
                http.open("POST", url, true);
                http.setRequestHeader('Content-type', 'application/json');
                http.send(JSON.stringify(data));
            });
        };

        this.put = async(url, data) => {
            return new Promise(function(resolve, reject) {
                http.onloadend = function(response) {
                    var response = {
                        body: this.response,
                        status: {
                            code: this.status,
                            text: this.statusText
                        },
                        xhr: this
                    }
                    if (this.status >= 400) {
                        reject(response);
                    } else {
                        var json = undefined
                        try {
                            json = JSON.parse(this.response);
                        } catch (error) {
                            console.error(error);
                        }
                        if (json != undefined) {
                            response.json = json;
                        }
                        resolve(response);
                    }
                };
                http.onerror = function(response) {
                    var data = {
                        body: this.response,
                        status: {
                            code: this.status,
                            text: this.statusText
                        },
                        xhr: this
                    }
                    reject(data);
                };
                http.open("PUT", url, true);
                http.setRequestHeader('Content-type', 'application/json');
                http.send(JSON.stringify(data));
            });
        };

        this.delete = async(url) => {
            return new Promise(function(resolve, reject) {
                http.onloadend = function(response) {
                    var response = {
                        body: this.response,
                        status: {
                            code: this.status,
                            text: this.statusText
                        },
                        xhr: this
                    }
                    if (this.status >= 400) {
                        reject(response);
                    } else {
                        var json = undefined
                        try {
                            json = JSON.parse(this.response);
                        } catch (error) {
                            console.error(error);
                        }
                        if (json != undefined) {
                            response.json = json;
                        }
                        resolve(response);
                    }
                };
                http.onerror = function(response) {
                    var data = {
                        body: this.response,
                        status: {
                            code: this.status,
                            text: this.statusText
                        },
                        xhr: this
                    }
                    reject(data);
                };
                http.open("DELETE", url, true);
                http.send();
            });
        };
    }
}
class Input extends Elm {
    constructor(id) {
        super().byId(id);
        this.valid = new LiveData(false);
        this.value = new LiveData();

        this.isRequired();
        this.bind();
        return this;
    }
    setLiveData(ld) {
        this.value = ld;
        this.el.value = ld.getValue();
        if (ld.getValue() != undefined) {
            M.updateTextFields();
        }
    }

    isRequired() {
        if (this.el.hasAttribute('required')) {
            let parent = this.el.parentElement;
            let label = parent.querySelector('label');
            label.innerHTML += ' *';
        }
    }

    bind() {
        this.el.addEventListener('keyup', (e) => {
            this.value.postValue(e.target.value);
            M.updateTextFields();
        });
        this.el.addEventListener('keydown', (e) => {
            this.value.postValue(e.target.value);
        });
    }
}
class LiveData {
    value = undefined;

    constructor(initialValue = undefined) {
        this.value = initialValue;
        this.observers = new Set();

        return this;
    }
    getValue() {
        return this.value;
    }
    setValue = (newValue) => {
        this.value = newValue;
        this.notify();
    }
    postValue = (newValue) => {
        this.value = newValue;
        this.notify();
    }
    hasObservers = () => {
        return this.observers.size > 0;
    }
    async observe(observer) {
        this.observers.add(observer);
        this.notify();
    }

    notify() {
        if (this.hasObservers()) {
            for (let observer of this.observers) {
                if (this.value !== undefined && this.value !== null) {
                    observer(this.value);
                }
            }
        }
    }
}
class Materialize {
    constructor(elem) {
        this.modal = (id, options) => { return new Modal(id, options, elem) }

        return this;
    }
}
class Modal {
    constructor(id, options = undefined, elem) {
        this.id = id;
        this.e = M.Modal.init(elem.byID(id), options);
        return this;
    }

    open() {
        this.e.open();
        return this;
    }

    close() {
        this.e.close();
        return this;
    }
}
class Storage {
    constructor() {
        this.has = (key) => {
            return localStorage.getItem(key) != null;
        }
        this.set = (key, value) => {
            localStorage.setItem(key, value);
            return this;
        }
        this.get = (key) => {
            return localStorage.getItem(key);
        }
        this.remove = (key) => {
            localStorage.removeItem(key);
            return this;
        }
        this.clear = () => {
            localStorage.clear();
            return this;
        }
        return this;
    }
}
class Toast {
    checkToast() {
        if (this.storage.has('toast-next')) {
            this.msg = this.storage.get('toast-next');
            this.show()
            this.storage.remove('toast-next')
        }
    }
    constructor(msg, option = undefined, storage) {
        this.msg = msg;
        this.storage = storage;

        this.show = (displayLength = 4000) => {
            M.toast({ html: this.msg, option: { displayLength: displayLength } });
            return this;
        }
        this.next = () => {
            storage.set('toast-next', msg);
            return this;
        }
        this.dismiss = () => {
            M.Toast.dismissAll();
            return this;
        }

        this.checkToast();
        return this;
    }

}
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