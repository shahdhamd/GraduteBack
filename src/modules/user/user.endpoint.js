import { roles } from "../../services/roles.js";

export const endpoint={
    getAllUser:[roles.Admin],
    addAccount:[roles.Admin],
    upload:[roles.User,roles.Admin],
    deleteUser:[roles.Admin],
    updateUserInfo:[roles.Admin],
    
}
