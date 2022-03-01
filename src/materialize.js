class Materialize {
    constructor(elem) {
        this.modal = (id, options) => { return new Modal(id, options, elem) }

        return this;
    }
}