const scriptUrl = 'https://script.google.com/macros/s/AKfycbw6ycjx5XAyHKCqW6kzMwWjOxuv7fdm-rBbKN9f1nhp7300R87hTNsQmZfSa49qeGlQ/exec';
const spreadsheetId = '1EanavJ2OodOmq8b1GagSj8baa-KF-o4mVme_Jlwmgxc';

async function run() {
    const payload = {
        action: 'readRegistryStats',
        data: {
            spreadsheetId: spreadsheetId
        }
    };
    console.log('Fetching sheet stats...');
    const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
    });
    const result = await response.json();
    console.log('Result:', JSON.stringify(result, null, 2));
}

run().catch(console.error);
