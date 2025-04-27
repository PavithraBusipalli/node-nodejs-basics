const parseArgs = () => {
    const cmdLineArgs = process.argv.slice(2);
    for(let i = 0; i < cmdLineArgs.length; i += 2) {
        const keyName = cmdLineArgs[i].replace('--', '');
        const value = cmdLineArgs[i+1];
        console.log(`${keyName} is ${value}`);
    }
};

parseArgs();