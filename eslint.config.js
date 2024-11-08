import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    name: 'global-variables',
    languageOptions: {
      globals: {
        kakao: 'readonly', // kakao를 전역으로 선언하여 ESLint가 인식할 수 있도록 함
      },
    },
  },
]
