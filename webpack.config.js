const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./src/main.ts",
    mode: 'development',
    output: {
        filename: "main.[hash].js",
        chunkFilename: '[name].[hash].js',
        path: __dirname + "/dist"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                use: "ts-loader" 
            },
            {
                test: /\.(png|jpg|gif|mp3)$/,
                use: 'file-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Crayon Caper Rescue',
            template: 'index.html',
            filename: './index.html'
        })
    ]
};
