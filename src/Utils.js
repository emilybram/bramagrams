
class Utils {
    static letterFreqs = {
        'a': 13,
        'b': 3,
        'c': 3,
        'd': 6,
        'e': 18,
        'f': 3,
        'g': 4,
        'h': 3,
        'i': 12,
        'j': 2,
        'k': 2,
        'l': 5,
        'm': 3,
        'n': 8,
        'o': 11,
        'p': 3,
        'q': 2,
        'r': 9,
        's': 6,
        't': 9,
        'u': 6,
        'v': 3,
        'w': 3,
        'x': 2,
        'y': 3,
        'z': 2
    };
    
    static shuffle(arr) {
        var i = 0, j = 0, temp = null;

        for (i = arr.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
}

export default Utils;