module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'], // Necesario si usas Expo
        plugins: ['react-native-reanimated/plugin'], // Configuración para reanimated
    };
};
