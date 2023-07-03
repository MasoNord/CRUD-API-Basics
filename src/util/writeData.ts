import fs from 'fs';

export async function writeData(path: string, content: Object) {
    fs.writeFile(path, JSON.stringify(content), {encoding: "utf-8"}, (err) => {
        if (err) console.log(err);
    });
}