import { mutationField, nonNull } from 'nexus'
import { compareSync, genSaltSync, hashSync } from 'bcrypt'
import { User, UserStatus, Wechat } from '@prisma/client'
import axios from 'axios'
import { sign } from 'jsonwebtoken'

import { auth } from '@/api/wx'
import { TOKEN_EXPIRE_TIME, } from '@/config/app'
import { UserStatusData } from '../utils'
import { ApolloError } from 'apollo-server-koa'
import { UserRole } from '../types'
import { SignUser } from '@/utils/user'

interface Code2Session {
  openid: string;
  session_key: string;
  unionid?: string;
  errcode?: number;
  errmsg?: string;
}
/*
export const wechatSignIn = mutationField('wechatSignIn', {
  type: 'UserLogin',
  args: {
    data: nonNull('WxSignIn')
  },
  async resolve (_parent, { data }, { prisma, select, casbin }) {
    const { data: code2session } = await axios.get<Code2Session>(
      `${auth.code2Session}?${new URLSearchParams({
        appid: WX_MINI_APP.id,
        secret: WX_MINI_APP.secret,
        js_code: data.code,
        grant_type: 'authorization_code'
      })}`
    )

    const wechatData = {
      ...data.userInfo,
      openid: code2session.openid,
      unionid: code2session.unionid
    }

    const existUser = await prisma.user.findFirst({
      include: {
        wechat: true
      },
      where: {
        wechat: {
          OR: [
            {
              openid: code2session.openid
            },
            {
              unionid: code2session.unionid
            }
          ]
        }
      }
    })

    let user: User

    if (existUser) {
      await prisma.wechat.update({
        where: {
          id: existUser.wechatId
        },
        data: wechatData
      })
      user = await prisma.user.findUnique({
        where: {
          id: existUser.id
        }
      })
    } else {
      try {
        user = await prisma.user.create({
          data: {
            level: {
              connect: {
                name: Levels.NORMAL
              }
            },
            signUpType: 'WECHAT',
            wechat: {
              create: wechatData
            },
            roles: {
              connect: {
                value: UserRole.CLIENT
              }
            }
          }
        })
      } catch (e) {
        throw e
      }
    }

    await casbin.e.addRoleForUser(wechatData.openid, UserRole.CLIENT)

    return {
      token: sign(
        {
          id: user.id,
          name: user.name,
          skey: code2session.session_key,
          opid: wechatData.openid
        } as SignUser,
        APP_JWT_SECRET,
        {
          expiresIn: TOKEN_EXPIRE_TIME
        }
      )
    }
  }
})
*/

console.log(process.env)
export const login = mutationField('login', {
  type: 'UserLogin',
  args: {
    data: nonNull('UserLoginInput')
  },
  async resolve (_parent, { data }, { prisma, ctx }) {
    const user = await prisma.user.findUnique({
      where: {
        name: data.name
      },
      include: {
        roles: true
      },
      rejectOnNotFound (e) {
        throw new ApolloError(`未找到 ${data.name} 用户`)
      }
    })

    const valid = compareSync(data.password, user.password)
    if (!valid) throw new ApolloError('账户名或密码不正确')

    // 检查状态
    const findStatusData = UserStatusData.find((item) =>
      item.status === user.status
    )
    if (findStatusData && findStatusData.status !== UserStatus.ENABLE) {
      throw new ApolloError(findStatusData.msg, '403', {
        desc: findStatusData.desc
      })
    }

    const userInfo = {
      id: user.id,
      name: user.name
    }

    return Object.assign(userInfo, {
      token: sign(
        {
          ...userInfo
        },
        process.env.APP_JWT_SECRET,
        {
          expiresIn: TOKEN_EXPIRE_TIME
        }
      )
    })
  }
})

export const signUp = mutationField('signUp', {
  type: 'User',
  args: {
    data: nonNull('UserSignUpInput')
  },
  validate: ({ string, object }) => ({
    data: object({
      name: string().min(3, '名称最少3位').max(30, '名称最大30位'),
      password: string().min(6, '密码最少6位').max(30, '密码最大30位'),
    })
  }),
  async resolve (_parent, { data }, { prisma, ctx, casbin }) {
    if (!casbin?.e?.addGroupingPolicy) throw new ApolloError('请刷新后重试')

    const { password, name, ...otherData } = data

    const hashedPassword = password ? hashSync(password, genSaltSync(12)) : ''

    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        roles: {
          connect: {
            value: UserRole.CLIENT
          }
        },
        signUpType: 'USERNAME',
        ...otherData
      }
    })

    await casbin.e.addRoleForUser(name, UserRole.CLIENT)

    return user
  }
})
