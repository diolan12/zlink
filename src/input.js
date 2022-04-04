class Input extends Elmn {
    constructor(e) {
        super(e);
        this.valid = new LiveData(true);
        this.value = new LiveData();

        this.parent = this.el.parentElement;
        this.input = this.el;
        this.label = this.parent.querySelector('label');

        this.helper = this.parent.querySelector('span');
        this.originalHelperText = this.helper ? this.helper.innerHTML : null;

        this.bind();
        this.update();
        return this;
    }
    getRules() {
        console.log('getRules()');
        this.rules = [];
        if (this.input.hasAttribute('required')) {
            this.rules.push("required");
        }
        let validation = this.input.getAttribute('z-validate');
        if (validation != null) {
            let rules = validation.replaceAll(/\s/g, '').split('&');

            for (let rule of rules) {
                let condition = rule.split(':');
                this.rules.push(`${condition[0]}-${condition[1]}`);
            }
        }
    }
    update() {
        M.updateTextFields();
        this.getRules();
        this.isRequired();
        this.isValidated();
    }
    bindLiveData(ld) {
        this.value = ld;
        if (ld.getValue() != undefined && ld.getValue() != null) {
            console.log(ld.getValue());
            this.input.value = ld.getValue();
            this.update();
        }
    }
    setValid(message = "") {
        this.input.classList.add('valid');
        this.input.classList.remove('invalid');
        if (this.helper != null && message != "") {
            this.helper.setAttribute('data-success', message);
        }
    }
    setInvalid(message = "") {
        this.input.classList.remove('valid');
        this.input.classList.add('invalid');
        if (this.helper != null && message != "") {
            this.helper.setAttribute('data-error', message);
        }
    }

    isRequired() {
        console.log('isRequired()');
        if (this.input.hasAttribute('required')) {
            if (!this.label.innerText.includes('*')) {
                this.label.innerHTML += ' *';
            }
        }
    }
    isValidated() {
        console.log('isValidated()')
        if (this.input.hasAttribute('z-validate')) {
            this.input.classList.add('validation');
            this.valid.observe((it) => {
                    // console.log(it);
                    // if (it) {
                    //     this.setValid();
                    // } else {
                    //     this.setInvalid();
                    // }
                })
                // this.rules = [];

            // this.rules =
            // console.log(this.rules);
        }
    }
    validate(newValue) {
        console.log('validate()');

        for (let rule of this.rules) {
            console.log(rule);
            let condition = rule.split('-');
            switch (condition[0]) {
                case 'required':
                    let assertRequired = (newValue.length != 0);
                    if (!assertRequired) {
                        this.setInvalid("This field is required");
                        return
                    }
                    console.log('required: ' + (newValue.length != 0) + ' & ' + this.valid.getValue() + ' = ' + ((newValue.length != 0) && this.valid.getValue()));
                    this.valid.postValue(assertRequired);
                    break;
                case 'min':
                    let assertMin = (newValue.length >= parseInt(condition[1])) && this.valid.getValue();
                    if (!assertMin) {
                        this.setInvalid("Min length is " + condition[1]);
                        return
                    }
                    console.log('min: ' + (newValue.length >= parseInt(condition[1])) + ' & ' + this.valid.getValue() + ' = ' + ((newValue.length < parseInt(condition[1])) && this.valid.getValue()));
                    this.valid.postValue(assertMin);
                    break;
                case 'max':
                    let assertMax = (newValue.length <= parseInt(condition[1])) && this.valid.getValue();
                    if (!assertMax) {
                        this.setInvalid("Max length is " + condition[1]);
                        return
                    }
                    console.log('max: ' + ((newValue.length <= parseInt(condition[1])) && this.valid.getValue()));
                    this.valid.postValue(assertMax);
                    break;
            }
        }
        if (this.valid.getValue()) {
            this.setValid();
        }

        console.warn(this.valid.getValue());
    }

    setValue(newValue) {
        console.log('setValue()');
        if (this.value.getValue() != newValue) {
            this.value.postValue(newValue);
            this.validate(newValue);
        }
    }
    bind() {
        this.input.addEventListener('input', (e) => {
            this.setValue(e.target.value);
            // this.update();
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