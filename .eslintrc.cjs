module.exports = {
  root: true,
  extends: ['plugin:@persagy2/level3', './.eslintrc-auto-import.json'],
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  globals: {
    defineEmits: true,
    document: true,
    localStorage: true,
    GLOBAL_VAR: true,
    window: true,
    defineProps: true,
    defineExpose: true
  }
}
