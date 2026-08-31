/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** Injected at build time from WEB3FORMS_ACCESS_KEY. Public by Web3Forms design. */
declare const __WEB3FORMS_ACCESS_KEY__: string
