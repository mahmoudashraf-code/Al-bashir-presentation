const { readFileSync, writeFileSync } = require("fs")
const { join } = require("path")

module.exports.getSetting = function () {
    try {
        return JSON.parse(readFileSync(join(process.cwd(), "settingApp.json")).toString());
    } catch (err) {
        return generateSetting()
    }
}
module.exports.saveSetting = saveSetting;
function generateSetting() {
    let setting = {
        appPath: "",
        dataBase: {
            host: "",
            userName: "root",
            password: "",
            ready: "false"
        },
        theme: {
            frist: "#800f35",
            second: "white",
            dark: false
        },
        plugin: [],
        folderPath: [],
        ide: {
            tabs: []
        },
        pages: {
            tabsPages: []
        },
        router: "/welcome",
        console: true,
        selectPage: 0,
        header: "Welcome"
    }
    saveSetting(setting);
    return setting;
}
function saveSetting(data) {
    writeFileSync(join(process.cwd(), "settingApp.json"), JSON.stringify(data))
}