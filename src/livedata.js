class LiveData {
    value = undefined;

    constructor(initialValue = undefined) {
        this.value = initialValue;
        this.observers = new Set();

        return this;
    }
    getValue() {
        return this.value;
    }
    setValue = (newValue) => {
        this.value = newValue;
        this.notify();
    }
    postValue = (newValue) => {
        this.value = newValue;
        this.notify();
    }
    hasObservers = () => {
        return this.observers.size > 0;
    }
    async observe(observer) {
        this.observers.add(observer);
        this.notify();
    }

    notify() {
        if (this.hasObservers()) {
            for (let observer of this.observers) {
                if (this.value !== undefined && this.value !== null) {
                    observer(this.value);
                }
            }
        }
    }
}