const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    // Existing fields (kept for backward compatibility with current app)
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, index: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: { type: Boolean, required: true, default: false },

    // Enhanced fields for large-scale messaging features
    username: { type: String, unique: true, sparse: true, index: true },
    fullName: { type: String },
    phone: { type: String, index: true },
    passwordHash: { type: String }, // optional mirror; we still use `password`
    profileImage: { type: String },
    about: { type: String, default: "" },
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date },
    deviceTokens: [{ type: String }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    settings: {
      privacy: {
        lastSeen: { type: String, enum: ["everyone", "contacts", "nobody"], default: "everyone" },
        profilePhoto: { type: String, enum: ["everyone", "contacts", "nobody"], default: "everyone" },
        about: { type: String, enum: ["everyone", "contacts", "nobody"], default: "everyone" },
      },
      notifications: {
        messagePreview: { type: Boolean, default: true },
        sounds: { type: Boolean, default: true },
      },
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
