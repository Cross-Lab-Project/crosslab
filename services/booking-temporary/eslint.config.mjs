import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: [
      'src/clients/**/*',
      'src/generated/**/*',
      'src/database/migrations/**/*',
      'test/generated/**/*',
      'dist/**/*',
      'lib/**/*',
      'app/**/*',
      'docs/**/*',
      'http-dist/**/*',
      '*.js',
    ],
  },{
    rules: {
      'max-len': [
        'error',
        {
          code: 150,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  }
);
