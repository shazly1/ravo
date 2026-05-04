const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// ✅ Direct connection - no .env needed
const MONGODB_URI = 'mongodb://mohamedelshazly468_db_user:Mohamed12345@ac-39ea6cy-shard-00-00.igzayc1.mongodb.net:27017,ac-39ea6cy-shard-00-01.igzayc1.mongodb.net:27017,ac-39ea6cy-shard-00-02.igzayc1.mongodb.net:27017/ravo?ssl=true&authSource=admin&retryWrites=true&w=majority';

const EMAIL = 'superadmin@ravo.com';
const PASSWORD = 'ChangeMe123!';
const NAME = 'Super Admin';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
}, { timestamps: true });

async function seed() {
  console.log('🌱 Connecting to MongoDB...');
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ Could not connect to MongoDB:', err.message);
    process.exit(1);
  }

  const User = mongoose.models.User || mongoose.model('User', UserSchema);

  const existing = await User.findOne({ email: EMAIL });
  if (existing) {
    console.log('⚠️  Super admin already exists:', EMAIL);
    await mongoose.disconnect();
    return;
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(PASSWORD, salt);

  await User.create({
    name: NAME,
    email: EMAIL,
    password: hashedPassword,
    role: 'super_admin',
  });

  console.log('\n🎉 Super Admin created successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📧 Email:   ', EMAIL);
  console.log('🔑 Password:', PASSWORD);
  console.log('🌐 Login at: http://localhost:3000/admin/login');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});