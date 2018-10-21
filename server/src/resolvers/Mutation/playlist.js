const { getUserId } = require('../../utils')

const playlist = {
  async createPlaylist(parent, { title }, ctx, info) {
    const userId = getUserId(ctx)

    return ctx.db.mutation.createPlaylist(
      {
        data: {
          title,
          author: {
            connect: { id: userId },
          },
        },
      },
      info,
    )
  },

  async createSong(parent, { url }, ctx, info) {
    const userId = getUserId(ctx)

    return ctx.db.mutation.createSong(
      {
        data: {
          url,
          author: {
            connect: { id: userId },
          },
        },
      },
      info,
    )
  },

  async addSongToPlaylist(parent, { id, songId }, ctx, info) {
    // const userId = getUserId(ctx)

    return ctx.db.mutation.updatePlaylist({
      where: { id },
      data: {
        songs: {
          connect: { songId },
        },
      },
      info,
    })
  },

  async deletePlaylist(parent, { id }, ctx, info) {
    const userId = getUserId(ctx)
    const playlistExists = await ctx.db.exists.Playlist({
      id,
      author: { id: userId },
    })
    if (!playlistExists) {
      throw new Error(`Playlist not found or you're not the author`)
    }

    return ctx.db.mutation.deletePlaylist({
      where: {
        id,
      },
    })
  },
}

module.exports = { playlist }
