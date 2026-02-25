# Tabby Theme Colors Configuration

## Overview

Tabby has two distinct theming layers:

1. **Application Theme (UI chrome)** -- controls the window frame, tabs, settings panels, etc.
2. **Terminal Color Scheme** -- controls terminal emulator colors (foreground, background, cursor, 16 ANSI colors).

This document focuses primarily on terminal color schemes.

## Configuration File Location

Tabby stores its configuration in `config.yaml`:

| Platform  | Path                                       |
| --------- | ------------------------------------------ |
| Windows   | `%APPDATA%/Tabby/config.yaml`              |
| macOS     | `~/Library/Application Support/tabby/config.yaml` |
| Linux     | `~/.config/tabby/config.yaml`              |

The location can be overridden with the `TABBY_CONFIG_DIRECTORY` environment variable. The file is also accessible from **Settings > Config file** tab within Tabby.

## TerminalColorScheme Interface

The TypeScript interface that defines a color scheme (from `tabby-terminal/src/api/interfaces.ts`):

```typescript
export interface TerminalColorScheme {
  name: string
  foreground: string
  background: string
  cursor: string
  colors: string[]        // exactly 16 ANSI colors
  selection?: string
  selectionForeground?: string
  cursorAccent?: string
}
```

### Required Properties

| Property     | Description                        | Example            |
| ------------ | ---------------------------------- | ------------------ |
| `name`       | Identifier string for the scheme   | `"My Theme"`       |
| `foreground` | Text color                         | `"#cacaca"`        |
| `background` | Background color                   | `"#171717"`        |
| `cursor`     | Cursor color                       | `"#bbbbbb"`        |
| `colors`     | Array of 16 ANSI SGR color strings | (see below)        |

### Optional Properties

| Property              | Description                    |
| --------------------- | ------------------------------ |
| `selection`           | Selection highlight color      |
| `selectionForeground` | Text color within selection    |
| `cursorAccent`        | Accent color for cursor        |

### The `colors` Array (16 ANSI Colors)

The `colors` array must contain exactly 16 entries in standard ANSI SGR order:

| Index | Name          | Index | Name            |
| ----- | ------------- | ----- | --------------- |
| 0     | black         | 8     | bright black    |
| 1     | red           | 9     | bright red      |
| 2     | green         | 10    | bright green    |
| 3     | yellow        | 11    | bright yellow   |
| 4     | blue          | 12    | bright blue     |
| 5     | magenta       | 13    | bright magenta  |
| 6     | cyan          | 14    | bright cyan     |
| 7     | white         | 15    | bright white    |

## Defining Custom Color Schemes in config.yaml

Custom schemes go under `terminal.customColorSchemes[]`:

```yaml
terminal:
  customColorSchemes:
    - name: "My Custom Theme"
      foreground: '#eceff1'
      background: '#263238'
      cursor: '#FFCC00'
      cursorAccent: null
      selection: null
      colors:
        - '#000000'    # 0  black
        - '#D62341'    # 1  red
        - '#9ECE58'    # 2  green
        - '#FAED70'    # 3  yellow
        - '#396FE2'    # 4  blue
        - '#BB80B3'    # 5  magenta
        - '#2DDAFD'    # 6  cyan
        - '#d0d0d0'    # 7  white
        - '#555555'    # 8  bright black
        - '#FF7272'    # 9  bright red
        - '#C4F68D'    # 10 bright green
        - '#FEFBA9'    # 11 bright yellow
        - '#7AA6F6'    # 12 bright blue
        - '#D7A0D7'    # 13 bright magenta
        - '#6EEFFE'    # 14 bright cyan
        - '#FFFFFF'    # 15 bright white
```

After adding a custom scheme, select it in **Settings > Color Scheme**.

## Built-in Default Color Schemes

### Tabby Default (Dark)

```yaml
name: "Tabby Default"
foreground: '#cacaca'
background: '#171717'
cursor: '#bbbbbb'
colors:
  - '#000000'
  - '#ff615a'
  - '#b1e969'
  - '#ebd99c'
  - '#5da9f6'
  - '#e86aff'
  - '#82fff7'
  - '#dedacf'
  - '#313131'
  - '#f58c80'
  - '#ddf88f'
  - '#eee5b2'
  - '#a5c7ff'
  - '#ddaaff'
  - '#b7fff9'
  - '#ffffff'
```

### Tabby Default Light

