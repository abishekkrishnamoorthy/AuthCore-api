const mongo=require("mongoose")

const userschema=mongo.Schema(
   {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    isVerified: {
      type: Boolean,
      default: false
    },  
    verificationToken: {
      type: String
    },
    resetPasswordToken: {
      type: String
    },
    resetPasswordExpires: {
      type: Date
    }  ,
    ipaddress: {
      type: String
    },
    lastLogin: {
      type: Date
    },
    lastLoginIP: {
      type: String
    },
    refreshToken: {
      type: String
    }
   },
  {
    timestamps: true
  }
)
const user=mongo.model('User',userschema)
module.exports=user;