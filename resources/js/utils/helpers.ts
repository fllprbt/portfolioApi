/**
 * Converts the values of an object to a string, separating each entry with a period.
 * @param {Object} object - the initial object
 * @returns {string} the object values string
 */
const objValuesToString = (object): string =>
    Object.keys(object)
        .map((e) => object[e])
        .concat()
        .join('. ');

export default objValuesToString;
