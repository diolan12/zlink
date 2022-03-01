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