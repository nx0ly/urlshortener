/*export default async function generateHash(input: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
}*/

// above method doesnt work in nodejs environments

import crypto from "crypto";

export default function generateHash(input: string): Promise<string> {
    return new Promise((resolve) => {
        const hash = crypto.createHash('sha256')
                           .update(input)
                           .digest('hex');
        resolve(hash);
    });
}

//generateHash("hello world").then(hash => console.log(hash));