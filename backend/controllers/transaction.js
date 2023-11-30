const fs = require('fs');
const path = require('path');
const { jsPDF } = require("jspdf"); // will automatically load the node version
const { PDFDocument } = require("pdf-lib");
const Transaction = require('../models/transaction');
const { tl } = require('../utils/translator');
const { hasAccess } = require('../lib/access_manager');
const { JSONErr } = require('../lib/error_manager');
const { dateFormat } = require('../utils/date');

exports.get = async (req, res) => {
    const { list, _id } = req.query;
    if (_id) return exports.getTransaction(req, res);

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
    const { name, desc, amount, type, amount_ht, toreimburse, date, list } = req.body;

    const accessAllowed = await hasAccess(req, "transactions.create", list)
    if (!accessAllowed) return JSONErr(res, tl("unauthorized_access"))

    try {
        const transaction = await Transaction({ name, desc, amount, type, amount_ht, toreimburse, date, user: req.user, list });
        await transaction.save();


        try {
            if (req.files) {
                Object.entries(req.files).forEach(async (entry) => {
                    const [key, value] = entry;
                    const dateFormatted = dateFormat(date);
                    let file = req.files[key];
                    var fileName;
                    if (key === "proof") {
                        fileName = name + "-BNP-" + dateFormat(dateFormatted) + ".pdf";

                    } else if (key === "contract") {
                        fileName = name + (type === "Intérim" ? "-Intérim-" : "-Sponsoring-") + dateFormat(dateFormatted) + ".pdf";

                    } else if (key === "RIB") {
                        fileName = "RIB.pdf";

                    } else if (key === "facture") {
                        fileName = toreimburse + "-" + name + "-Facture-" + dateFormat(dateFormatted) + ".pdf";

                    } else if (key === "frais") {
                        fileName = toreimburse + "-NdF-" + dateFormat(dateFormatted) + ".pdf";
                    }
                    const path = "./uploads/" + _id + "/" + fileName;
                    fs.writeFileSync(path, file.data);
                    docs.push(path);
                });
            }
        } catch (e) {
            console.log(e);
        }

        res.json({ success: true, transaction, })
    } catch (e) { return JSONErr(res, e) }

}

exports.remove = async (req, res) => {
    const { _id } = req.body;
    try {
        const transaction = await Transaction.findById(_id);
        const accessAllowed = await hasAccess(req, "transactions.delete" + (transaction.approved ? "" : "NonApproved"), transaction.list)
        if (!accessAllowed) return JSONErr(res, tl("unauthorized_access"))

        await Transaction.findByIdAndRemove(_id);
        res.json({ success: true })
    } catch (e) { return JSONErr(res, e) }

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
                Object.entries(req.files).forEach(async (entry) => {
                    const [key, value] = entry;
                    const dateFormatted = dateFormat(date);
                    let file = req.files[key];
                    var fileName;
                    if (key === "proof") {
                        fileName = name + "-BNP-" + dateFormat(dateFormatted) + ".pdf";

                    } else if (key === "contract") {
                        fileName = name + (type === "Intérim" ? "-Intérim-" : "-Sponsoring-") + dateFormat(dateFormatted) + ".pdf";

                    } else if (key === "RIB") {
                        fileName = "RIB.pdf";

                    } else if (key === "facture") {
                        fileName = toreimburse + "-" + name + "-Facture-" + dateFormat(dateFormatted) + ".pdf";

                    } else if (key === "frais") {
                        fileName = toreimburse + "-NdF-" + dateFormat(dateFormatted) + ".pdf";
                    }
                    const path = "./uploads/" + _id + "/" + fileName;
                    fs.writeFileSync(path, file.data);
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
        const parentFolder = "uploads/" + _id;
        if (!fs.existsSync(parentFolder)) {
            fs.mkdirSync(parentFolder)
        }
        const pdfReturn = new jsPDF();
        pdfReturn.text("Type : " + transaction.type, 10, 10);
        pdfReturn.text("Montant : " + transaction.amount + "€", 10, 30);
        pdfReturn.text("Nom : " + transaction.name, 10, 50);
        pdfReturn.text("Approuvée par : " + req.user.username, 10, 70);
        pdfReturn.text("Approuvée le : " + dateFormat(Date.now()), 10, 90);
        pdfReturn.save("uploads/" + _id + "/head.pdf");

        res.json({ success: true, transaction, });

    } catch (e) { console.log(e); return JSONErr(res, tl("internal_server_error")) }

}

exports.downloadMerged = async (req, res) => {
    const { _id } = req.query;

    const fileName = "Merge.pdf";
    const path = `./uploads/${_id}/`;
    const files = fs.readdirSync(path);

    try {
        const mergedPDF = await PDFDocument.create();
        for (const file of files) {
            try {
                if (file == "Merge.pdf") continue;
                const pdfDoc = await PDFDocument.load(fs.readFileSync(path + file));
                if (!pdfDoc) continue;

                const copiedPages = await mergedPDF.copyPages(pdfDoc, pdfDoc.getPageIndices());
                for (const page of copiedPages) {
                    mergedPDF.insertPage((file === "head.pdf") ? 0 : mergedPDF.getPageCount(), page)
                }
            } catch (e) { console.log(e); }
        }
        const mergedPdfBytes = await mergedPDF.save();
        fs.writeFileSync(path + fileName, mergedPdfBytes);
    } catch (e) { console.log(e) }

    const filePath = path + fileName;
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found');
    }

    res.set('Content-Disposition', `filename="${fileName}"`);
    res.set('Content-Type', 'application/pdf');

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
}