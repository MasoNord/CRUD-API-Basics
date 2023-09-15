import cluster from 'node:cluster';
import process from 'node:process';
import {server} from './index';
import { availableParallelism } from 'node:os';

const numCPUs = availableParallelism();
const PORT: number = parseInt(process.env.PORT) || 5000;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    });

    process.on('SIGTERM', () => {
        server.close(() => {
            console.log(`Worker ${process.pid} terminated`);
            process.exit(0);
        });
    });
}else{
    server.listen(PORT, () => { 
        console.log(`Worker ${process.pid} http://localhost:${PORT}/`);
    });
}
