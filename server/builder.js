const fs = require('fs');
const path = require('path');

function loadHTML(url) {
    return new Promise((resolve, reject) => {
        fs.readFile(url, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

async function buildHTML() {
    const buildDir = path.join(__dirname,'..', 'build');

    // Check if build directory exists, create if not
    if (!fs.existsSync(buildDir)) {
        fs.mkdirSync(buildDir);
    }

    try {
        const mainHTML = await loadHTML('index.html');
        const headContent = await loadHTML('head.html');
        // const headerContent = await loadHTML('header.html');
        // const menuContent = await loadHTML('menu.html');
        // const footerContent = await loadHTML('footer.html');

        const builtHTML = mainHTML
            .replace('<head id="head"></head>', headContent)
            // .replace('<!-- Header content will be loaded here -->', headerContent)
            // .replace('<!-- Menu content will be loaded here -->', menuContent)
            // .replace('<!-- Footer content will be loaded here -->', footerContent);

        fs.writeFile(path.join(buildDir,'index.html') , builtHTML, 'utf8', err => {
            if (err) {
                console.error('Error writing HTML file:', err);
            } else {
                console.log('HTML file built successfully!');
            }
        });
    } catch (err) {
        console.error('Error loading HTML files:', err);
    }
}

buildHTML();
