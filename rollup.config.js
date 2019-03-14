import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

import pkg from './package.json'

const banner = `/**
 * ${pkg.name} - @version ${pkg.version}
 * Copyright (C) 2019 The Trustees of Indiana University
 * SPDX-License-Identifier: ${pkg.license}
 */
`

export default {
  input: 'src/index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      externalHelpers: false,
      runtimeHelpers: true,
      presets: [
        '@babel/preset-env'
      ]
    }),
    resolve({
      browser: true
    }),
    commonjs()
  ],
  output: [
    {
      banner,
      file: pkg.main,
      format: 'cjs'
    },
    {
      banner,
      file: pkg.module,
      format: 'esm'
    },
    {
      banner,
      file: pkg.browser,
      format: 'iife',
      name: 'WhenElements'
    }
  ]
}
