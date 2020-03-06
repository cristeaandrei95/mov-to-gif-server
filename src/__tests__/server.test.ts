import * as fastify from 'fastify';
import createServer from '../server';
jest.mock('fastify');

describe('server', () => {
  const register = jest.fn(() => {});
  const listen = jest.fn(() => {});
  // @ts-ignore
  fastify.mockImplementation(() => ({
    register,
    listen,
  }));

  createServer({});

  afterAll(() => {
    // @ts-ignore
    fastify.mockClear();
  });

  it('should call fastify', () => {
    expect(fastify).toHaveBeenCalledTimes(1);
  });

  it('should register 3 middlewares', () => {
    expect(register).toHaveBeenCalledTimes(3);
  });

  it('should listen for requests', () => {
    expect(listen).toHaveBeenCalledTimes(1);
  });
});
