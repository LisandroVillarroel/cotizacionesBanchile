
// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Activa la integración recomendada de Prettier para flat config:
// - habilita la regla `prettier/prettier`
// - aplica `eslint-config-prettier` para evitar conflictos
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

// (Opcional) Si quieres añadir explícitamente el "flat" de eslint-config-prettier
// como último bloque para garantizar que desactiva cualquier regla conflictiva:
// import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default tseslint.config(
  // Ignora carpetas de salida / dependencias
  {
    ignores: ['dist/', 'node_modules/', 'coverage/', '**/*.d.ts'],
  },

  // Reglas base de JavaScript recomendadas por ESLint
  js.configs.recommended,

  // Entorno (por ejemplo, navegador)
  {
    languageOptions: {
      globals: { ...globals.browser },
    },
  },

  // Bloque para TypeScript
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [tseslint.configs.recommended],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // Si usas project references, puedes usar: project: true
        // o indicar explícitamente el tsconfig:
        // project: './tsconfig.json'
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // Ejemplo: ajusta reglas TS a tu gusto
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Bloque para JavaScript (si convives con JS)
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    // Si no necesitas type-check en JS:
    extends: [tseslint.configs.disableTypeChecked],
    rules: {},
  },

  // *** Integración recomendada de Prettier (debe ir cerca del final) ***
  eslintPluginPrettierRecommended,

  // Si decides importar explícitamente el flat de eslint-config-prettier, colócalo al final:
  // eslintConfigPrettier,
);
