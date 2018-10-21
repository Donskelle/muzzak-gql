const { getUserId } = require('../utils')

const Query = {
  feed(parent, args, ctx, info) {
    return ctx.db.query.posts({ where: { isPublished: true } }, info)
  },

  drafts(parent, args, ctx, info) {
    const id = getUserId(ctx)

    const where = {
      isPublished: false,
      author: {
        id,
      },
    }

    return ctx.db.query.posts({ ...args, where }, info)
  },

  post(parent, { id }, ctx, info) {
    return ctx.db.query.post({ where: { id } }, info)
  },

  posts(parent, args, ctx, info) {
    return ctx.db.query.posts(args, info)
  },

  me(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },

  songs(parent, args, ctx, info) {
    return ctx.db.query.songs(args, info)
  },

  users(parent, args, ctx, info) {
    return ctx.db.query.users({ args }, info)
  },

  playlists(parent, args, ctx, info) {
    return ctx.db.query.playlists(args, info)
  },

  playlist(parent, { id }, ctx, info) {
    return ctx.db.query.playlist({ where: { id } }, info)
  },
}

module.exports = { Query }
