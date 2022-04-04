class Elmn {
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