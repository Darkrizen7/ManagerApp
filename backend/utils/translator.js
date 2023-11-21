const fs = require('fs');

class Translator {
    constructor(lang) {
        this.lang = lang;
        this.transDictionnary = JSON.parse(fs.readFileSync("./utils/" + lang + ".json"));
    }
    setLang(lang) {
        this.lang = lang;
        this.transDictionnary = JSON.parse(fs.readFileSync("./utils/" + lang + ".json"));
    }
    translate(text_index, default_text) {
        const text = this.transDictionnary[text_index];
        if (!text) {
            if (!default_text) {
                return "ERROR LANG Index : " + text_index;
            }
            return default_text;
        }
        return text;
    }
}
const translator = new Translator("fr");
const tl = (text_index, default_text) => {
    return translator.translate(text_index, default_text)
}
module.exports = { translator, tl };