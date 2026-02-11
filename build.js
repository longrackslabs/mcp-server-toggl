import { build } from 'esbuild';
import { readFileSync } from 'fs';

async function main() {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));

  await build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    target: 'node18',
    format: 'esm',
    outfile: 'dist/index.js',
    define: {
      __VERSION__: JSON.stringify(pkg.version),
      'process.env.NODE_ENV': JSON.stringify('production')
    },
    banner: {
      js: `// Toggl Track MCP Server v${pkg.version}\n`
    },
    external: [
      'url',
      'http',
      'https',
      'stream',
      'zlib',
      'util',
      'events',
      'buffer',
      'querystring',
    ]
  });
}

main().catch(console.error);
