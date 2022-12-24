import express from "./express";

class App {
    constructor() {}

    public loadSever() {
        express.main();
    }
}

export default App;