const fs = require('fs')

function getUsers () {
  const content = fs.readFileSync('./emp.txt').toString('utf-8')
  const lines = content.split(/\n/g).map(line => line.split(/\s+/g))
  return lines.map(l => ({
    username: l[0],
    enabled: true,
    firstName: l[3].slice(1),
    lastName: l[3][0],
    credentials: [{
      type: 'password',
      value: 'password'
    }]
  }))
}

function getRoles () {
  const roles = [
    ['assistant', '助理'],
    ['supervisor', '主管'],
    ['project_manager', '项目经理'],
    ['group_leader', '组长'],
    ['engineer', '工程师']
  ]

  return roles.map(r => ({ name: r[0], description: r[1] }))
}

function getGroup () {
  return [
    {
      name: '项目二部',
      path: '/项目二部',
      subGroups: [
        {
          name: '二租',
          path: '/项目二部/二租'
        },
        {
          name: '一组',
          path: '/项目二部/一组'
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
