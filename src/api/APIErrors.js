const getErrorMessage = (e) => {
    let errorMsg = {
        message: 'Unknown Error. Contact Admin!',
        variant: "error",
    };
    if ({e}.e.response === undefined) {
        errorMsg.message = 'Check internet! if no problems with internet, contact admin.';
    } else {
        errorMsg.message = {e}.e.response.data.error;
    }
    return errorMsg;
}

export default getErrorMessage;