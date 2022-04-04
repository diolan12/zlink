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
class Input extends Lmn {
    constructor(e) {
        super(e);
        this.valid = new LiveData(null);
        this.value = new LiveData();

        this.parent = this.el.parentElement;
        this.input = this.el;
        this.label = this.parent.querySelector('label');

        this.helper = this.parent.querySelector('span');
        this.originalHelperText = this.helper ? this.helper.innerHTML : null;
        // console.log(this.originalHelperText);

        this.bind();
        this.update();
        return this;
    }
    update() {
        M.updateTextFields();
        this.isRequired();
        this.isValidated();
    }
    bindLiveData(ld) {
        this.value = ld;
        this.input.value = ld.getValue();
        if (ld.getValue() != undefined) {
            this.update();
        }
    }
    setValid(message = "") {
        this.input.classList.add('valid');
        this.input.classList.remove('invalid');
        if (this.helper != null) {
            this.helper.innerHTML = message;
        }
    }
    setInvalid(message = "") {
        this.input.classList.remove('valid');
        this.input.classList.add('invalid');
        if (this.helper != null) {
            this.helper.innerHTML = message;
        }
    }

    isRequired() {
        if (this.input.hasAttribute('required')) {
            if (!this.label.innerText.includes('*')) {
                this.label.innerHTML += ' *';
            }
        }
    }
    isValidated() {
        if (this.input.hasAttribute('z-validate')) {
            this.input.classList.add('validation');
            this.valid.observe((it) => {
                // console.log(it);
                if (it) {
                    this.setValid();
                } else {
                    this.setInvalid();
                }
            })
            this.rules = this.input.getAttribute('z-validate').split('&');
            // console.log(this.rules);
        }
    }
    validate(newValue) {
        // for (let rule of this.rules) {
        //     console.log(rule);
        //     key = rule.split(':')[0];
        //     value = rule.split(':')[1];
        //     switch (key) {
        //         case 'min':
        //             this.valid.postValue(newValue.length < value);
        //             break;
        //         case 'max':
        //             this.valid.postValue(newValue.length > value);
        //             break;
        //     }
        // }
    }

    postNecessary(newValue) {
        if (this.value.getValue() != newValue) {
            this.value.postValue(newValue);
            this.validate(newValue);
        }
    }
    bind() {
        this.input.addEventListener('input', (e) => {
            this.postNecessary(e.target.value);
            this.update();
        });
        // this.input.addEventListener('keyup', (e) => {
        //     this.postNecessary(e.target.value);
        //     this.update();
        // });
        // this.input.addEventListener('keydown', (e) => {
        //     this.postNecessary(e.target.value);
        //     this.update();
        // });
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
    setValue(newValue) {
        this.value = newValue;
        this.notify();
    }
    postValue(newValue) {
        this.value = newValue;
        this.notify();
    }
    hasObservers() {
        return this.observers.size > 0;
    }
    removeObservers() {
        this.observers = new Set();
    }
    async observe(observer) {
        this.observers.add(observer);
    }
    async debounceObserve(observer, delay = 800) {
        this.observers.add((() => {
            let timeout

            return (...args) => {
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    observer(...args)
                }, delay)
            }
        })());
    }
    async throttleObserve(observer, delay = 300) {
        // this.observers.add(this.throttle(observer, delay));
        this.observers.add((() => {
            let shouldWait = false
            let waitingArgs
            const timeoutFunction = () => {
                if (waitingArgs == undefined) {
                    shouldWait = false
                } else {
                    observer(...waitingArgs)
                    waitingArgs = undefined
                    setTimeout(timeoutFunction, delay)
                }
            }

            return (...args) => {
                if (shouldWait) {
                    waitingArgs = args
                    return
                }

                observer(...args)
                shouldWait = true

                setTimeout(timeoutFunction, delay)
            }
        })());
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
    debounce(cb, delay) {
        let timeout

        return (...args) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                cb(...args)
            }, delay)
        }
    }
    throttle(cb, delay) {
        let shouldWait = false
        let waitingArgs
        const timeoutFunction = () => {
            if (waitingArgs == undefined) {
                shouldWait = false
            } else {
                cb(...waitingArgs)
                waitingArgs = undefined
                setTimeout(timeoutFunction, delay)
            }
        }

        return (...args) => {
            if (shouldWait) {
                waitingArgs = args
                return
            }

            cb(...args)
            shouldWait = true

            setTimeout(timeoutFunction, delay)
        }
    }
}
class Lmn {
    el = undefined;
    /** 
     * @param {Element} e 
     * @param {string} value
     * @returns {Lmn}
     */
    constructor(e = undefined) {
        if (e !== undefined) {
            this.el = e;
        }
        return this;
    }
    create(e) {
        this.el = document.createElement(e);
        return this;
    }
    byId(id) {
        this.el = document.getElementById(id);
        if (this.el === null) {
            throw (`Element with id ${id} not found!`);
        }

        return this;
    }
    byClass(className) {
        return document.getElementsByClassName(className);
    }
    text(text) {
        this.el.append(document.createTextNode(text));

        return this;
    }
    append(el) {
        this.el.appendChild(el);

        return this;
    }

