import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

interface AppProps {
    initialState?: any;
}

const App: React.FC<AppProps> = ({ initialState = {} }) => {
    const [data, setData] = useState(initialState.data || { message: 'Loading...' });

    useEffect(() => {
        // Client-side data fetching if needed
        if (!initialState.data) {
            fetch('/api/data')
                .then((response) => response.json())
                .then((result) => setData(result))
                .catch((error) => console.error('Error fetching data:', error));
        }
    }, [initialState.data]);

    return (
        <div className="app">
            <header>
                <nav>
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/about">About</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <main></main>
            <footer>
                <p>© {new Date().getFullYear()} - React SSR with Express and TypeScript</p>
            </footer>
        </div>
    );
};

export default App;
