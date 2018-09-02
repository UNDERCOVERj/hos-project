/** Used to map HTML entities to characters. */
const htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
}

const reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g
const reHasEscapedHtml = RegExp(reEscapedHtml.source)

function unescape(string) {
    string = (string && reHasEscapedHtml.test(string))
        ? string.replace(reEscapedHtml, (entity, b, c) => {
            return htmlUnescapes[entity]
        })
        : string;
    return string.replace(/(&nbsp;){4}/g, () => {
        return "　"
    })
}

function deleteQuot(str) {
    var reg = /^[\"](.+)[\"]$/g;
    return str = str.replace(reg, ($1, $2) => {
        return $2
    })
}

module.exports = {
    unescape,
    deleteQuot
};