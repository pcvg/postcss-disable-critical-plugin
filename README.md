# Postcss disable-critical-plugin

[PostCSS] Plugin for disabling [postcss-critical-css](https://www.npmjs.com/package/postcss-critical-css) on dev environments.

[PostCSS]: https://github.com/postcss/postcss

## Install

`npm install postcss-disable-critical-plugin`

## Example

#### postcss config

```javascript
/* eslint-env node */

let plugins = {
  'postcss-disable-critical-plugin': {}
};

if (process.env.NODE_ENV === 'production') {
  let fs = require('fs');
  let outputPath = "critical";

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, {recursive: true}, (err) => {
      if (err) throw err;
    });
  }

  plugins = {
    'postcss-flexbugs-fixes': {},
    'postcss-critical-css': {
      outputPath: outputPath,
      outputDest: "critical.css",
      preserve: false
    },
    'postcss-csso': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3
    }
  };
}

module.exports = {
  plugins: plugins
};

```

Initial code
```css
@critical common.css {
  .page-title {
    margin: 30px 0 28px;
    font-weight: 700;
    font-size: 36px;
  }
  
/* Unnecessary comment */

  @media (max-width: 767px) {
    .page-title {
      font-size: 26px;
      line-height: 1.1;
    }
  }
}
```

Result:

```css
  .page-title {
    margin: 30px 0 28px;
    font-weight: 700;
    font-size: 36px;
  }

  @media (max-width: 767px) {
    .page-title {
      font-size: 26px;
      line-height: 1.1;
    }
  }
```

## Usage

Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you already use PostCSS, add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-disable-critical-plugin'),
    require('autoprefixer')
  ]
}
```

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

[official docs]: https://github.com/postcss/postcss#usage
