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
    setLiveData(ld) {
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