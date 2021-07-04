// Gruppen Auth
// Gehoert der Nutzer der Gruppe an?
const hasGroupAuthorization = (req, res, next) => {
    let isPartOfGroup = false;
    console.log(req.auth)
    console.log(req.profile)
    console.log(req.conv)
    console.log(req.book)

    req.auth.group.forEach((group) => {
        if (typeof req.conv !== "undefined") {
            if (group == req.conv.group) {
                isPartOfGroup = true;
                console.log("conv")
            }
        }
        if (typeof req.book !== "undefined") {
            if (group == req.book.group) {
                isPartOfGroup = true;
                console.log("book")
            }
        }
        if (typeof req.profile !== "undefined") {
            req.profile.group.forEach((member) => {
                if (group == member) {
                    isPartOfGroup = true;
                    console.log("member")
                }
            })
        }
    })

    const authorized = req.auth && isPartOfGroup

    if (!authorized) {
        return res.status('403').json({
            error: 'User is not authorized',
        });
    }
    next();
};

export default {
    hasGroupAuthorization
};