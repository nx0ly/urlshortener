require("esbuild").build({
    entryPoints: ["server/index.ts"],
    bundle: true,
    outdir: "dist",
    platform: "node"
}).catch(() => process.exit(1));