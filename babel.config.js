module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'react-native-reanimated/plugin'// reanimated
            ,'react-native-paper/babel'
            ,[
                'module-resolver',
                {
                    root: ['./src'], // absolute paths
                    alias: {
                        '@components': './src/components',
                        '@context': './src/context',
                        '@utils': './src/utils'
                    }
                }
            ]
        ], 
    };
};
