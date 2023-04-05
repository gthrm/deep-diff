import terser from '@rollup/plugin-terser'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      name: '@gthrm/deep-diff'
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      name: '@gthrm/deep-diff'
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: '@gthrm/deep-diff'
    }
  ],
  plugins: [typescript({ tsconfig: './tsconfig.json' }), terser()]
}
