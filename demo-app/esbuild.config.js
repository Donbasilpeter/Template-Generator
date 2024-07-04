const esbuild = require('esbuild');

async function build() {
    // Create a build context
    const ctx = await esbuild.context({
        entryPoints: ['./src/main.js'], // your entry point
        bundle: true,
        outfile: 'dist/main.js', // output file
        minify: true,
        loader: { '.js': 'jsx' }
    });

    await ctx.rebuild();
    await ctx.watch();
}

build().catch((err) => {
    console.error(err);
    process.exit(1);
});
