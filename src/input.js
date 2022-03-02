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