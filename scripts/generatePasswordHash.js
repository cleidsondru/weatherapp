const issac = require('isaac');
const reactNativeBcrypt = require('react-native-bcrypt');

reactNativeBcrypt.setRandomFallback((len) => {
    const buf = new Array(len);
    return buf.map(() => Math.floor(issac.random() * 256));
});
const result = reactNativeBcrypt.hashSync('testingapp');
console.log(result);
