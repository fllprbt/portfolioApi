/**
 * Converts the values of an object to a string, separating each entry with a period.
 * @param {Object} object - the initial object
 * @param {string} separator - a string to separate each value of the object
 * @returns {string} the object values string
 */
export const objValuesToString = (
    object: Record<string, string>,
    separator?: string
): string => {
    const result = Object.values(object)
        .concat()
        .filter(Boolean)
        .join(separator ? separator : '. ')
        .trim();

    return result.length ? result : '';
};
