import { Schema, model, models, Types } from 'mongoose';

export interface ISite {
  _id: string;
  name: string;
  description: string;
  logo: string;
  font: string;
  image: string;
  imageBlurhash: string;
  subdomain: string;
  customDomain: string;
  message404: string;
  createdAt: Date;
  updatedAt: Date;
  user: string;
  posts: string[];
}

const SiteSchema = new Schema({
  name: String,
  description: String,
  logo: { type: String, default: 'https://dashfusion.vercel.app/icon.png' },
  font: { type: String, default: 'font-cal' },
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
  subdomain: { type: String, unique: true },
  customDomain: { type: String, unique: true },
  message404: {
    type: String,
    default: "Blimey! You've found a page that doesn't exist.",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  user: {
    type: Types.ObjectId,
    ref: 'User', // reference to the SubAccount model
    required: true,
  },
  posts: [{ type: Types.ObjectId, ref: 'BlogPost' }],
});

const Site = models.Site || model('Site', SiteSchema);

export default Site;
