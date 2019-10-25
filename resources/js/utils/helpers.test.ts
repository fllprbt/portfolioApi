import { objValuesToString } from '.';

const objectWithEmptyValue = {
    key1: 'key1',
    key2: '',
    key3: 'key3',
};

it('Concatenates object values to string', () => {
    expect(objValuesToString({})).toBe('');
    expect(objValuesToString(objectWithEmptyValue)).not.toBe('key1. . key3.');
    expect(objValuesToString(objectWithEmptyValue)).not.toBe('key1. key3.');
    expect(objValuesToString(objectWithEmptyValue)).toBe('key1. key3');
    expect(objValuesToString(objectWithEmptyValue, '|')).toBe('key1|key3');
});
