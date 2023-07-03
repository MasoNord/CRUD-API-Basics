export function getData(request): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            let body: string = "";
            request.on("data", (chunk) => {
                body += chunk.toString();
            })

            request.on("end", () => {
                resolve(body);
            })
        }catch(err) {
            reject(err);
        }
    });
}