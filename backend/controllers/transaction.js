const fs = require('fs');
const path = require('path');
const Transaction = require('../models/transaction');
const { tl } = require('../utils/translator');
const { hasAccess } = require('../lib/access_manager');
const { JSONErr } = require('../lib/error_manager');

exports.get = async (req, res) => {
    const { list, _id } = req.query;
    if (_id) {
        exports.getTransaction(req, res);
        return;
    }
    const accessAllowed = await hasAccess(req, "transactions.read", list)
    if (!accessAllowed) return JSONErr(res, tl("unauthorized_access"))

    try {
        const transactions = await Transaction.find(list ? { list } : null).populate("list", "name _id");
        res.json({ success: true, transactions });

    } catch (e) { return JSONErr(res, e) }
}
exports.getTransaction = async (req, res) => {
    const { _id } = req.query;
    try {
        const transaction = await Transaction.findById(_id);
        const accessAllowed = await hasAccess(req, "transactions.read", transaction.list)
        if (!accessAllowed) return JSONErr(res, tl("unauthorized_access"))

        if (!transaction) return JSONErr(res, tl("transaction_not_found"));

        await transaction.populate("list", "list.name list._id");
        await transaction.populate("approved_by");

        res.json({ success: true, transaction, });
    } catch (e) { return JSONErr(res, e) }
}

exports.create = async (req, res) => {
    const { name, desc, amount, list, type } = req.body;
    const accessAllowed = await hasAccess(req, "transactions.create", list)
    if (!accessAllowed) return JSONErr(res, tl("unauthorized_access"))

    try {
        const transaction = await Transaction({ name, desc, amount, list, user: req.user });
        await transaction.save();

        try {
            if (req.files) {
                let file = req.files.file;
                file.mv("./uploads/" + transaction._id + "/proof.jpg");
            }
        } catch (e) { console.log(e); }

        res.json({ success: true, transaction, })
    } catch (e) { return JSONErr(res, e) }

}

exports.remove = async (req, res) => {
    const { _id } = req.body;
    try {
        const transaction = await Transaction.findById(_id);
        const accessAllowed = await hasAccess(req, "transactions.delete", transaction.list)
        if (!accessAllowed) return JSONErr(res, tl("unauthorized_access"))

        await Transaction.findByIdAndRemove(_id);
        res.json({ success: true })
    } catch (e) { return JSONErr(res, e) }

}
const dateFormat = (date) => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}
exports.update = async (req, res) => {
    const { _id, name, desc, amount, type, amount_ht, toreimburse, date } = req.body;
    try {
        const tr = await Transaction.findById(_id);
        const accessAllowed = await hasAccess(req, "transactions.update", tr.list)
        if (!accessAllowed) return JSONErr(res, tl("unauthorized_access"))

        const transaction = await Transaction.findByIdAndUpdate(_id, {
            $set: {
                name, desc, amount, amount_ht, type, toreimburse, date, approved: false, approved_by: null, approved_at: null
            }
        }, { new: true });
        if (!transaction) return JSONErr(res, tl("transaction_not_found"))

        try {
            if (req.files) {
                Object.entries(req.files).forEach(entry => {
                    const [key, value] = entry;
                    let file = req.files[key];
                    var fileName;
                    if (key === "BNP") {
                        fileName = name + "-BNP-" + dateFormat() + ".pdf";

                    } else if (key === "contract") {
                        fileName = name + (type === "Intérim" ? "-Intérim-" : "-Sponsoring-") + dateFormat() + ".pdf";

                    } else if (key === "RIB") {
                        fileName = "RIB.pdf";

                    } else if (key === "facture") {
                        fileName = toreimburse + "-" + name + "-Facture-" + dateFormat() + ".pdf";

                    } else if (key === "frais") {
                        fileName = toreimburse + "-NdF-" + dateFormat() + ".pdf";
                    }

                    file.mv("./uploads/" + _id + "/" + fileName);
                });
            }
        } catch (e) {
            console.log(e);
        }
        await transaction.populate("list", "list.name list._id");

        const errors = transaction.validateSync();
        res.json({ success: true, transaction, })
    } catch (e) {
        console.log(e);
        return JSONErr(res, e)
    }

}
const { jsPDF } = require("jspdf"); // will automatically load the node version

exports.approve = async (req, res) => {
    const { _id } = req.body;
    try {
        const tr = await Transaction.findById(_id);
        const accessAllowed = await hasAccess(req, "transactions.approve", tr.list)
        if (!accessAllowed) return JSONErr(res, tl("unauthorized_access"))

        const transaction = await Transaction.findByIdAndUpdate(_id, {
            approved: true, approved_by: req.user, approved_at: Date.now()
        }, { new: true });
        if (!transaction) return JSONErr(res, tl("transaction_not_found"))

        await transaction.populate("list", "list.name list._id");
        await transaction.populate("approved_by");

        const pdfReturn = new jsPDF();
        pdfReturn.text("Liste : " + transaction.list.name, 10, 10);
        pdfReturn.text("Montant :" + transaction.amount + "€", 10, 20);
        pdfReturn.save("a4.pdf");

        res.json({ success: true, transaction, });

    } catch (e) { console.log(e); return JSONErr(res, tl("internal_server_error")) }

}

exports.getProof = async (req, res) => {
    const { _id } = req.query;
    try {
        const imagePath = path.join(__dirname, "..", "uploads", _id, "proof.jpg");
        res.sendFile(imagePath, {}, err => {
        });
    } catch (e) { return JSONErr(res, e) }
};