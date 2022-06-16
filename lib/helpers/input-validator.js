export const validateEmail = (email) => {
    if (email == "") {
        return false;
    }
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}
