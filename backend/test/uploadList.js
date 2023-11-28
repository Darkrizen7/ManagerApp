require('dotenv').config()
const { tl } = require('../utils/translator');
const mongoose = require('mongoose');

const name = "Capt'EM Jack";
mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
    }).then(async () => {
        console.log(tl("db_connected"));
        const xlsx = require('node-xlsx');
        const Member = require('../models/member')
        const List = require('../models/list')

        const list = await List.findOne({ name });
        if (!list) return console.log("list not found")

        const obj = xlsx.parse('./test/excel.xlsx'); // parses a file
        var membres;
        obj.forEach(onglet => {
            if (onglet.name === "Membres") membres = onglet.data;
        })
        head = membres[0];
        membres = membres.slice(1);

        membres.forEach(async (membre) => {
            if (membre.length !== 0) {
                const mb = {}
                for (let i = 0; i < head.length; i++) {
                    mb[head[i]] = membre[i];
                }
                const mbDb = Member(mb);
                mbDb.list = list._id;
                console.log("Membre " + mb.email + " ajouté à " + name);
                await mbDb.save();
            }
        })
    }).catch(err => console.log(err.message));