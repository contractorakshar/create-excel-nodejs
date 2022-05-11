const successResponse = (res, result, msg) => {
    return res.status(200).send({
        success: true,
        error: false,
        result,
        message: msg
    });
}

const errorResponse = (res, err, msg) => {
    return res.status(err.code || 500).send({
        success: false,
        error: true,
        err,
        message: err.message ? err.message : msg
    });
}

module.exports = {
    successResponse, errorResponse
}