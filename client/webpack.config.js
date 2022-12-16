const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
    template: "./public/index.html",
    filename: "./index.html"
});
module.exports = (env, argv) => {
    return {
        entry: "./src/index.tsx",
        output: {
            path: path.join(__dirname, 'dist'),
            filename: "bundle.js"
        },
        plugins: [htmlPlugin],
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "ts-loader",
                    }
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    loader: "file-loader",
                    options: { name: '/static/[name].[ext]' }
                }
            ]
        },
        resolve: {
            extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
        }
    };
};
