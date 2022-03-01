class Elm {
    constructor(e = undefined) {
        if (e !== undefined) {
            this.e = document.createElement(e);
        }

        this.byId = (id) => {
            this.e = document.getElementById(id);

            return this;
        }
        this.byClass = (className) => {
            this.e = document.getElementsByClassName(className);

            return this.e;
        }
        this.text = (text) => {
            this.e.append(document.createTextNode(text));

            return this;
        }
        this.append = (el) => {
            this.e.appendChild(el);

            return this;
        }

        this.classes = () => {
            return this.e.classList;
        }

        return this;
    }

}