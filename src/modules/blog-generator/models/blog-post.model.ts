import { v4 as uuid } from 'uuid';
import { Schema, model, models, Types } from 'mongoose';
import { ISite } from './site.model';

export interface IBlogPost {
  _id: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  image: string;
  imageBlurhash: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  site: string;
  user: string;
}

export interface IBlogPostPopulated {
  _id: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  image: string;
  imageBlurhash: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  site: ISite;
  user: string;
}

const BlogPostSchema = new Schema({
  title: String,
  description: String,
  content: { type: String, default: '' },
  slug: { type: String, unique: true, default: () => uuid() },
  image: {
    type: String,
    default:
      'https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/hxfcV5V-eInX3jbVUhjAt1suB7zB88uGd1j20b.png',
  },
  imageBlurhash: {
    type: String,
    default:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAACXBIWXMAABYlAAAWJQFJUiTwAAABfUlEQVR4nN3XyZLDIAwE0Pz/v3q3r55JDlSBplsIEI49h76k4opexCK/juP4eXjOT149f2Tf9ySPgcjCc7kdpBTgDPKByKK2bTPFEdMO0RDrusJ0wLRBGCIuelmWJAjkgPGDSIQEMBDCfA2CEPM80+Qwl0JkNxBimiaYGOTUlXYI60YoehzHJDEm7kxjV3whOQTD3AaCuhGKHoYhyb+CBMwjIAFz647kTqyapdV4enGINuDJMSScPmijSwjCaHeLcT77C7EC0C1ugaCTi2HYfAZANgj6Z9A8xY5eiYghDMNQBJNCWhASot0jGsSCUiHWZcSGQjaWWCDaGMOWnsCcn2QhVkRuxqqNxMSdUSElCDbp1hbNOsa6Ugxh7xXauF4DyM1m5BLtCylBXgaxvPXVwEoOBjeIFVODtW74oj1yBQah3E8tyz3SkpolKS9Geo9YMD1QJR1Go4oJkgO1pgbNZq0AOUPChyjvh7vlXaQa+X1UXwKxgHokB2XPxbX+AnijwIU4ahazAAAAAElFTkSuQmCC',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  published: { type: Boolean, default: false },
  site: {
    type: Types.ObjectId,
    ref: 'Site', // reference to the SubAccount model
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: 'User', // reference to the SubAccount model
    required: true,
  },
});

const BlogPost = models.BlogPost || model('BlogPost', BlogPostSchema);

export default BlogPost;
