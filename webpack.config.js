import { join } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export const entry = "./src/index.js";
export const output = {
    path: join(__dirname, "/dist"),
    filename: "index_bundle.js",
};
export const module = {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
            },
        },
        {
            test: /\.scss$/,
            use: [
                {
                    loader: "style-loader",
                },
                {
                    loader: "css-loader",
                },
                {
                    loader: "sass-loader",
                },
            ],
        },
    ],
};
export const plugins = [
    new HtmlWebpackPlugin({
        template: "./public/index.html",
    }),
];
