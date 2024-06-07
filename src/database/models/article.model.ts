import { Schema, model, models } from 'mongoose';

export interface IArticle {
  _id: string;
  slug: string;
  title: string;
  picture: string;
  description: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema({
  slug: { type: String, required: true },
  title: { type: String, required: true },
  picture: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Article = models.Article || model('Article', ArticleSchema);

export default Article;