```yaml
name: "Tabby Default Light"
foreground: '#4d4d4c'
background: '#ffffff'
cursor: '#4d4d4c'
colors:
  - '#000000'
  - '#c82829'
  - '#718c00'
  - '#eab700'
  - '#4271ae'
  - '#8959a8'
  - '#3e999f'
  - '#ffffff'
  - '#000000'
  - '#c82829'
  - '#718c00'
  - '#eab700'
  - '#4271ae'
  - '#8959a8'
  - '#3e999f'
  - '#ffffff'
```

## Community Color Schemes (XRDB Format)

Tabby ships with ~190 community color schemes in `tabby-community-color-schemes/schemes/`. These use the XRDB/Xresources format:

```
*.foreground: #f8f8f2
*.background: #1e1f29
*.cursorColor: #bbbbbb

*.color0:  #000000
*.color8:  #555555
*.color1:  #ff5555
*.color9:  #ff5555
*.color2:  #50fa7b
*.color10: #50fa7b
*.color3:  #f1fa8c
*.color11: #f1fa8c
*.color4:  #bd93f9
*.color12: #bd93f9
*.color5:  #ff79c6
*.color13: #ff79c6
*.color6:  #8be9fd
*.color14: #8be9fd
*.color7:  #bbbbbb
*.color15: #ffffff
```

Key mapping from XRDB to `TerminalColorScheme`:

| XRDB Key         | Maps to       |
| ----------------- | ------------- |
| `*.foreground`    | `foreground`  |
| `*.background`    | `background`  |
| `*.cursorColor`   | `cursor`      |
| `*.color0`..`*.color15` | `colors[]` |

The format also supports `#define` variables:

```
#define myRed #ff0000
*.color1: myRed
*.color9: myRed
```

## Terminal Background Behavior

The `terminal.background` setting in config controls which background is used:

| Value           | Behavior                                              |
| --------------- | ----------------------------------------------------- |
| `"theme"`       | Uses the application theme's background               |
| `"colorScheme"` | Uses the color scheme's `background` property         |

Set to `"colorScheme"` (labeled "From color scheme" in Settings > Appearance) to see the color scheme's background color.

## Appearance Settings

Additional appearance settings in `config.yaml`:

```yaml
appearance:
  theme: "Follow the color scheme"  # or a specific theme name
  frame: thin                       # native | thin | full
  opacity: 1.0                      # 0.4 to 1.0
  vibrancy: false                   # macOS/Windows only
  vibrancyType: 'blur'
  colorSchemeMode: 'dark'           # dark | light
  css: '/* custom CSS overrides */'
```

## Per-Profile Color Schemes

SSH and Serial profiles support per-profile color schemes via the **Colors tab** in profile settings. In the config YAML, this is stored as the `terminalColorScheme` property on each profile.

## Distributing Themes

Tabby themes can be distributed in two ways: as YAML snippets (color schemes only) or as npm plugins (color schemes, application themes, or both).

### Choosing a Distribution Method

| What you want to share | Method | Complexity |
| ---------------------- | ------ | ---------- |
| Terminal color palette only | YAML snippet | None (no build toolchain) |
| Terminal color palette only | npm plugin (`TerminalColorSchemeProvider`) | Low |
| App UI chrome styling | npm plugin (`Theme`) | Medium |
| Both app UI + terminal colors | npm plugin (combined) | Medium |

### Method 1: Distribute as YAML Snippets (No Plugin Required)

