const { getUserId } = require('../../utils')

const playlist = {
  async createPlaylist(parent, { title }, ctx, info) {
    const userId = getUserId(ctx)
    return ctx.db.mutation.createPost(
      {
        data: {
          title,
          author: {
            connect: { id: userId },
          },
        },
      },
      info
    )
  },
}

module.exports = { playlist }
