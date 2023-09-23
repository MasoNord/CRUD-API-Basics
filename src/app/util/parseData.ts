export function parseData(request: any): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      let body: string = '';
      request.on('data', (chunk: any) => {
        body += chunk.toString();
      });

      request.on('end', () => {
        resolve(body);
      });
    } catch (err) {
      reject(err);
    }
  });
}
