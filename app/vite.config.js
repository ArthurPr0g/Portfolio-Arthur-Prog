import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { build as rolldownBuild } from 'rolldown'

const arq = (p) => fileURLToPath(new URL(p, import.meta.url))
const enxuto = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim()

// Embute no <head> os tokens da marca, o CSS do loader e o próprio loader
// (src/brand/loaders/boot.js, empacotado como IIFE). O HTML pré-renderizado
// aparece antes do bundle; o loader precisa rodar antes dele.
// Páginas com <meta name="ps-loader" content="off"> recebem só os tokens.
function loaderNoHead() {
  return {
    name: 'ps-loader-no-head',
    async transformIndexHtml(html) {
      const css = enxuto(fs.readFileSync(arq('./src/brand/tokens.css'), 'utf8') + fs.readFileSync(arq('./src/brand/loaders/boot.css'), 'utf8'))
      const tags = [{ tag: 'style', children: css, injectTo: 'head' }]
      if (!/name="ps-loader" content="off"/.test(html)) {
        const out = await rolldownBuild({
          input: arq('./src/brand/loaders/boot.js'),
          write: false,
          logLevel: 'silent',
          output: { format: 'iife', minify: true },
        })
        tags.push({ tag: 'script', children: out.output[0].code, injectTo: 'head' })
      }
      return tags
    },
  }
}

// CSS sem bloquear a pintura: o navegador não desenha nada (nem o loader) até as
// folhas de estilo chegarem. O loader já esconde o conteúdo até o CSS carregar
// (é uma das tarefas do progresso), então elas podem carregar em paralelo.
// Sem JavaScript, o <noscript> aplica o CSS normalmente.
function cssSemBloqueio() {
  return {
    name: 'ps-css-sem-bloqueio',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        if (/name="ps-loader" content="off"/.test(html)) return html
        const copias = []
        const novo = html.replace(/<link ([^>]*?)rel="stylesheet"([^>]*)>/g, (tag, antes, depois) => {
          copias.push(tag)
          return `<link ${antes}rel="stylesheet" media="print" onload="this.media='all'"${depois}>`
        })
        return novo.replace('</head>', `<noscript>${copias.join('')}</noscript>\n  </head>`)
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), loaderNoHead(), cssSemBloqueio()],
  build: isSsrBuild
    ? {}
    : {
        rollupOptions: {
          input: {
            main: arq('./index.html'),
            // Demonstração dos loaders "Sistema" e "Documento" (sem link no menu).
            loaders: arq('./dev/loaders/index.html'),
          },
        },
      },
}))
