import mongoose, { Mongoose } from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[true, 'Username is required'],
        unique: true,
        minLength:[3, 'Username must be at least 3 character']
    },
    email: {
        type: String,
        required:[true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required:[true, 'Password is required'],
        minLength:[8, 'Username must be at least 8 character']
    }
}, 
{timestamps: true}
);

// Hash Password
userSchema.pre("save", async function () {
    if(!this.isModified("password")) return 
    this.password = await bcrypt.hash(this.password, 12)
})

// Compare password
userSchema.methods.comparePassword = async function (userPassword){
    return bcrypt.compare(userPassword, this.password)
}

const User = mongoose.model('User', userSchema)
export default User;
