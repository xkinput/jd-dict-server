import { casbinAdapter } from '@/plugin/casbin'
import { prisma } from '@/context'
import { UserRole } from '@/graphql'

async function start() {
  const data = [
    {
      name: '创建',
      value: 'create',
    },
    {
      name: '读取',
      value: 'read'
    },
    {
      name: '修改',
      value: 'update'
    },
    {
      name: '删除',
      value: 'delete'
    },
    {
      name: '查询',
      value: 'query'
    },
  ]
  
  await prisma.permissionAction.createMany({
    data,
    skipDuplicates: true
  })

  const permissions = [
    {
      name: '用户列表页',
      value: 'user:page',
      actions: ['read']
    },
    {
      name: '用户',
      value: 'user',
      actions: ['create', 'read', 'update', 'delete']
    },
    {
      name: '权限页',
      value: 'permission:page',
      actions: ['read']
    },
    {
      name: '权限',
      value: 'permission',
      actions: ['create', 'read', 'update', 'delete']
    },
    {
      name: '权限操作页',
      value: 'permissionAction:page',
      actions: ['read']
    },
    {
      name: '权限操作',
      value: 'permissionAction',
      actions: ['create', 'read', 'update', 'delete']
    },
    {
      name: '授权管理页',
      value: 'userEmpowement:page',
      actions: ['read']
    },
    {
      name: '角色',
      value: 'role',
      actions: ['create', 'read', 'update', 'delete']
    },
  ]

  for (let permission of permissions) {
    if (await prisma.permission.count({ where: { value: permission.value } })) continue
    await prisma.permission.create({
      data: {
        ...permission,
        actions: {
          connect: permission.actions.map(it => ({ value: it }))
        }
      },
    })
  }

}

start()
