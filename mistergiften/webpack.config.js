module.exports = {
    // ... other webpack configurations
    resolve: {
        fallback: {
            "util": require.resolve("util/"),
        },
    },
};