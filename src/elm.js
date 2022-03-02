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