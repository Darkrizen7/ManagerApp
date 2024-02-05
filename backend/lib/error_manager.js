exports.JSONErr = (res, error) => {
    var err = { message: "" };
    if (typeof error === "string") err.message = error;
    if (typeof error === "object" && "message" in error) err.message = error.message;
    if (typeof error === "object" && "codeName" in error) err.message = error.codeName;
    if (err.message === "DuplicateKey") err.message = "Erreur identifiant unique (email)";
    res.json({
        success: false,
        error: err
    })
    return;
}