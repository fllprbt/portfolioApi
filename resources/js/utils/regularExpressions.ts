const authRegularExpressions = {
    email: /\S+@\S+\.\S+/,
    password: /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/,
};

export default authRegularExpressions;
