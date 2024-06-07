'use server';

import { connectToDatabase } from '..';
import Article, { IArticle } from '../models/article.model';

export async function getArticles() {
  try {
    await connectToDatabase();

    const articles = await Article.find();

    return JSON.parse(JSON.stringify(articles)) as IArticle[];
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get articles');
  }
}

export async function getArticleById(id: string) {
  try {
    await connectToDatabase();

    const article = await Article.findById(id);

    return JSON.parse(JSON.stringify(article)) as IArticle;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get article by id');
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    await connectToDatabase();

    const article = await Article.findOne({ slug });

    return JSON.parse(JSON.stringify(article)) as IArticle;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get article by slug');
  }
}

export async function addArticle(article: Partial<IArticle>) {
  try {
    await connectToDatabase();

    await Article.create({
      ...article,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add article');
  }
}

export async function updateArticle(article: Partial<IArticle>) {
  try {
    await connectToDatabase();

    await Article.findByIdAndUpdate(article._id, {
      ...article,
      updatedAt: Date.now(),
    });
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update article');
  }
}
