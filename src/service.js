import { ResponseError } from "./error.js"
import { v4 as uuid } from "uuid"
import { createUserRepository } from "./repository.js"

const createUserService = (payload) => {
    if (!payload.name) {
        throw new ResponseError('Nama wajib ada', 400)
    }
    if(!payload.age) {
        throw new ResponseError('Umur wajib ada', 400)
    }
    const id = uuid()
    const user = {
        id,
        name: payload.name,
        age: payload.age
    }

    createUserRepository(user)

    return user
}

export {
    createUserService
}