const ACCESS = {
    listRoles: {},
    roles: {}
}
ACCESS.roles.admin = {
    navbar: {
        admin: true,
    },
    lists: {
        create: true,
        delete: true,
        update: true,
        read: true,
        readOne: true,
    },
    members: {
        create: true,
        delete: true,
        update: true,
        read: true,
    },
    transactions: {
        create: true,
        delete: true,
        update: true,
        read: true,
        approve: true,
        deleteNonApproved: true,
    },
}
ACCESS.roles.user = {
    lists: {
        create: false,
        delete: false,
        update: false,
        read: false,
    },
    members: {
        create: false,
        delete: false,
        update: false,
        read: false,
    },
    transactions: {
        create: false,
        delete: false,
        update: false,
        read: false,
        approve: false,
    },
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
        update: false,
        read: true,
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
        create: false,
        delete: false,
        update: true,
        read: true,
    },
    transactions: {
        create: true,
        delete: false,
        deleteNonApproved: false,
        update: false,
        read: true,
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
        create: true,
        delete: false,
        deleteNonApproved: false,
        update: false,
        read: true,
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
        create: true,
        delete: false,
        deleteNonApproved: false,
        update: false,
        read: true,
        approve: false,
    },
}
export { ACCESS };