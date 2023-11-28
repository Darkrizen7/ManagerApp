exports.JSONErr = (res, error) => {
    res.json({
        success: false,
        error: (typeof error == "string") ? ({ message: error }) : error
    })
    return;
}