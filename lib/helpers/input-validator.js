export const validateEmailInput = (email) => {
    if (email == "") {
        return false;
    }
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

export const validatePasswordInput = (password) => {
    if (password == "") {
        return false;
    }
    const re = /.{6,}/;
    return re.test(password);
}