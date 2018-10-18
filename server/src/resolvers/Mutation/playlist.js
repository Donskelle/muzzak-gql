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
  async createSong(parent, { url }, ctx, info) {
    const userId = getUserId(ctx)

    return ctx.db.mutation.createSong({
      data: {
        url,
        author: {
          connect: { id: userId },
        },
      },
    }, info)
  },

  async addSongToPlaylist(parent, { id, songId }, ctx, info) {
    //const userId = getUserId(ctx)

    return ctx.db.mutation.updatePlaylist({
      where: { id },
      data: {
        songs: {
          connect: { songId }
        },
      },
      info,
    })
  }
}

module.exports = { playlist }
