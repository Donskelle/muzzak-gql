module.exports = {
        typeDefs: /* GraphQL */ `type AggregateJamSession {
  count: Int!
}

type AggregatePlaylist {
  count: Int!
}

type AggregateSong {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

type JamSession {
  id: ID!
  playlist: Playlist
  onlineUser(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  currentSong: Song
  currentTime: Int
  status: jamStatus
}

type JamSessionConnection {
  pageInfo: PageInfo!
  edges: [JamSessionEdge]!
  aggregate: AggregateJamSession!
}

input JamSessionCreateInput {
  playlist: PlaylistCreateOneInput
  onlineUser: UserCreateManyWithoutJamInput
  currentSong: SongCreateOneInput
  currentTime: Int
  status: jamStatus
}

input JamSessionCreateOneWithoutOnlineUserInput {
  create: JamSessionCreateWithoutOnlineUserInput
  connect: JamSessionWhereUniqueInput
}

input JamSessionCreateWithoutOnlineUserInput {
  playlist: PlaylistCreateOneInput
  currentSong: SongCreateOneInput
  currentTime: Int
  status: jamStatus
}

type JamSessionEdge {
  node: JamSession!
  cursor: String!
}

enum JamSessionOrderByInput {
  id_ASC
  id_DESC
  currentTime_ASC
  currentTime_DESC
  status_ASC
  status_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type JamSessionPreviousValues {
  id: ID!
  currentTime: Int
  status: jamStatus
}

type JamSessionSubscriptionPayload {
  mutation: MutationType!
  node: JamSession
  updatedFields: [String!]
  previousValues: JamSessionPreviousValues
}

input JamSessionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: JamSessionWhereInput
  AND: [JamSessionSubscriptionWhereInput!]
  OR: [JamSessionSubscriptionWhereInput!]
  NOT: [JamSessionSubscriptionWhereInput!]
}

input JamSessionUpdateInput {
  playlist: PlaylistUpdateOneInput
  onlineUser: UserUpdateManyWithoutJamInput
  currentSong: SongUpdateOneInput
  currentTime: Int
  status: jamStatus
}

input JamSessionUpdateOneWithoutOnlineUserInput {
  create: JamSessionCreateWithoutOnlineUserInput
  update: JamSessionUpdateWithoutOnlineUserDataInput
  upsert: JamSessionUpsertWithoutOnlineUserInput
  delete: Boolean
  disconnect: Boolean
  connect: JamSessionWhereUniqueInput
}

input JamSessionUpdateWithoutOnlineUserDataInput {
  playlist: PlaylistUpdateOneInput
  currentSong: SongUpdateOneInput
  currentTime: Int
  status: jamStatus
}

input JamSessionUpsertWithoutOnlineUserInput {
  update: JamSessionUpdateWithoutOnlineUserDataInput!
  create: JamSessionCreateWithoutOnlineUserInput!
}

input JamSessionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  playlist: PlaylistWhereInput
  onlineUser_every: UserWhereInput
  onlineUser_some: UserWhereInput
  onlineUser_none: UserWhereInput
  currentSong: SongWhereInput
  currentTime: Int
  currentTime_not: Int
  currentTime_in: [Int!]
  currentTime_not_in: [Int!]
  currentTime_lt: Int
  currentTime_lte: Int
  currentTime_gt: Int
  currentTime_gte: Int
  status: jamStatus
  status_not: jamStatus
  status_in: [jamStatus!]
  status_not_in: [jamStatus!]
  AND: [JamSessionWhereInput!]
  OR: [JamSessionWhereInput!]
  NOT: [JamSessionWhereInput!]
}

input JamSessionWhereUniqueInput {
  id: ID
}

enum jamStatus {
  PAUSE
  START
  STOP
}

scalar Long

type Mutation {
  createJamSession(data: JamSessionCreateInput!): JamSession!
  updateJamSession(data: JamSessionUpdateInput!, where: JamSessionWhereUniqueInput!): JamSession
  updateManyJamSessions(data: JamSessionUpdateInput!, where: JamSessionWhereInput): BatchPayload!
  upsertJamSession(where: JamSessionWhereUniqueInput!, create: JamSessionCreateInput!, update: JamSessionUpdateInput!): JamSession!
  deleteJamSession(where: JamSessionWhereUniqueInput!): JamSession
  deleteManyJamSessions(where: JamSessionWhereInput): BatchPayload!
  createPlaylist(data: PlaylistCreateInput!): Playlist!
  updatePlaylist(data: PlaylistUpdateInput!, where: PlaylistWhereUniqueInput!): Playlist
  updateManyPlaylists(data: PlaylistUpdateInput!, where: PlaylistWhereInput): BatchPayload!
  upsertPlaylist(where: PlaylistWhereUniqueInput!, create: PlaylistCreateInput!, update: PlaylistUpdateInput!): Playlist!
  deletePlaylist(where: PlaylistWhereUniqueInput!): Playlist
  deleteManyPlaylists(where: PlaylistWhereInput): BatchPayload!
  createSong(data: SongCreateInput!): Song!
  updateSong(data: SongUpdateInput!, where: SongWhereUniqueInput!): Song
  updateManySongs(data: SongUpdateInput!, where: SongWhereInput): BatchPayload!
  upsertSong(where: SongWhereUniqueInput!, create: SongCreateInput!, update: SongUpdateInput!): Song!
  deleteSong(where: SongWhereUniqueInput!): Song
  deleteManySongs(where: SongWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Playlist {
  id: ID!
  name: String!
  owner: User!
  createdAt: DateTime!
  updatedAt: DateTime!
  songs(where: SongWhereInput, orderBy: SongOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Song!]
}

type PlaylistConnection {
  pageInfo: PageInfo!
  edges: [PlaylistEdge]!
  aggregate: AggregatePlaylist!
}

input PlaylistCreateInput {
  name: String!
  owner: UserCreateOneWithoutPlaylistsInput!
  songs: SongCreateManyInput
}

input PlaylistCreateManyWithoutOwnerInput {
  create: [PlaylistCreateWithoutOwnerInput!]
  connect: [PlaylistWhereUniqueInput!]
}

input PlaylistCreateOneInput {
  create: PlaylistCreateInput
  connect: PlaylistWhereUniqueInput
}

input PlaylistCreateWithoutOwnerInput {
  name: String!
  songs: SongCreateManyInput
}

type PlaylistEdge {
  node: Playlist!
  cursor: String!
}

enum PlaylistOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PlaylistPreviousValues {
  id: ID!
  name: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type PlaylistSubscriptionPayload {
  mutation: MutationType!
  node: Playlist
  updatedFields: [String!]
  previousValues: PlaylistPreviousValues
}

input PlaylistSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PlaylistWhereInput
  AND: [PlaylistSubscriptionWhereInput!]
  OR: [PlaylistSubscriptionWhereInput!]
  NOT: [PlaylistSubscriptionWhereInput!]
}

input PlaylistUpdateDataInput {
  name: String
  owner: UserUpdateOneRequiredWithoutPlaylistsInput
  songs: SongUpdateManyInput
}

input PlaylistUpdateInput {
  name: String
  owner: UserUpdateOneRequiredWithoutPlaylistsInput
  songs: SongUpdateManyInput
}

input PlaylistUpdateManyWithoutOwnerInput {
  create: [PlaylistCreateWithoutOwnerInput!]
  delete: [PlaylistWhereUniqueInput!]
  connect: [PlaylistWhereUniqueInput!]
  disconnect: [PlaylistWhereUniqueInput!]
  update: [PlaylistUpdateWithWhereUniqueWithoutOwnerInput!]
  upsert: [PlaylistUpsertWithWhereUniqueWithoutOwnerInput!]
}

input PlaylistUpdateOneInput {
  create: PlaylistCreateInput
  update: PlaylistUpdateDataInput
  upsert: PlaylistUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: PlaylistWhereUniqueInput
}

input PlaylistUpdateWithoutOwnerDataInput {
  name: String
  songs: SongUpdateManyInput
}

input PlaylistUpdateWithWhereUniqueWithoutOwnerInput {
  where: PlaylistWhereUniqueInput!
  data: PlaylistUpdateWithoutOwnerDataInput!
}

input PlaylistUpsertNestedInput {
  update: PlaylistUpdateDataInput!
  create: PlaylistCreateInput!
}

input PlaylistUpsertWithWhereUniqueWithoutOwnerInput {
  where: PlaylistWhereUniqueInput!
  update: PlaylistUpdateWithoutOwnerDataInput!
  create: PlaylistCreateWithoutOwnerInput!
}

input PlaylistWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  owner: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  songs_every: SongWhereInput
  songs_some: SongWhereInput
  songs_none: SongWhereInput
  AND: [PlaylistWhereInput!]
  OR: [PlaylistWhereInput!]
  NOT: [PlaylistWhereInput!]
}

input PlaylistWhereUniqueInput {
  id: ID
}

type Query {
  jamSession(where: JamSessionWhereUniqueInput!): JamSession
  jamSessions(where: JamSessionWhereInput, orderBy: JamSessionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [JamSession]!
  jamSessionsConnection(where: JamSessionWhereInput, orderBy: JamSessionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): JamSessionConnection!
  playlist(where: PlaylistWhereUniqueInput!): Playlist
  playlists(where: PlaylistWhereInput, orderBy: PlaylistOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Playlist]!
  playlistsConnection(where: PlaylistWhereInput, orderBy: PlaylistOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PlaylistConnection!
  song(where: SongWhereUniqueInput!): Song
  songs(where: SongWhereInput, orderBy: SongOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Song]!
  songsConnection(where: SongWhereInput, orderBy: SongOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SongConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Song {
  id: ID!
  name: String!
  source: String!
  icon: String
}

type SongConnection {
  pageInfo: PageInfo!
  edges: [SongEdge]!
  aggregate: AggregateSong!
}

input SongCreateInput {
  name: String!
  source: String!
  icon: String
}

input SongCreateManyInput {
  create: [SongCreateInput!]
  connect: [SongWhereUniqueInput!]
}

input SongCreateOneInput {
  create: SongCreateInput
  connect: SongWhereUniqueInput
}

type SongEdge {
  node: Song!
  cursor: String!
}

enum SongOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  source_ASC
  source_DESC
  icon_ASC
  icon_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SongPreviousValues {
  id: ID!
  name: String!
  source: String!
  icon: String
}

type SongSubscriptionPayload {
  mutation: MutationType!
  node: Song
  updatedFields: [String!]
  previousValues: SongPreviousValues
}

input SongSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SongWhereInput
  AND: [SongSubscriptionWhereInput!]
  OR: [SongSubscriptionWhereInput!]
  NOT: [SongSubscriptionWhereInput!]
}

input SongUpdateDataInput {
  name: String
  source: String
  icon: String
}

input SongUpdateInput {
  name: String
  source: String
  icon: String
}

input SongUpdateManyInput {
  create: [SongCreateInput!]
  update: [SongUpdateWithWhereUniqueNestedInput!]
  upsert: [SongUpsertWithWhereUniqueNestedInput!]
  delete: [SongWhereUniqueInput!]
  connect: [SongWhereUniqueInput!]
  disconnect: [SongWhereUniqueInput!]
}

input SongUpdateOneInput {
  create: SongCreateInput
  update: SongUpdateDataInput
  upsert: SongUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: SongWhereUniqueInput
}

input SongUpdateWithWhereUniqueNestedInput {
  where: SongWhereUniqueInput!
  data: SongUpdateDataInput!
}

input SongUpsertNestedInput {
  update: SongUpdateDataInput!
  create: SongCreateInput!
}

input SongUpsertWithWhereUniqueNestedInput {
  where: SongWhereUniqueInput!
  update: SongUpdateDataInput!
  create: SongCreateInput!
}

input SongWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  source: String
  source_not: String
  source_in: [String!]
  source_not_in: [String!]
  source_lt: String
  source_lte: String
  source_gt: String
  source_gte: String
  source_contains: String
  source_not_contains: String
  source_starts_with: String
  source_not_starts_with: String
  source_ends_with: String
  source_not_ends_with: String
  icon: String
  icon_not: String
  icon_in: [String!]
  icon_not_in: [String!]
  icon_lt: String
  icon_lte: String
  icon_gt: String
  icon_gte: String
  icon_contains: String
  icon_not_contains: String
  icon_starts_with: String
  icon_not_starts_with: String
  icon_ends_with: String
  icon_not_ends_with: String
  AND: [SongWhereInput!]
  OR: [SongWhereInput!]
  NOT: [SongWhereInput!]
}

input SongWhereUniqueInput {
  id: ID
}

type Subscription {
  jamSession(where: JamSessionSubscriptionWhereInput): JamSessionSubscriptionPayload
  playlist(where: PlaylistSubscriptionWhereInput): PlaylistSubscriptionPayload
  song(where: SongSubscriptionWhereInput): SongSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  email: String!
  image: String
  name: String!
  birth: DateTime!
  playlists(where: PlaylistWhereInput, orderBy: PlaylistOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Playlist!]
  jam: JamSession
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  image: String
  name: String!
  birth: DateTime!
  playlists: PlaylistCreateManyWithoutOwnerInput
  jam: JamSessionCreateOneWithoutOnlineUserInput
}

input UserCreateManyWithoutJamInput {
  create: [UserCreateWithoutJamInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneWithoutPlaylistsInput {
  create: UserCreateWithoutPlaylistsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutJamInput {
  email: String!
  image: String
  name: String!
  birth: DateTime!
  playlists: PlaylistCreateManyWithoutOwnerInput
}

input UserCreateWithoutPlaylistsInput {
  email: String!
  image: String
  name: String!
  birth: DateTime!
  jam: JamSessionCreateOneWithoutOnlineUserInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  image_ASC
  image_DESC
  name_ASC
  name_DESC
  birth_ASC
  birth_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  image: String
  name: String!
  birth: DateTime!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  email: String
  image: String
  name: String
  birth: DateTime
  playlists: PlaylistUpdateManyWithoutOwnerInput
  jam: JamSessionUpdateOneWithoutOnlineUserInput
}

input UserUpdateManyWithoutJamInput {
  create: [UserCreateWithoutJamInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutJamInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutJamInput!]
}

input UserUpdateOneRequiredWithoutPlaylistsInput {
  create: UserCreateWithoutPlaylistsInput
  update: UserUpdateWithoutPlaylistsDataInput
  upsert: UserUpsertWithoutPlaylistsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutJamDataInput {
  email: String
  image: String
  name: String
  birth: DateTime
  playlists: PlaylistUpdateManyWithoutOwnerInput
}

input UserUpdateWithoutPlaylistsDataInput {
  email: String
  image: String
  name: String
  birth: DateTime
  jam: JamSessionUpdateOneWithoutOnlineUserInput
}

input UserUpdateWithWhereUniqueWithoutJamInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutJamDataInput!
}

input UserUpsertWithoutPlaylistsInput {
  update: UserUpdateWithoutPlaylistsDataInput!
  create: UserCreateWithoutPlaylistsInput!
}

input UserUpsertWithWhereUniqueWithoutJamInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutJamDataInput!
  create: UserCreateWithoutJamInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  birth: DateTime
  birth_not: DateTime
  birth_in: [DateTime!]
  birth_not_in: [DateTime!]
  birth_lt: DateTime
  birth_lte: DateTime
  birth_gt: DateTime
  birth_gte: DateTime
  playlists_every: PlaylistWhereInput
  playlists_some: PlaylistWhereInput
  playlists_none: PlaylistWhereInput
  jam: JamSessionWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    