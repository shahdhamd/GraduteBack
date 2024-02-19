import joi from "joi";


export const createUserAccount={
    body:joi.object().required().keys({
        userName:joi.string().required().min(3).max(25),
        email:joi.string().email().required(),
        passward:joi.string().required()
    })
}

export const deleteUserAccount={
    params:joi.object().required().keys({
        id:joi.number().required()
    })
}
export const updateUserInfo={
    body:joi.object().keys({
        userName:joi.string().min(3).max(25),
        email: joi.string(),
        role:joi.string()
    })
}
