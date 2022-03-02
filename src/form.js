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