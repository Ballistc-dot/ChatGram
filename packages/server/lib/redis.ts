// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Redis from 'ioredis'
import { promisify } from 'util'

const redisClient = new Redis()

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
