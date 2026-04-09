import axios from 'axios';

    
    export async function hitApi(url) {
        console.log(`[${new Date().toLocaleString()}] Hitting: ${url}`);
        
        try {
            const res = await axios.get(url);
            console.log(`Status: ${res.status} - Success!`);
        } catch (err) {
            console.error(`Error: ${err.message}`);
        }
    }
