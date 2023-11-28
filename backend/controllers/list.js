const { hasAccess } = require('../lib/access_manager');
const { JSONErr } = require('../lib/error_manager');
const List = require('../models/list');
const Member = require('../models/member');
const { tl } = require('../utils/translator');

// ------------------------------------- List CRUD ------------------------------------- //
exports.create = async (req, res) => {
    const { name, campagne } = req.body;
    const accessAllowed = await hasAccess(req, "lists.create")
    if (!accessAllowed) return JSONErr(res, tl("unauthorized_access"))

    try {
        const list = await List({ name, campagne });
        await list.save()
        await list.populate("members");
        res.json({ success: true, list });
    } catch (e) { return JSONErr(res, e); }
}
exports.remove = async (req, res) => {
    const { _id } = req.body;
    const accessAllowed = await hasAccess(req, "lists.delete")
    if (!accessAllowed) return JSONErr(res, tl("unauthorized_access"))

    try {
        const list = await List.findById({ _id })
        if (!list) return JSONErr(res, tl("list_not_found"))

        await list.model('Member').deleteMany({ list: list._id });
        await list.model('Transaction').deleteMany({ list: list._id });
        await List.findByIdAndDelete({ _id });

        res.json({ success: true });
    } catch (e) { return JSONErr(res, e); }
}

// Get All lists
getAll = async (req, res) => {
    const accessAllowed = await hasAccess(req, "lists.read")
    if (!accessAllowed) return JSONErr(res, tl("unauthorized_access"))

    const lists = await List.find({}).populate("members").exec();
    res.json({ success: true, lists });
};

// Get One list by name
exports.get = async (req, res) => {
    const { _id } = req.query
    if (!_id) {
        getAll(req, res);
        return;
    }
    if (_id === "mine") {
        getForUser(req, res);
        return;
    }
    const accessAllowed = await hasAccess(req, "lists.readOne", _id)
    if (!accessAllowed) return JSONErr(res, tl("unauthorized_access"))
    try {
        const list = await List.findById({ _id });
        if (!list) return JSONErr(res, tl("list_not_found"))

        await list.fullPopulate();
        res.json({ success: true, list });
    } catch (e) { return JSONErr(res, e) }
};

// Get the list of the authed user
const getForUser = async (req, res) => {
    const { email } = req.user;
    try {
        const member = await Member.findOne({ email });
        if (!member) return JSONErr(res, tl("user_has_no_list"))

        req.query._id = member.list._id;
        exports.get(req, res);
    } catch (e) { return JSONErr(res, e) }
}