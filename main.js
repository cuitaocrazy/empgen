const fs = require('fs')

function getUsers () {
  const content = fs.readFileSync('./emp.txt').toString('utf-8')
  const lines = content.split(/\n/g).map(line => line.split(/\s+/g))
  return lines.map(l => ({
    username: l[0],
    enabled: true,
    firstName: l[3].slice(1),
    lastName: l[3][0],
    email:l[5],
    realmRoles: (roles.map(v=>v[1]===l[4]&&v[0]).filter(Boolean)).concat("offline_access", "uma_authorization"),
    groups: [l[6]!==undefined?l[2]+"/"+l[6]:l[2]],
    clientRoles: {
      "account": ["view-profile", "manage-account"]
  },
    credentials: [{
      type: 'password',
      value: 'password'
    }],


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
  users: getUsers(),
  roles: {
    realm: getRoles()
  },
  groups: getGroup()
}
fs.writeFileSync('./emp.json', JSON.stringify(genObj, undefined, '  '), { flag: 'w' })
