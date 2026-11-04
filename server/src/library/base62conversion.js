const BASE62string =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";


function base62Convert(count){
    let string =''
    let giveNo=count

    while (giveNo) {
        string=BASE62string[giveNo%62]+string

        giveNo=Math.floor(giveNo /62)
        
        
        
    }
    return string || '0'
}
export default base62Convert 