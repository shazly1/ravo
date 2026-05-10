import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export type AffiliateStore = 'amazon' | 'noon' | 'jumia' | 'other';

export interface IProduct extends Document {
  title: string;
  description: string;
  image: string;
  images?: string[];
  price?: number;
  currency?: string;
  category: Types.ObjectId;
  affiliateLink: string;
  affiliateStore: AffiliateStore;
  featured: boolean;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true, maxlength: 300 },
    description: { type: String, required: true, trim: true, maxlength: 5000 },
    image: { type: String, required: true, trim: true },
    images: [{ type: String, trim: true }],
    price: { type: Number, min: 0 },
    currency: { type: String, default: 'USD', maxlength: 10 },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    affiliateLink: { type: String, required: true, trim: true },
    affiliateStore: {
      type: String,
      enum: ['amazon', 'noon', 'jumia', 'other'],
      default: 'other',
    },
    featured: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

ProductSchema.index({ title: 'text', description: 'text' });
ProductSchema.index({ category: 1 });
ProductSchema.index({ featured: 1 });

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
