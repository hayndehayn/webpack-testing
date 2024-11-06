const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    devServer: {
        static: {
        directory: path.join(__dirname, "dist"),
        },
        compress: true,
        port: 9000,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude: /main\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.less$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource",
                generator: {
                filename: "images/[name][hash][ext]",
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                filename: "fonts/[name][hash][ext]",
                },
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: "./src/index.html",
        }),
        new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        }),
        new ESLintPlugin({
        extensions: ["js", "jsx", "ts", "tsx"],
        }),
        new BundleAnalyzerPlugin(),
    ],
    optimization: {
        minimizer: [new TerserPlugin({
            analyzerMode: 'static',
            openAnalyzer: true,
            generateStatsFile: true,
            statsFilename: 'webpack-stats.json'
        })],
    },
};
