'use strict';

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe('/GET apps', () => {
  it('should return an array of apps', () => {
    return request(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
      });
  });

  it.skip('should sort by app name', () => {
    return request(app)
      .get('/apps')
      .query({sort: 'app'})
      .then(res => {
        let sorted = true;
        let i = 0;
        while (sorted && res.body.length - 1) {
          sorted = sorted && res.body[i].App.toLowerCase().charCodeAt(0) < res.body[i + 1].App.toLowerCase().charCodeAt(0);
          i ++;
        }
        expect(sorted).to.be.true;
      });
  });

  it('should sort by app rating', () => {
    return request(app)
      .get('/apps')
      .query({sort: 'rating'})
      .then(res => {
        let sorted = true;
        let i = 0;
        while (sorted && res.body.length - 1) {
          sorted = sorted && res.body[i].Rating > res.body[i + 1].Rating;
          i++;
        }
        expect(sorted).to.be.true;
      });
  });
});