The simplest approach. Distribute YAML files that users paste into their `config.yaml`. This is how [catppuccin/tabby](https://github.com/catppuccin/tabby) distributes their themes.

Create a YAML file per color scheme:

```yaml
name: Catppuccin Mocha
foreground: '#cdd6f4'
background: '#1e1e2e'
cursor: '#f5e0dc'
cursorAccent: null
selection: null
colors:
  - '#45475a'
  - '#f38ba8'
  - '#a6e3a1'
  - '#f9e2af'
  - '#89b4fa'
  - '#f5c2e7'
  - '#94e2d5'
  - '#bac2de'
  - '#585b70'
  - '#f38ba8'
  - '#a6e3a1'
  - '#f9e2af'
  - '#89b4fa'
  - '#f5c2e7'
  - '#94e2d5'
  - '#a6adc8'
```

Users install by copying the contents into `terminal.customColorSchemes[]` in their `config.yaml`, then selecting the scheme in **Settings > Color Scheme**.

### Method 2: Distribute as an npm Plugin

Publishing to npm makes the theme installable from Tabby's built-in **Settings > Plugins** UI. Tabby's plugin manager discovers plugins by searching the npm registry for packages with the `tabby-plugin` keyword.

#### How the Plugin Marketplace Works

The plugin manager queries:

```
https://registry.npmjs.com/-/v1/search?text=keywords%3Atabby-plugin&size=250
```

To appear in the marketplace, a package **must**:

- Be published to the public npm registry
- Have a `name` prefixed with `tabby-` (e.g., `tabby-theme-winternacht`)
- Include `"tabby-plugin"` in `keywords`

#### Project Structure

```
tabby-theme-example/
  src/
    index.ts          # Angular module entry point
    colorSchemes.ts   # Color scheme definitions (if providing color schemes)
    theme.scss        # SCSS stylesheet (if providing an app theme)
  package.json
  tsconfig.json
  webpack.config.js
```

#### `package.json`

```json
{
  "name": "tabby-theme-example",
  "version": "1.0.0",
  "description": "A custom theme for Tabby terminal",
  "keywords": [
    "tabby-plugin"
  ],
  "main": "dist/index.js",
  "scripts": {
    "build": "webpack --progress --color",
    "watch": "webpack --progress --color --watch",
    "prepublishOnly": "npm run build"
  },
  "files": [
    "dist"
  ],
  "peerDependencies": {
    "@angular/core": "^15",
    "tabby-core": "*",
    "tabby-terminal": "*"
  },
  "devDependencies": {
    "typescript": "^4.9.4",
    "webpack": "^5.75.0",
    "ts-loader": "^9",
    "css-loader": "^6",
    "sass-loader": "^13",
    "to-string-loader": "^1",
    "sass": "^1"
  }
}
```

#### `webpack.config.js`

```javascript
const path = require('path')

module.exports = {
  target: 'node',
  entry: 'src/index.ts',
  devtool: 'source-map',
  mode: 'development',
  context: __dirname,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    pathinfo: true,
    libraryTarget: 'umd',
  },
  resolve: {
    modules: ['.', 'src', 'node_modules'],
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['to-string-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  externals: [
    /^@angular\/.*/,
    /^@ng-bootstrap\/.*/,
    /^tabby-.*/,
  ],
}
```

Key points:

- `target: 'node'` -- Tabby plugins run in Node/Electron context
- `libraryTarget: 'umd'` -- required for Tabby's module loader
- `externals` -- Angular, ng-bootstrap, and `tabby-*` packages are provided by Tabby at runtime

#### `tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "module": "commonjs",
    "target": "es2016",
    "declaration": false,
    "noImplicitAny": false,
    "removeComments": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": ["dom", "es2015", "es7"]
  },
  "exclude": ["node_modules", "dist"]
}
```

`emitDecoratorMetadata` and `experimentalDecorators` are required for Angular's dependency injection.

#### Pattern A: Color Scheme Provider Plugin

`src/colorSchemes.ts`:

```typescript
import { Injectable } from '@angular/core'
import { TerminalColorSchemeProvider, TerminalColorScheme } from 'tabby-terminal'

@Injectable()
export class MyColorSchemes extends TerminalColorSchemeProvider {
  async getSchemes(): Promise<TerminalColorScheme[]> {
    return [
      {
        name: 'My Scheme',
        foreground: '#d8dee9',
        background: '#2e3440',
        cursor: '#d8dee9',
        colors: [
          '#3b4252', '#bf616a', '#a3be8c', '#ebcb8b',
          '#81a1c1', '#b48ead', '#88c0d0', '#e5e9f0',
          '#373e4d', '#94545d', '#809575', '#b29e75',
          '#68809a', '#8c738c', '#6d96a5', '#aeb3bb',
        ],
      },
    ]
  }
}
```

`src/index.ts`:

```typescript
import { NgModule } from '@angular/core'
import { TerminalColorSchemeProvider } from 'tabby-terminal'
import { MyColorSchemes } from './colorSchemes'

@NgModule({
  providers: [
    { provide: TerminalColorSchemeProvider, useClass: MyColorSchemes, multi: true },
  ],
})
export default class MyColorSchemesModule {}
```

#### Pattern B: Application Theme Plugin

Application themes control the UI chrome (tabs, settings, window frame).

`src/theme.scss`:

```scss
// Override Bootstrap 4 variables
$body-bg: #010101;
$body-color: #aaa;

// Import Bootstrap
@import '~bootstrap/scss/bootstrap.scss';

