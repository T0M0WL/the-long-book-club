const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const distDir = path.resolve(__dirname, '../dist');
const gitDir = path.join(distDir, '.git');
const repoUrl = 'https://github.com/T0M0WL/the-long-book-club.git';

if (!fs.existsSync(distDir)) {
    console.error('❌ dist/ directory does not exist. Run npm run build first.');
    process.exit(1);
}

try {
    if (fs.existsSync(gitDir)) {
        fs.rmSync(gitDir, { recursive: true, force: true });
    }
    console.log('📦 Preparing deploy branch from dist/ (including .htaccess)...');
    execSync('git init', { cwd: distDir, stdio: 'inherit' });
    execSync('git checkout -B deploy', { cwd: distDir, stdio: 'inherit' });
    execSync('git add -A', { cwd: distDir, stdio: 'inherit' });
    execSync('git commit -m "Deploy static build to Hostinger public_html"', { cwd: distDir, stdio: 'inherit' });
    execSync(`git push -f ${repoUrl} deploy`, { cwd: distDir, stdio: 'inherit' });
    console.log('✅ Successfully pushed dist/ to origin/deploy branch!');
} finally {
    if (fs.existsSync(gitDir)) {
        fs.rmSync(gitDir, { recursive: true, force: true });
    }
}
