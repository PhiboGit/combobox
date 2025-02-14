import js from '@eslint/js';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import checkFile from 'eslint-plugin-check-file';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import boundaries from 'eslint-plugin-boundaries';
import tailwind from "eslint-plugin-tailwindcss";

export default tseslint.config(
  js.configs.recommended, // copy eslint recommended rules
  tseslint.configs.strictTypeChecked, // copy typescript recommended rules
  importPlugin.flatConfigs.recommended, // https://www.npmjs.com/package/eslint-plugin-import
  reactPlugin.configs.flat.recommended, // https://www.npmjs.com/package/eslint-plugin-react
  reactPlugin.configs.flat['jsx-runtime'], // Add this if you are using React 17+
  ...tailwind.configs["flat/recommended"],
  { ignores: ['node_modules', 'dist', '*.config.{js,cjs,ts}'] }, // ignore linting files
  {
    // typescript parser; https://typescript-eslint.io/getting-started/typed-linting/
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    settings: {
      // React version not specified in eslint-plugin-react settings.
      react: {
        version: 'detect'
      },
      // https://www.npmjs.com/package/eslint-plugin-import#typescript
      'import/resolver': {
        typescript: {},
      },
    },
    plugins: {
      'react-compiler': reactCompiler,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      reactPlugin,
    },
    rules: {
      'react-compiler/react-compiler': 'error',
      ...reactHooks.configs.recommended.rules,
      'react/hook-use-state': ['warn'],
      'react/prop-types': 'off', // https://github.com/shadcn-ui/ui/issues/120#issuecomment-1868274325
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          "allowNumber": true
        }
      ],
      
      'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'object',
            ],
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true },
          },
        ],
    },
  },
  {
    // eslint-plugin-boundaries for enforcing module boundaries
    plugins: {
      boundaries,
    },
    settings: {
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        {
          mode: 'full',
          type: 'shared',
          pattern: [
            'src/assets/**/*',
            'src/components/**/*',
            'src/hooks/**/*',
            'src/lib/**/*',
            'src/types/**/*',
            'src/utils/**/*',
          ]
        },
        {
          mode: 'full',
          type: 'feature',
          capture: ['featureName'],
          pattern: ['src/features/*/**/*']
        },
        {
          mode: 'full',
          type: 'app',
          capture: ['_', 'fileName'],
          pattern: ['src/app/**/*']
        },
        {
          mode: 'full',
          type: 'neverImport',
          capture: ['fileName'],
          pattern: ['src/*']
        },
      ]
    },
    rules: {
      'boundaries/no-unknown': ['error'],
      'boundaries/no-unknown-files': ['error'],
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: ['shared'],
              allow: ['shared']
            },
            {
              from: ['feature'],
              allow: [
                'shared',
                ['feature', { 'featureName': '${from.featureName}' }]
              ]
            },
            {
              from: ['app'],
              allow: ['shared', 'feature', 'app']
            },
            {
              from: [['neverImport', { 'fileName': 'main.tsx' }]],
              allow: ['app', ['neverImport', { 'fileName': '*.css' }]]
            }
          ]
        }
      ]
    }
  },
  {
    // naming rules files and folders
    files: ['src/**/*'],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{jsx,tsx}': 'KEBAB_CASE',
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          '**/*': 'KEBAB_CASE',
        },
      ],
    },
  },
  eslintPluginPrettier, // prettier recommended rules always last
);
