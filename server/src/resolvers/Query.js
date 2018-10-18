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
        id
      }
    }

    return ctx.db.query.posts({ where }, info)
  },

  post(parent, { id }, ctx, info) {
    return ctx.db.query.post({ where: { id } }, info)
  },

  posts({ user: { id } }, args, ctx, info) {
    return ctx.db.query.posts(args, info)
  },

  me(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },

  users(parent, args, ctx, info) {
    return ctx.db.query.users({
      args
    }, info)
  },

  playlists(parent, args, ctx, info) {
    return ctx.db.query.playlists(args, info)
  },

  playlist(parent, args, ctx, info) {
    return ctx.db.query.playlist(args, info)
  },

  // User: {
  //   posts(parent, args, ctx, info) {
  //     return ctx.db.query.posts({ where: { author: { id: parent.id } } })
  //   }
  // },
}

module.exports = { Query }
