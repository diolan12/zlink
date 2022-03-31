class Log {
    constructor(message = null, debug = false) {
        this.debug = debug;
        if (message !== null && this.debug) {}
        return console.log.bind(window.console);
    }

    warn(message) {
        if (this.debug) {
            console.warn(message);
        }
    }

    error(message) {
        if (this.debug) {
            return () => { console.error(message); };
        }
    }
}