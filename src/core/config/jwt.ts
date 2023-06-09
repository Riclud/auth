export const JWT = () => ({
    ACCESS: {
        key: process.env.JWT_ACCESS_KEY,
        time: process.env.JWT_ACCESS_TIME,
    },
    REFRESH: {
        key: process.env.JWT_REFRESH_KEY,
        time: process.env.JWT_REFRESH_TIME,
    },
})