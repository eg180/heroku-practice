const db = require('../../data/db-config')

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

function get() {
  // SELECT * FROM posts;
  // return db('posts')
  // SELECT id, title, contents FROM posts;
  return db()
    .from('posts')
    .select('id as post_id', 'title', 'contents')
}

function getById(id) {
  // SELECT * FROM posts WHERE id = 1;
  // return db('posts').where({ id, bar: 'bar' })
  return db('posts').where('id', id).first()
}

function create(post) {
  // INSERT INTO posts (title, contents) VALUES ('foo', 'bar');
  return db('posts').insert(post)
    .then(([id]) => {
      return getById(id)
    })
}

function update(id, post) {
  // UPDATE posts SET title = 'foo', contents = 'bar' WHERE id = 1;
  return db('posts').update(post).where('id', id)
    .then(() => {
      return getById(id)
    })
}
async function remove(id) {
  // DELETE FROM posts WHERE id = 1;
  const postToDelete = await getById(id)
  await db('posts').delete().where('id', id)
  return Promise.resolve(postToDelete)
}