// Custom overrides
// ...
```

`src/index.ts`:

```typescript
import { NgModule, Injectable } from '@angular/core'
import { Theme } from 'tabby-core'

@Injectable()
class MyTheme extends Theme {
  name = 'My Theme'
  css = require('./theme.scss')
  terminalBackground = '#010101'
}

@NgModule({
  providers: [
    { provide: Theme, useClass: MyTheme, multi: true },
  ],
})
export default class MyThemeModule {}
```

The `Theme` class properties:

| Property                   | Type       | Description                              |
| -------------------------- | ---------- | ---------------------------------------- |
| `name`                     | `string`   | Theme identifier                         |
| `css`                      | `string`   | Complete CSS stylesheet                  |
| `terminalBackground`       | `string`   | Terminal background color                |
| `macOSWindowButtonsInsetX` | `number?`  | macOS window button horizontal inset     |
| `macOSWindowButtonsInsetY` | `number?`  | macOS window button vertical inset       |
| `followsColorScheme`       | `boolean?` | Whether it adapts to OS dark/light mode  |

#### Pattern C: Combined Theme + Color Scheme Plugin

Provide both `Theme` and `TerminalColorSchemeProvider` in a single module:

```typescript
import { NgModule, Injectable } from '@angular/core'
import { Theme } from 'tabby-core'
import { TerminalColorSchemeProvider } from 'tabby-terminal'
import { MyColorSchemes } from './colorSchemes'

@Injectable()
class MyTheme extends Theme {
  name = 'My Theme'
  css = require('./theme.scss')
  terminalBackground = '#282A36'
}

@NgModule({
  providers: [
    { provide: Theme, useClass: MyTheme, multi: true },
    { provide: TerminalColorSchemeProvider, useClass: MyColorSchemes, multi: true },
  ],
})
export default class MyThemeModule {}
```

#### Development Workflow

```bash
# Install dependencies
npm install

# Auto-rebuild on changes
npm run watch

# Launch Tabby with the plugin loaded from the current directory
TABBY_PLUGINS=$(pwd) tabby --debug

# Press Ctrl-R (or Cmd-R on macOS) to reload plugins without restarting
```

#### Publishing to npm

```bash
# 1. Build
npm run build

# 2. Test locally
TABBY_PLUGINS=$(pwd) tabby --debug

# 3. Publish (prepublishOnly runs the build automatically)
npm publish
```

The package will appear in Tabby's **Settings > Plugins** within minutes.

### How Users Install Themes

| Method | Steps |
| ------ | ----- |
| Plugin Manager UI | Settings > Plugins > search for the plugin > Install > restart Tabby |
| YAML snippets | Paste into `terminal.customColorSchemes[]` in `config.yaml` > select in Settings > Color Scheme |
| Development mode | `TABBY_PLUGINS=$(pwd) tabby --debug` |

### Community Examples

| Project | Type | Distribution | Repository |
| ------- | ---- | ------------ | ---------- |
| tabby-theme-hype | App theme (CSS) | npm plugin | [Eugeny/tabby-theme-hype](https://github.com/Eugeny/tabby-theme-hype) |
| tabby-theme-snazzy | Theme + Color Scheme | npm plugin | [feluelle/tabby-theme-snazzy](https://github.com/feluelle/tabby-theme-snazzy) |
| tabby-colors-noctis | Color Schemes only | npm plugin | [aaronhuggins/tabby-colors-noctis](https://github.com/aaronhuggins/tabby-colors-noctis) |
| catppuccin/tabby | Color Schemes | YAML snippets | [catppuccin/tabby](https://github.com/catppuccin/tabby) |

## References

- [Color scheme format -- Eugeny/tabby Wiki](https://github.com/Eugeny/tabby/wiki/Color-scheme-format)
- [TerminalColorScheme interface -- tabby-terminal API docs](https://docs.tabby.sh/terminal/interfaces/TerminalColorScheme.html)
- [Theme class -- tabby-core API docs](https://docs.tabby.sh/classes/Theme.html)
- [Config file -- Eugeny/tabby Wiki](https://github.com/Eugeny/tabby/wiki/Config-file)
- [Tabby GitHub repository](https://github.com/Eugeny/tabby)
- [tabby-theme-hype (reference theme plugin)](https://github.com/Eugeny/tabby-theme-hype)
- [Catppuccin theme for Tabby](https://github.com/catppuccin/tabby)
