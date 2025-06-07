## 📆 React Inline Date Input

A lightweight and customizable inline `DD-MM-YYYY` date input component built for React, with full keyboard navigation support and accessibility.

## 📦 Installation

Install **react-inline-date-input** using your preferred package manager:

```bash
# Using npm
npm install react-inline-date-input

# Using Yarn
yarn add react-inline-date-input

# Using pnpm
pnpm add react-inline-date-input
```

### ⚙️ Options

| Prop                          | Type                                              | Default                                    | Description                                                                                                                      |
| ----------------------------- | ------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `className`                   | `string`                                          | `""`                                       | Custom CSS class for the main date input container.                                                                              |
| `defaultValue`                | `string`                                          | `""`                                       | Initial date value shown in the input on first render (format: `DD-MM-YYYY`).                                                    |
| `onChange`                    | `(dateString: string) => void`                    | —                                          | Callback function triggered when the date changes. Returns the updated date string.                                              |
| `minValidYear`                | `number`                                          | `1900`                                     | Minimum valid year that can be entered.                                                                                          |
| `maxValidYear`                | `number`                                          | `current year`                             | Maximum valid year that can be entered.                                                                                          |
| `emptyOnInvalid`              | `boolean`                                         | `true`                                     | If set to `true`, clears the input on invalid date; otherwise resets to the current date.                                        |
| `separator`                   | `string`                                          | `"-"`                                      | Separator used between day, month, and year (e.g. `/`, `-`).                                                                     |
| `onKeyDown`                   | `(event: React.KeyboardEvent) => void`            | —                                          | Custom handler for key down events (e.g. Enter key press).                                                                       |
| `triggerReset`                | `any`                                             | —                                          | A state value; whenever it changes, the input value resets to `defaultValue`.                                                    |
| `placeholder`                 | `{ day?: string; month?: string; year?: string }` | `{ day: "DD", month: "MM", year: "YYYY" }` | Customize individual placeholders for day, month, and year inputs.                                                               |
| `disabled`                    | `boolean`                                         | `false`                                    | Disables the date input if `true`.                                                                                               |
| `ariaLabel`                   | `string`                                          | —                                          | Provides an accessible label for screen readers.                                                                                 |
| `preventFocusingOutFromInput` | `boolean`                                         | `false`                                    | If `true`, prevents `Tab` key from shifting focus outside the date input fields. Useful for trapping focus within the component. |

## 🎯 Features

- ✍️ Inline editable `DD-MM-YYYY` format
- 🎹 Full keyboard navigation
- ♿ Accessible with `aria-label`
- 🛡 Customizable year range validation
- 🚫 Prevent tabbing out (focus trap)
- 🎨 Custom placeholders and separators

## 🛠️ Development

Clone the repo and run locally:

```bash
git clone https://github.com/your-username/react-inline-date-input.git
cd react-inline-date-input
npm install
npm run dev:demo
```

## 🧩 Contributing

Contributions, issues and feature requests are welcome!. Feel free to check the [issues page](https://github.com/hardik-143/react-inline-date-input/issues).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://thehardik.in//)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/thehardik143/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/__thehardik/)

## 📦 NPM Stats

[![npm version](https://img.shields.io/npm/v/react-inline-date-input.svg)](https://www.npmjs.com/package/react-inline-date-input)
[![npm downloads](https://img.shields.io/npm/dm/react-inline-date-input.svg)](https://www.npmjs.com/package/react-inline-date-input)
[![npm license](https://img.shields.io/npm/l/react-inline-date-input.svg)](https://www.npmjs.com/package/react-inline-date-input)
