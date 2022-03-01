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