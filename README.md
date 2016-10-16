Dron webpack-init
--
Utility for easy deploy and configure Webpack.

# Usage

Install Dron-cli, if you haven't.
```terminal
npm i dron-cli -g
```

Run command in target folder:
```terminal
dron webpack-init
```

Follow the prompt in command line.

# Equipment


## General
- Autocreating package.json if not exists
- Webpack config filename
- Multiple entry points
- Output configuration
- Autoinstall npm dependencies

## Webpack-dev-server

Optional. Creates index.html if using.

## Javascript processors

### Babel
The module supports configuration of Babel with presets:
- es2015
- stage-0/3

Plugins:
- transform-react-jsx
- add-module-exports

### CoffeeScript
__Not tested yet__

CoffeeScript's compiler supported with minimal settings

### TypeScript
__Not tested yet__

TypeScript's compiler supported with minimal settings.   


## Css

### Css-loader

Supported enabling/disabling. Disabling allows the use of [raw-loader](https://github.com/webpack/raw-loader).

### Style-loader

Support configuration of style injection into the page or posting as a separate file, powered by [ExtractTextPlugin](https://github.com/webpack/extract-text-webpack-plugin).

### Processors

#### PostCss

Supports plugins:
- postcss-import
- autoprefixer
- postcss-nested

#### Less

Supported with minimal settings

#### Scss

Supported with minimal settings

# Contribution

My everyday technology stack is Babel + Postcss + Jsx. I do not have enough time to test and create configurators for another stack. Your help to set up correctly and test TypeScript, CoffeeScript, Less, Scss, etc. is welcome.

The utility is written using API of Dron. To learn it, please, visit <http://github.com/morulus/dron>.

# Author

Vladimir Kalmykov <vladimirmorulus@gmail.com>

# License

MIT, 2016
