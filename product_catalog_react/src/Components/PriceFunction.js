export default function commafy(num) {
    num = Math.round(num * 100) / 100
    var str = num.toString().split('.');
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1.');
    }
    if (str[1] && str[1].length >= 4) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    if (!str[1]) {
        str[1] = "00";
    }
    return str.join(',');
}