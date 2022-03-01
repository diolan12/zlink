class Http {
    constructor() {
        const http = new XMLHttpRequest();

        this.get = (url) => {
            return new Promise(function(resolve, reject) {
                http.onloadend = function() {
                    var response = {
                        body: this.response,
                        status: {
                            code: this.status,
                            text: this.statusText
                        },
                        xhr: this
                    }
                    if (this.status >= 400) {
                        reject(response)
                    } else {
                        var json = undefined
                        try {
                            json = JSON.parse(this.response);
                        } catch (error) {
                            console.error(error);
                        }
                        if (json != undefined) {
                            response.json = json;
                        }
                        resolve(response);
                    }
                };
                http.onerror = function() {
                    var data = {
                        body: this.response,
                        status: {
                            code: this.status,
                            text: this.statusText
                        },
                        xhr: this
                    }
                    reject(data);
                };
                http.open("GET", url, true);
                http.send();
            })
        };

        this.post = (url, data) => {
            return new Promise(function(resolve, reject) {
                http.onloadend = function(response) {
                    var response = {
                        body: this.response,
                        status: {
                            code: this.status,
                            text: this.statusText
                        },
                        xhr: this
                    }
                    if (this.status >= 400) {
                        reject(response);
                    } else {
                        var json = undefined
                        try {
                            json = JSON.parse(this.response);
                        } catch (error) {
                            console.error(error);
                        }
                        if (json != undefined) {
                            response.json = json;
                        }
                        resolve(response);
                    }
                };
                http.onerror = function(response) {
                    var data = {
                        body: this.response,
                        status: {
                            code: this.status,
                            text: this.statusText
                        },
                        xhr: this
                    }
                    reject(data);
                };
                http.open("POST", url, true);
                http.setRequestHeader('Content-type', 'application/json');
                http.send(JSON.stringify(data));
            });
        };

        this.put = (url, data) => {
            return new Promise(function(resolve, reject) {
                http.onloadend = function(response) {
                    var response = {
                        body: this.response,
                        status: {
                            code: this.status,
                            text: this.statusText
                        },
                        xhr: this
                    }
                    if (this.status >= 400) {
                        reject(response);
                    } else {
                        var json = undefined
                        try {
                            json = JSON.parse(this.response);
                        } catch (error) {
                            console.error(error);
                        }
                        if (json != undefined) {
                            response.json = json;
                        }
                        resolve(response);
                    }
                };
                http.onerror = function(response) {
                    var data = {
                        body: this.response,
                        status: {
                            code: this.status,
                            text: this.statusText
                        },
                        xhr: this
                    }
                    reject(data);
                };
                http.open("PUT", url, true);
                http.setRequestHeader('Content-type', 'application/json');
                http.send(JSON.stringify(data));
            });
        };

        this.delete = (url) => {
            return new Promise(function(resolve, reject) {
                http.onloadend = function(response) {
                    var response = {
                        body: this.response,
                        status: {
                            code: this.status,
                            text: this.statusText
                        },
                        xhr: this
                    }
                    if (this.status >= 400) {
                        reject(response);
                    } else {
                        var json = undefined
                        try {
                            json = JSON.parse(this.response);
                        } catch (error) {
                            console.error(error);
                        }
                        if (json != undefined) {
                            response.json = json;
                        }
                        resolve(response);
                    }
                };
                http.onerror = function(response) {
                    var data = {
                        body: this.response,
                        status: {
                            code: this.status,
                            text: this.statusText
                        },
                        xhr: this
                    }
                    reject(data);
                };
                http.open("DELETE", url, true);
                http.send();
            });
        };
    }
}