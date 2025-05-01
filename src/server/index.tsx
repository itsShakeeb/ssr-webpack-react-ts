import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../client/App';
import { createRenderer } from './renderer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();
const PORT = process.env.PORT || 8000;

// Serve static files
app.use('/static', express.static(path.resolve(__dirname, '../client')));

// API endpoints
app.get('/version', (req, res) => {
    res.status(200).send({
        version: '0.0.1',
    });
});

// Create HTML renderer
const renderer = createRenderer(path.resolve('dist/client/asset-manifest.json'));

// Handle all page requests
app.use(/.*/, async (req, res) => {
    try {
        // Initial data for SSR
        const initialState = {
            data: {
                message: `Server-rendered at ${new Date().toISOString()}`,
            },
        };

        // Render the React app to string
        const appHtml = renderToString(
            <StaticRouter location={req.url}>
                <App initialState={initialState} />
            </StaticRouter>
        );

        // Generate the full HTML response
        const html = renderer(appHtml, initialState);

        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    } catch (error) {
        console.error('Rendering error:', error);
        res.status(500).send('Server error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
