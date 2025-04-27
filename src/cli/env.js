const parseEnv = () => {
    // Write your code here 
    const v = process.env;
    let res = [];
    for(let i in v) {
        if(i.startsWith('RSS')) {
            res.push(`${i}=${process.env[i]}`);
        }
    }
    console.log(res.join('; '));
};

parseEnv();