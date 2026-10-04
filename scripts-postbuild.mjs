// Turn the inlined <script type="module"> in <head> into a classic script at the end of <body>.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
let html = readFileSync('dist/index.html', 'utf8')
const re = /<script type="module"[^>]*>([\s\S]*?)<\/script>/
const m = html.match(re)
if (!m) throw new Error('inline module script not found')
const code = m[1]
html = html.replace(re, '')
// split via function replacer so "$" sequences in the bundle are not interpreted
html = html.replace('</body>', () => `<script>${code}</script>\n</body>`)
mkdirSync('share', { recursive: true })
writeFileSync('share/chimu-prototype.html', html)
console.log('wrote share/chimu-prototype.html', (html.length / 1024).toFixed(0) + ' kB')
