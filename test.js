var longestCommonPrefix = function(strs) {
    strs.sort((a, b) => a.length - b.length)
    let result = '';
    for (let i = 0; i < strs[0].length; i++) {
        if (strs.every(item => item[i].includes(strs[0][i]))) {
            result += strs[0][i];
        } else {
            return result
        }
    }
    return result;
}

console.log(longestCommonPrefix(["ab", "a", "a"]))