export function checkPOST(user): boolean {
    
    if ((typeof(user.username) === "string")
        && (typeof(user.age) === "number")
        && (typeof(user.hobbies) === "object")) {
            return true;
        }
    
    return ;
}