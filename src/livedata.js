class LiveData {
    value;

    constructor(initialValue = undefined) {
        this.value = initialValue;
        this.observers = new Set();

        return this;
    }
    getValue() {
        return this.value;
    }
    setValue(newValue) {
        this.value = newValue;
    }
    postValue(newValue) {
        this.value = newValue;
        this.notify();
    }
    hasObservers() {
        return this.observers.size > 0;
    }
    removeObservers() {
        this.observers = new Set();
    }
    async observe(observer) {
        this.observers.add(observer);
    }
    async debounceObserve(observer, delay = 800) {
        this.observers.add((() => {
            let timeout

            return (...args) => {
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    observer(...args)
                }, delay)
            }
        })());
    }
    async throttleObserve(observer, delay = 300) {
        // this.observers.add(this.throttle(observer, delay));
        this.observers.add((() => {
            let shouldWait = false
            let waitingArgs
            const timeoutFunction = () => {
                if (waitingArgs == undefined) {
                    shouldWait = false
                } else {
                    observer(...waitingArgs)
                    waitingArgs = undefined
                    setTimeout(timeoutFunction, delay)
                }
            }

            return (...args) => {
                if (shouldWait) {
                    waitingArgs = args
                    return
                }

                observer(...args)
                shouldWait = true

                setTimeout(timeoutFunction, delay)
            }
        })());
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
    debounce(cb, delay) {
        let timeout

        return (...args) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                cb(...args)
            }, delay)
        }
    }
    throttle(cb, delay) {
        let shouldWait = false
        let waitingArgs
        const timeoutFunction = () => {
            if (waitingArgs == undefined) {
                shouldWait = false
            } else {
                cb(...waitingArgs)
                waitingArgs = undefined
                setTimeout(timeoutFunction, delay)
            }
        }

        return (...args) => {
            if (shouldWait) {
                waitingArgs = args
                return
            }

            cb(...args)
            shouldWait = true

            setTimeout(timeoutFunction, delay)
        }
    }
}