#!/usr/bin/env node

/**
 * TLBC Google Analytics 4 Query Engine
 * Authenticates using Service Account JWT without external dependencies.
 */

const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const KEY_PATH = '/Users/thomas/Desktop/The Long Book Club Project/Web Docs/Important Keys/the-long-book-club-6661a0407573.json';
const PROPERTY_ID = '516902131';

async function getAccessToken(key) {
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'RS256', typ: 'JWT' };
    const claimSet = {
        iss: key.client_email,
        scope: 'https://www.googleapis.com/auth/analytics.readonly',
        aud: 'https://oauth2.googleapis.com/token',
        exp: now + 3600,
        iat: now
    };

    const b64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
    const b64ClaimSet = Buffer.from(JSON.stringify(claimSet)).toString('base64url');
    const signInput = `${b64Header}.${b64ClaimSet}`;

    const signer = crypto.createSign('RSA-SHA256');
    signer.update(signInput);
    const signature = signer.sign(key.private_key, 'base64url');

    const jwt = `${signInput}.${signature}`;

    const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion: jwt
        })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(`Token exchange failed: ${JSON.stringify(data)}`);
    return data.access_token;
}

async function runReport(token, reportConfig) {
    const url = `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reportConfig)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(`GA4 API error: ${JSON.stringify(data)}`);
    return data;
}

const HOSTNAME_FILTER = {
    notExpression: {
        filter: {
            fieldName: 'hostName',
            stringFilter: {
                matchType: 'EXACT',
                value: 'localhost'
            }
        }
    }
};

async function main() {
    const args = process.argv.slice(2);
    const days = args[0] ? parseInt(args[0], 10) : 30;

    if (!fs.existsSync(KEY_PATH)) {
        console.error(`❌ Key file missing at ${KEY_PATH}`);
        process.exit(1);
    }

    const key = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'));
    const token = await getAccessToken(key);

    console.log(`\n📊 The Long Book Club — Live Production Analytics (Last ${days} Days)`);
    console.log(`(Filtered to exclude localhost development traffic)`);
    console.log(`======================================================================`);

    // 1. Overview Totals
    const totalsReport = await runReport(token, {
        dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
        metrics: [
            { name: 'activeUsers' },
            { name: 'screenPageViews' },
            { name: 'sessions' },
            { name: 'averageSessionDuration' }
        ],
        dimensionFilter: HOSTNAME_FILTER
    });

    if (totalsReport.rows && totalsReport.rows.length > 0) {
        const m = totalsReport.rows[0].metricValues;
        console.log(`👥 Active Users:         ${m[0].value}`);
        console.log(`👀 Total Page Views:     ${m[1].value}`);
        console.log(`🧭 Total Sessions:       ${m[2].value}`);
        console.log(`⏱️  Avg Session Duration: ${(parseFloat(m[3].value) / 60).toFixed(1)} minutes`);
    }

    // 2. Top Landing Pages
    console.log(`\n📚 Top 12 Pages by Engagement:`);
    console.log(`----------------------------------------------------------------------`);
    console.log('Page'.padEnd(46) + 'Views'.padEnd(8) + 'Users'.padEnd(8) + 'Avg Time');
    console.log(`----------------------------------------------------------------------`);
    const pagesReport = await runReport(token, {
        dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [
            { name: 'screenPageViews' },
            { name: 'activeUsers' },
            { name: 'averageSessionDuration' }
        ],
        dimensionFilter: HOSTNAME_FILTER,
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 12
    });

    pagesReport.rows?.forEach(r => {
        const path = r.dimensionValues[0].value;
        const views = r.metricValues[0].value;
        const users = r.metricValues[1].value;
        const sec = parseFloat(r.metricValues[2].value);
        const timeStr = sec > 60 ? `${(sec / 60).toFixed(1)}m` : `${sec.toFixed(0)}s`;
        console.log(path.padEnd(46) + views.padEnd(8) + users.padEnd(8) + timeStr);
    });

    // 3. Traffic Channels
    console.log(`\n🌐 Traffic Sources:`);
    console.log(`----------------------------------------------------------------------`);
    console.log('Channel'.padEnd(30) + 'Sessions'.padEnd(12) + 'Users');
    console.log(`----------------------------------------------------------------------`);
    const channelReport = await runReport(token, {
        dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [
            { name: 'sessions' },
            { name: 'activeUsers' }
        ],
        dimensionFilter: HOSTNAME_FILTER,
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 5
    });

    channelReport.rows?.forEach(r => {
        const channel = r.dimensionValues[0].value;
        const sessions = r.metricValues[0].value;
        const users = r.metricValues[1].value;
        console.log(channel.padEnd(30) + sessions.padEnd(12) + users);
    });

    // 4. Countries
    console.log(`\n🌍 Top Countries:`);
    console.log(`----------------------------------------------------------------------`);
    console.log('Country'.padEnd(30) + 'Users'.padEnd(12) + 'Pageviews');
    console.log(`----------------------------------------------------------------------`);
    const geoReport = await runReport(token, {
        dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
        dimensions: [{ name: 'country' }],
        metrics: [
            { name: 'activeUsers' },
            { name: 'screenPageViews' }
        ],
        dimensionFilter: HOSTNAME_FILTER,
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
        limit: 5
    });

    geoReport.rows?.forEach(r => {
        const country = r.dimensionValues[0].value;
        const users = r.metricValues[0].value;
        const views = r.metricValues[1].value;
        console.log(country.padEnd(30) + users.padEnd(12) + views);
    });
    console.log(`======================================================================\n`);
}

main().catch(err => {
    console.error('❌ Analytics Error:', err.message);
    process.exit(1);
});