    classes() {
        return this.el.classList;
    }
}
class Log {
    constructor(message = null, debug = false) {
        this.debug = debug;
        if (message !== null && this.debug) {}
        return console.log.bind(window.console);
    }

    warn(message) {
        if (this.debug) {
            console.warn(message);
        }
    }

    error(message) {
        if (this.debug) {
            return () => { console.error(message); };
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
        this.bindElements = document.querySelectorAll('[z-bind]');
        this.bindDebounceElements = document.querySelectorAll('[z-bind-debounce]');
        this.bindThrottleElements = document.querySelectorAll('[z-bind-throttle]');

        this.liveElements = document.querySelectorAll('[z-live]');
        this.liveDebounceElements = document.querySelectorAll('[z-live-debounce]');
        this.liveThrottleElements = document.querySelectorAll('[z-live-throttle]');

        for (let el of this.bindElements) {
            let ld = this.findLiveData(el.getAttribute('z-bind'));
            if (ld != undefined) {
                let input = new Input(el);
                input.bindLiveData(ld);
                ld.observe((it) => {
                    input.el.value = it;
                    input.update();
                });
            }
        }
        for (let el of this.bindDebounceElements) {
            let ld = this.findLiveData(el.getAttribute('z-bind-debounce'));
            if (ld != undefined) {
                let input = new Input(el);
                input.bindLiveData(ld);
                ld.debounceObserve((it) => {
                    input.el.value = it;
                    input.update();
                });
            }
        }
        for (let el of this.bindThrottleElements) {
            let ld = this.findLiveData(el.getAttribute('z-bind-throttle'));
            if (ld != undefined) {
                let input = new Input(el);
                input.bindLiveData(ld);
                ld.throttleObserve((it) => {
                    input.el.value = it;
                    input.update();
                });
            }
        }

        for (let el of this.liveElements) {
            let ld = this.findLiveData(el.getAttribute('z-live'));
            if (ld != undefined) {
                el.innerHTML = ld.getValue();
                ld.observe((it) => {
                    el.innerHTML = it;
                })
            }
        }
        for (let el of this.liveDebounceElements) {
            let ld = this.findLiveData(el.getAttribute('z-live-debounce'));
            if (ld != undefined) {
                el.innerHTML = ld.getValue();
                ld.debounceObserve((it) => {
                    el.innerHTML = it;
                })
            }
        }
        for (let el of this.liveThrottleElements) {
            let ld = this.findLiveData(el.getAttribute('z-live-throttle'));
            if (ld != undefined) {
                el.innerHTML = ld.getValue();
                ld.throttleObserve((it) => {
                    el.innerHTML = it;
                })
            }
        }
    }
}
