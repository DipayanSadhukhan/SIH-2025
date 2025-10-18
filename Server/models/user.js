import mongooses from "mongoose";

const userSchema = new mongooses.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please add a valid email",
            ],
        },
        password: {
            type: String,
            required: true,
            minlength: 3,
        }
    },
    { 
        timestamps: true 
    }
);

const User = mongooses.model("User", userSchema);

export default User;