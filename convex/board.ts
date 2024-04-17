import { title } from 'process';
import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

const images = [
  '/placeholders/1.svg',
  '/placeholders/2.svg',
  '/placeholders/3.svg',
  '/placeholders/4.svg',
  '/placeholders/5.svg',
  '/placeholders/6.svg',
  '/placeholders/7.svg',
  '/placeholders/8.svg',
  '/placeholders/9.svg',
  '/placeholders/10.svg',
];
export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Not authenticated');
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const board = await ctx.db.insert('boards', {
      orgId: args.orgId,
      title: args.title,
      imageUrl: randomImage,
      authorName: identity.name!,
      authorId: identity.subject,
    });
    return board;
  },
});

export const remove = mutation({
  args: { id: v.id('boards') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Not authenticated');
    const userId = identity.subject;
    const exsistingFavorite = await ctx.db
      .query('userFavorites')
      .withIndex('by_user_board', (q) =>
        q.eq('userId', userId).eq('boardId', args.id)
      )
      .unique();
    if (exsistingFavorite) {
      await ctx.db.delete(exsistingFavorite._id);
    }
    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  //TODO - Add updation and deletion by owner of the baord only not anyone else
  args: { id: v.id('boards'), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Not authenticated');
    const title = args.title.trim();
    if (!title) {
      throw new Error('Title is required');
    }
    if (title.length > 60) {
      throw new Error('Title is too long');
    }
    const board = await ctx.db.patch(args.id, { title: args.title });
    return board;
  },
});

export const favorite = mutation({
  args: { id: v.id('boards'), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Not authenticated');
    const board = await ctx.db.get(args.id);
    if (!board) throw new Error('Board not found');
    const userId = identity.subject;
    const existingFavorite = await ctx.db
      .query('userFavorites')
      .withIndex('by_user_board', (q) =>
        q.eq('userId', userId).eq('boardId', board._id)
      )
      .unique();
    if (existingFavorite) {
      throw new Error('Already favorited');
    }
    await ctx.db.insert('userFavorites', {
      orgId: args.orgId,
      userId,
      boardId: board._id,
    });
    return board;
  },
});

export const unfavorite = mutation({
  args: { id: v.id('boards') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Not authenticated');
    const board = await ctx.db.get(args.id);
    if (!board) throw new Error('Board not found');
    const userId = identity.subject;
    const existingFavorite = await ctx.db
      .query('userFavorites')
      .withIndex('by_user_board', (q) =>
        q.eq('userId', userId).eq('boardId', board._id)
      )
      .unique();
    if (!existingFavorite) {
      throw new Error('Favourited board not found');
    }
    await ctx.db.delete(existingFavorite._id);
    return board;
  },
});

export const get = query({
  args: { id: v.id('boards') },
  handler: async (ctx, args) => {
    const board = await ctx.db.get(args.id);
    if (!board) throw new Error('Board not found');
    return board;
  },
});
