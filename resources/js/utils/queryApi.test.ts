const {
    env: {
        APP_URL,
        ROUTE_REGISTER,
        ROUTE_LOGIN,
        ROUTE_RESEND_VERIFICATION,
        ROUTE_SEND_PASSWORD_RESET_EMAIL,
        ROUTE_RESET_PASSWORD,
    },
} = process;

it('Posts form payloads to proper urls', () => {
    expect(APP_URL).toBe('http://0.0.0.0:8080');
    expect(ROUTE_REGISTER).toBe('register');
    expect(ROUTE_LOGIN).toBe('login');
    expect(ROUTE_RESEND_VERIFICATION).toBe('resend');
    expect(ROUTE_SEND_PASSWORD_RESET_EMAIL).toBe('password/email');
    expect(ROUTE_RESET_PASSWORD).toBe('password/reset');
});
