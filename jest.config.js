require('dotenv').config({ path: ".env.testing" })

module.exports = {
    roots: ['<rootDir>/resources/js/'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    moduleNameMapper: {
        '(:?^|s)api/(.*)$': '<rootDir>/resources/js/$2'
    },
    setupFilesAfterEnv: ['<rootDir>resources/js/setupTests.ts'],
    collectCoverage: true
};
