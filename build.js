require("esbuild").build({
    entryPoints: ["server/index.ts"],
    bundle: true,
    outdir: "dist",
    minify: true,
    treeShaking: true,
    platform: "node"
}).catch(() => process.exit(1));