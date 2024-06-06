import { Schema, model, models } from 'mongoose';

export interface IExample {
  _id: string;
  id: number;
  name: string;
  description: string;
  domainCount: number;
  url: string;
  image: string;
  imageBlurhash: string;
}

const ExampleSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: false },
  description: { type: String, required: false },
  domainCount: { type: Number, required: false },
  url: { type: String, required: false },
  image: { type: String, required: false },
  imageBlurhash: { type: String, required: false },
});

const Example = models.Example || model('Example', ExampleSchema);

export default Example;
