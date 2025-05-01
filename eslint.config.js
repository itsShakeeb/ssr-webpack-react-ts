export default {
    "parser": "@typescript-eslint/parser",
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended"
    ],
    "plugins": ["react", "react-hooks", "@typescript-eslint", "prettier"],
    "env": {
      "browser": true,
      "node": true,
      "es6": true
    },
    "rules": {
      "prettier/prettier": ["error"],
      "react/react-in-jsx-scope": "off", 
      "@typescript-eslint/explicit-module-boundary-types": "off"
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
}
  