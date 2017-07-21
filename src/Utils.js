var words = require('./dictionary.json');

class Utils {
    static keyCodes = {
        65 : "a",
        66 : "b",
        67 : "c",
        68 : "d",
        69 : "e",
        70 : "f",
        71 : "g",
        72 : "h",
        73 : "i",
        74 : "j",
        75 : "k",
        76 : "l",
        77 : "m",
        78 : "n",
        79 : "o",
        80 : "p",
        81 : "q",
        82 : "r",
        83 : "s",
        84 : "t",
        85 : "u",
        86 : "v",
        87 : "w",
        88 : "x",
        89 : "y",
        90 : "z"
    }

    static createDictionary() {
        var hash = {};
        for (var i = 0; i < words.length; i++) {
            if (words[i].length < 3) {
                continue;
            } else if (hash[words[i][0]]) {
                hash[words[i][0]].push(words[i]);
            } else {
                hash[words[i][0]] = [words[i]];
            }
        }
        return hash;
    }

    static dictionary = Utils.createDictionary();

    static asWord(tiles) {
        var word = "";
        for (var i = 0; i < tiles.length; i++) {
            word = word.concat(tiles[i].letter);
        }
        return word;
    }

    static isValid(word) {
        if (word.length > 0) {
            var key = word[0].toLowerCase();
            return Utils.dictionary[key].indexOf(word.toLowerCase()) > -1;
        } else {
            return false;
        }
    }
}

export default Utils;