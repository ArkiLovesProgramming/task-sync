function stringToColor(string) {
    if (string === undefined){
        return "red"
    }
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

const tagProps = {
    height: 20,
    padding: "0px",
    fontSize: "13px",
    marginRight: "10px",
    marginBottom: "2px",
    backgroundColor: "plum",
    borderRadius: 2,
    "& .MuiSvgIcon-root": {
        fontSize: "14px"
    }
}

function isEmail(email){
    const regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (regex.test(email)){
        return true
    }
    return false
}

function getToken(cookie){
    let token;
    if (cookie.get("token") !== undefined){
        token = cookie.get("token")
    } else if(localStorage.getItem("token") !== undefined){
        token = localStorage.getItem("token")
    } else{
        console.log("error: Token is undefined")
    }
    return token
}

export {
    stringToColor,
    tagProps,
    isEmail,
    getToken
}