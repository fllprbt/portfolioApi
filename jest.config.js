module.exports = {
  "roots": [
    "<rootDir>/resources/js/"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "moduleNameMapper": {
    "(:?^|\s)api\/(.*)$": "<rootDir>/resources/js/$2"
  }
}
