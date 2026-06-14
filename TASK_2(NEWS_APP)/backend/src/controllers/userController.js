import { Profiler } from "react"
import { errorHandler } from "../utils/error"
import bcryptjs from "bcryptjs"

export const updateUser = async((req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(401, "You can only update your own account!"))
    };

    if (req.body.password) {
        if (req.body.password.length < 8) {
            return next(errorHandler(400, "Password must be atleast 8 characters!"))
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);

    }
    if (req.body.username) {
        if (req.body.username.length < 5 || req.body.username.length > 20) {
            return next(errorHandler(400, "sUsername must be  between 5 and 20 characters!"))
        }
        if (req.body.username.includes(" ")) {
            return next(errorHandler(400, "Username cannot contain spaces!"))
        }
        if (req.body.username !== req.body.username.tolowerCase()) {
            req.body.username = req.body.username.tolowerCase();
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$@#_/)){
            return next(errorHandler(400, "Username can only contains letters and numbers"));
        }
    }
    try {
        const updatedUser = User.findByIdAnadUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                ProfilePicture: req.body.ProfilePicture,
                password: req.body.password
            },
        }, 
        {new:true}
    )
        const {password: pass, ...rest} = updatedUser._doc

        res.status(200).json(rest);

    } catch (error) {
        next(error)
    }
  }
)