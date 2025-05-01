import fs from 'fs';

interface ManifestAssets {
    'main.js': string;
    'main.css'?: string;
}

export function createRenderer(manifestPath: string) {
    // Read and parse the asset manifest file
    let assets: ManifestAssets = { 'main.js': '/static/js/main.js' };

    try {
        const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
        const manifest = JSON.parse(manifestContent);
        assets = {
            'main.js': manifest['main.js'] || '/static/js/main.js',
            'main.css': manifest['main.css'],
        };
    } catch (error) {
        console.warn('Could not read asset manifest:', error);
        console.warn('Using default asset paths');
    }

    // Return a function that renders the full HTML
    return (appHtml: string, initialState: any) => {
        const cssLinks = assets['main.css']
            ? `<link rel="stylesheet" href="${assets['main.css']}">`
            : '';

        return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>React SSR with Express and TypeScript</title>
          ${cssLinks}
        </head>
        <body>
          <div id="root">${appHtml}</div>
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
          <script type="module" src="${assets['main.js']}"></script>
        </body>
      </html>
    `;
    };
}
