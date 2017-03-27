import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

export const spy = sinon.spy
export const stub = sinon.stub
export const should = chai.should()
export const expect = chai.expect
