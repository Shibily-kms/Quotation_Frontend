const YYYYMMDDFormat = (ISOdate) => {
    const year = ISOdate.getFullYear();
    const month = String(ISOdate.getMonth() + 1).padStart(2, '0');
    const day = String(ISOdate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function createRandomId(sting_length, addition = "") {
    const numbers = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let randomString = '';
    for (let i = 0; i < sting_length; i++) {
        randomString += numbers.charAt(Math.floor(Math.random() * numbers.length))
    }
    return addition + randomString
}

export { YYYYMMDDFormat, createRandomId }