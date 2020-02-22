export default {
    post: jest.fn(() => Promise.resolve({ data: {} })),
    defaults: {
        headers: {
            common: {
                'X-CSRF-TOKEN': null
            }
        }
    }
};
