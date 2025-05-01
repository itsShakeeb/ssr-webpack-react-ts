import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  target: 'node',
  entry: path.resolve('src/server/index.tsx'),
  externalsPresets: { node: true },
  externals: [nodeExternals({
    importType: 'module' 
  })],
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: 'server.js',
    publicPath: '/static/',
    chunkFormat: 'module'
  },
  experiments: {
    outputModule: true // Enable ESM output
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.server.json'
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          emit: false,
          filename: 'assets/[hash][ext][query]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    alias: {
      '@client': path.resolve(__dirname, 'src/client'),
      '@server': path.resolve(__dirname, 'src/server'),
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.BROWSER': JSON.stringify(false)
    })
  ],
  optimization: {
    minimize: false
  }
};