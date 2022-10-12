const { get, pick } = require("lodash")
const messages = require("../../messages")

const handleCreateBody = (body) => {
  let errors = []
  if (!get(body, 'authorId')) {
    errors.push(messages.posts.missingAuthor)
  }
  if (!get(body, 'title')) {
    errors.push(messages.posts.missingTitle)
  }
  if (!get(body, 'thumbnailUrl')) {
    errors.push(messages.posts.missingThumbnail)
  }
  if (!get(body, 'content')) {
    errors.push(messages.posts.missingContent)
  }
  
  return {
    errors,
    body: {
      ...pick(body,
        'authorId',
        'title',
        'thumbnailUrl',
        'content')
    }
  }
}

const handleUpdateBody = (body) => {
  return {
    body: {
      ...pick(body,
        'authorId',
        'title',
        'thumbnailUrl',
        'content')
    }
  }
}

module.exports = { handleCreateBody, handleUpdateBody }