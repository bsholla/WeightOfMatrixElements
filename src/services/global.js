const isEmptyObj = function (input) {
    if (typeof input === "array") {
        return input.length === 0;
    }

    return !input || Object.keys(input).length === 0;
}
function getMinWeight(data) {
    return data.reduce((min, p) => p.weight < min ? p.weight : min, data[0].weight);
}
function getMaxWeight(data) {
    return data.reduce((max, p) => p.weight > max ? p.weight : max, data[0].weight);
}
export default {isEmptyObj,getMinWeight,getMaxWeight}