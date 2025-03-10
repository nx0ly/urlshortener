require("esbuild").build({
    entryPoints: ["server/index.ts"],
    bundle: true,
    outdir: "dist",
    platform: "node",
    target: "node18",
}).catch(() => process.exit(1));