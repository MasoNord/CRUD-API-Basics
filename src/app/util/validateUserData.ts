export function validateInfo(username: string, age: number, hobbies: string[]): boolean{
    if (typeof username !== "string" && username !== null)
        return false

    if (typeof age !== 'number' && age !== null)
        return false;

    if(typeof hobbies !== 'object' && hobbies !== null)
        return false;

    return true;
}