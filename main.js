const fs = require('fs')

function getUsers () {
  const content = fs.readFileSync('./emp.txt').toString('utf-8')
  const lines = content.split(/\n/g).map(line => line.split(/\s+/g))
  return lines.map(l => ({
    requiredActions: [
      'UPDATE_PASSWORD'
    ],
    username: l[0],
    enabled: true,
    firstName: l[3].slice(1),
    lastName: l[3][0],
    email: l[5],
    realmRoles: (roles.map(v => (l[4].split(',').indexOf(v[1]) !== -1) && v[0]).filter(Boolean)).concat('offline_access', 'uma_authorization'),
    groups: [l[2]],
    clientRoles: {
      account: ['view-profile', 'manage-account']
    },
    credentials: [{
      type: 'password',
      value: 'password'
    }]
  }))
}
const roles = [
  ['assistant', '助理'],
  ['supervisor', '主管'],
  ['project_manager', '项目经理'],
  ['group_leader', '组长'],
  ['engineer', '工程师']
]
function getRoles () {
  return roles.map(r => ({ name: r[0], description: r[1] }))
}

function getGroup () {
  return [
    {
      name: '项目二部',
      path: '/项目二部',
      subGroups: [
        {
          name: '苏州组',
          path: '/项目二部/苏州组'
        },
        {
          name: '创新组',
          path: '/项目二部/创新组'
        },
        {
          name: '特色组',
          path: '/项目二部/特色组'
        }
      ]
    }
  ]
}

const genObj = {
  id: 'pm',
  realm: 'pm',
  // 默认角色
  defaultRoles: [
    'offline_access',
    'uma_authorization'
  ],
  // 国际化
  internationalizationEnabled: true,
  defaultLocale: 'zh-CN',
  smtpServer: {
    password: 'Rjeb84775655!',
    starttls: '',
    auth: 'true',
    port: '465',
    host: 'smtp.263.net',
    from: 'rjeb_service@bjyada.com',
    ssl: 'true',
    user: 'rjeb_service@bjyada.com'
  },
  ssoSessionIdleTimeout: 2592000,
  users: getUsers(),
  roles: {
    realm: getRoles()
  },
  groups: getGroup()
}
fs.writeFileSync('./emp.json', JSON.stringify(genObj, undefined, '  '), { flag: 'w' })
