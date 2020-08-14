
const app = require('../src/app');
const store = require('../src/store');
const supertest = require('supertest');


describe('Bookmarks Endpoints', () => {
  let bookmarksCopy;
  beforeEach('copy the bookmarks', () => {
    bookmarksCopy = store.bookmarks.slice();
  });
  afterEach('restore the bookmarrks', () => {
    store.bookmarks = bookmarksCopy;
  });
});

describe('Unauthorized Request', () => {
  it('respondds to unauthorized request with 401', () => {
    return supertest(app)
      .get('/bookmarks')
      .expect(401, { error: 'Unauthorized request' });
  });
  it('responds with 401 for GET specific bookmark', () => {
    const bookmark = store.bookmarks[0];
    return supertest(app)
      .get(`/bookmarks${bookmark.id}`)
      .expect(401, { error: 'Unauthorized request' });
  });
  it('respondds with 401 for DELETE bookmark', () => {
    const bookmark = store.bookmarks[1];
    return supertest(app)
      .get(`/bookmarks${bookmark.id}`)
      .expect(401, { error: 'Unauthorized request' });
  });
});


describe('DELETE /bookmarks/:id', () => {
  it('removes the bookmark by ID from the store', () => {
    const secondBookmark = store.bookmarks[1];
    const expectedBookmarks = store.bookmarks.filter(s => s.id !== secondBookmark.id);
    return supertest(app)
      .delete(`/bookmarks/${secondBookmark.id}`)
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(204)
      .then(() => {
        expect(store.bookmarks).to.eql(expectedBookmarks);
      });
  });

  it('returns 404 if bookmark doesn\'t exist', () => {
    return supertest(app)
      .delete('/bookmarks/doesnt-exist')
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(404, 'Not found.');
  });
});

describe('POST /bookmarks', () => {
  it('responds with 400 missing \'title\' if not supplied', () => {
    const newBookmarkMissingTitle = {
      // title: 'test-title',
      url: 'https://test.com',
      rating: 1,
    };
    return supertest(app)
      .post('/bookmarks')
      .send(newBookmarkMissingTitle)
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(400, 'Invalid data');
  });

  it('responds with 400 missing \'url\' if not supplied', () => {
    const newBookmarkMissingUrl = {
      title: 'test-title',
      // url: 'https://test.com',
      rating: 1,
    };
    return supertest(app)
      .post('/bookmarks')
      .send(newBookmarkMissingUrl)
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(400, 'Invalid data');
  });

  it('responds with 400 missing \'rating\' if not supplied', () => {
    const newBookmarkMissingRating = {
      title: 'test-title',
      url: 'https://test.com',
      // rating: 1,
    };
    return supertest(app)
      .post('/bookmarks')
      .send(newBookmarkMissingRating)
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(400, 'Invalid data');
  });

  it('responds with 400 invalid \'rating\' if not between 0 and 5', () => {
    const newBookmarkInvalidRating = {
      title: 'test-title',
      url: 'https://test.com',
      rating: 'invalid',
    };
    return supertest(app)
      .post('/bookmarks')
      .send(newBookmarkInvalidRating)
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(400, 'Invalid data');
  });

  it('responds with 400 invalid \'url\' if not a valid URL', () => {
    const newBookmarkInvalidUrl = {
      title: 'test-title',
      url: 'htp://invalid-url',
      rating: 1,
    };
    return supertest(app)
      .post('/bookmarks')
      .send(newBookmarkInvalidUrl)
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(400, 'Invalid data');
  });

  it('adds a new bookmark to the store', () => {
    const newBookmark = {
      title: 'test-title',
      url: 'https://test.com',
      description: 'test description',
      rating: 1,
    };
    return supertest(app)
      .post('/bookmarks')
      .send(newBookmark)
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(201)
      .expect(res => {
        expect(res.body.title).to.eql(newBookmark.title);
        expect(res.body.url).to.eql(newBookmark.url);
        expect(res.body.description).to.eql(newBookmark.description);
        expect(res.body.rating).to.eql(newBookmark.rating);
        expect(res.body.id).to.be.a('string');
      })
      .then(res => {
        expect(store.bookmarks[store.bookmarks.length - 1]).to.eql(res.body);
      });
  });
});
