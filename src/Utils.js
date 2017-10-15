var words = require('./data/dictionary.json');

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

    static letterFreqs = {
        'A': 13,
        'B': 3,
        'C': 3,
        'D': 6,
        'E': 18,
        'F': 3,
        'G': 4,
        'H': 3,
        'I': 12,
        'J': 2,
        'K': 2,
        'L': 5,
        'M': 3,
        'N': 8,
        'O': 11,
        'P': 3,
        'Q': 2,
        'R': 9,
        'S': 6,
        'T': 9,
        'U': 6,
        'V': 3,
        'W': 3,
        'X': 2,
        'Y': 3,
        'Z': 2
    }

    // static letterFreqs = {
    //     'A': 4,
    //     'B': 3,
    //     'C': 3,
    //     'D': 6,
    //     'E': 5,
    // }


static shuffle(arr) {
    var i = 0, j = 0, temp = null;

    for (i = arr.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

static getShuffledLetters() {
    var letters = [];
        for (var letter in Utils.letterFreqs) {
        for (var i = 0; i < Utils.letterFreqs[letter]; i++) {
            letters.push(letter);
        }
    }
    Utils.shuffle(letters);
    return letters;
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