const ACCESS = {
    listRoles: {},
    roles: {}
}
ACCESS.listRoles.user = {
    lists: {
        create: false,
        delete: false,
        update: false,
        read: false,
        readOne: true,
    },
    members: {
        create: false,
        delete: false,
        update: true,
        read: true,
    },
    transactions: {
        create: false,
        delete: false,
        deleteNonApproved: false,
        update: false,
        read: false,
        approve: false,
    },
}
ACCESS.listRoles.RCorpo = {
    lists: {
        create: false,
        delete: false,
        update: false,
        read: false,
        readOne: true,
    },
    members: {
        create: true,
        delete: true,
        update: true,
        read: true,
    },
    transactions: {
        create: false,
        delete: false,
        deleteNonApproved: false,
        update: false,
        read: false,
        approve: false,
    },
}
ACCESS.listRoles.Treso = {
    lists: {
        create: false,
        delete: false,
        update: false,
        read: false,
        readOne: true,

    },
    members: {
        create: false,
        delete: false,
        update: false,
        read: true,

    },
    transactions: {
        create: false,
        delete: false,
        deleteNonApproved: false,
        update: false,
        read: false,
        approve: false,
    },
}
ACCESS.listRoles.RDem = {
    lists: {
        create: false,
        delete: false,
        update: false,
        read: false,
        readOne: true,

    },
    members: {
        create: false,
        delete: false,
        update: false,
        read: true,
    },
    transactions: {
        create: false,
        delete: false,
        deleteNonApproved: false,
        update: false,
        read: false,
        approve: false,
    },
}
exports.ACCESS = ACCESS;