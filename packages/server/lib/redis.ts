// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Redis from 'ioredis'
import { promisify } from 'util'

const redisClient = new new Redis({
  port: 6379, // Redis port
  host: '127.0.0.1', // Redis host
  username: 'default', // needs Redis >= 6
  password: 'my-top-secret',
  db: 0, // Defaults to 0
})()

function getRedis(value: string) {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient)
  return syncRedisGet(value)

  // redisClient.get("")
}

function setRedis(key: string, value: string) {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient)
  return syncRedisSet(key, value)

  // redisClient.set("", "")
}

function delRedis(key: string, value: string) {
  const syncRedisDel = promisify(redisClient.del).bind(redisClient)
  return syncRedisDel(key, value)

  // redisClient.set("", "")
}

export { redisClient, getRedis, setRedis, delRedis }
