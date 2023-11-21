const List = require('../models/list');
const Member = require('../models/member');
const { tl } = require('../utils/translator');

// ------------------------------------- List CRUD ------------------------------------- //
exports.create = async (req, res) => {
    const { name, campagne } = req.body;
    try {
        const list = await List({ name, campagne });
        await list.save()
        const lists = await List.find({}).populate("members");
        res.json({ success: true, lists });
    } catch (e) {
        res.json({ success: false, message: e.message })
    }
}
exports.remove = async (req, res) => {
    const { name } = req.body;

    const list = await List.findOne({ name })
    if (!list) {
        res.json({ success: false, message: tl("list_not_found") })
    }

    await list.model('Member').deleteMany({ list: list._id });
    await List.findOneAndDelete({ name });

    const lists = await List.find({});
    await lists.populate("members");
    res.json({ success: true, lists });
}

// Get All lists
exports.getAll = async (req, res) => {
    const lists = await List.find({}).populate("members").exec();
    res.json(lists);
};

// Get One list by name
exports.get = async (req, res) => {
    const { name } = req.params
    const list = await List.findOne({ name }).exec();
    if (!list) {
        res.json({ success: false, message: tl("list_not_found:") + name });
        return;
    }
    await list.fullPopulate();
    res.json({ success: true, list });
};

// Get the list of the authed user
exports.getForUser = async (req, res) => {
    const { email } = req.user;
    const member = await Member.findOne({ email });
    if (!member) {
        res.json({ success: false, message: tl("user_has_no_list") });
        return;
    }
    await member.populate('list');
    if (!member.list) {
        res.json({ success: false, message: tl("user_has_no_list") });
        return;
    }
    req.params.name = member.list.name;
    exports.get(req, res);
}