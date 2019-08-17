import { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserDocument extends Document {
  email: string;
  password: string;
  created: Date;
  updated: Date;
  comparePassword: (password: string) => boolean;
}

export const userSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

userSchema.pre<UserDocument>('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, (saltError, salt) => {
    if (saltError) {
      return next(saltError);
    }

    bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

export const User = model<UserDocument>('user', userSchema);
