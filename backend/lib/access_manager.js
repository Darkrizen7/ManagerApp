const { ACCESS } = require('../config/access');
const Member = require('../models/member');
const mongoose = require('mongoose');

const fetchUserMember = async (user) => {
    const { email } = user;
    const member = await Member.findOne({ email });
    if (member) member.populate("list");
    return member ? member : null;
}

exports.hasAccess = async (req, access, listId) => {
    try {
        const role = req.user.role;
        const member = await fetchUserMember(req.user);
        var listRole = "user";
        if (member) listRole = member.role;
        if (listId) listId = new mongoose.Types.ObjectId(typeof listId === "string" ? listId : listId._id);
        const splittedAccess = access.split(".");
        var actualAccess = ACCESS.roles[role] ? ACCESS.roles[role] : ACCESS.roles.user
        splittedAccess.every(path => {
            actualAccess = actualAccess[path]
            return actualAccess;
        });
        var hasRoleAccess = actualAccess ? true : false
        if (!member) return hasRoleAccess;
        var actualAccess = ACCESS.listRoles[listRole] ? ACCESS.listRoles[listRole] : ACCESS.listRoles.user
        var hasListAccess = false;
        if (listId && member && (member.list._id.equals(listId))) {
            splittedAccess.every(path => {
                actualAccess = actualAccess[path]
                return actualAccess;
            });
            hasListAccess = actualAccess ? true : false
        }
        return hasRoleAccess || hasListAccess
    } catch (e) { return false; }
}
