export function checkID(id: string) : boolean {

    var tempId = id;

    var number = [8, 4, 4, 4, 12];
    tempId += "-";

    if (tempId.split("-").length - 1 === 4 + 1) {
        for (var i = 0; tempId.split("-").length - 1 !== 0; ++i) {
            var temp = tempId.substring(0, tempId.indexOf("-"))
            if (!(temp.length === number[i])) {
                return false;
            }else {
                tempId = tempId.replace(temp + "-", "");
            }
        }
    }else {
        return false;
    }
    
    return true;
}