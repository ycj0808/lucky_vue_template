var path = require("path");

//导出插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");
var package=require("./package.json");
var config=require("./config/config.js");
module.exports = {
  entry: {
    //为了兼容ie加入入口文件babel-polyfill
    app: ["./src/main.js"] //指定入口文件
  },
  output: {
    path: path.resolve(__dirname, config.rootDir), //指定输出目录
    libraryTarget: "umd"
  },
  stats: { children: false },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: "css-loader",
          fallback: "style-loader"
        })
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              loaders: {
                css: ExtractTextPlugin.extract({
                  use: "css-loader",
                  fallback: "vue-style-loader"
                }),
                scss: ["style-loader", "css-loader", "sass-loader"]
              }
            }
          },
          {
            loader: "iview-loader",
            options: {
              prefix: false
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
        //include: [path.resolve(__dirname, "src"), path.resolve(__dirname, "node_modules/iview/src")]
      },

      {
        test: /iview.src.*?js$/,
        loader: "babel-loader"
      },

      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-resources-loader",
            options: {
              resources: [path.resolve(__dirname, "./src/base.less")]
            }
          }
        ]
      },
      // 对sass或者scss文件支持
      {
        test: /\.s[a|c]ss$/,
        loaders: [
          "style-loader",
          "css-loader",
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: [path.resolve(__dirname, "./src/base.scss")]
            }
          }
        ]
      },
      {
        //此处配置为iview的注意点，如果不配置的话 无法再Js文件中加载iview.css文件；其次如果使用url-loader无法加载的话，会使用file-loader进行文件加载
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: "url-loader?limit=1024",
        options: {
          limit: 10000,
          name: "img/[name].[hash].[ext]"
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "media/[name].[hash].[ext]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "fonts/[name].[hash].[ext]"
        }
      },
      {
        test: /\.(html|tpl)$/,
        loader: "html-loader"
      }
    ]
  },
  plugins: [
   
  ],
  resolve: {
    extensions: [".js", ".vue", ".json"],
    //设置别名
    alias: {
      vue: "vue/dist/vue.esm.js",
      "@": path.join(__dirname, "src")
    }
  }
};
