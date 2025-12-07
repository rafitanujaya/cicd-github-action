const database = []

const createUserRepository = (user) => {
    database.push(user)
}

const getListUserRepository = () => {
    return database
}

export {
    createUserRepository,
    getListUserRepository
}