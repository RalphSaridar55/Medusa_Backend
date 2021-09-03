export  let maskNumber = (number) => {
    return (number.slice(0, 1) + (number.slice(1,number.length - 1)).replace(/\d/g, "*") + number.slice(number.length));
}

export let maskEmail = (email) => {
    return email.replace(/^(.)(.*)(.@.*)$/,
    (_, a, b, c) => a + b.replace(/./g, '*') + c
);
}