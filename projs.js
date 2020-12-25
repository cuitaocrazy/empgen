const fs = require('fs')
const R = require('ramda')


// bug 项目经理和工程师姓名重复且在同一项目
const projsType = [
  ['售前', 'preSale'],
  ['售中', 'onSale'],
  ['售后', 'aflterSale']

]
// const SpcialLeader = [['25080004', '张磊']]

// 项目文件
const content = fs.readFileSync('./projs.txt').toString('utf-8')
const lines = content.split(/\n/g).map(line => line.split(/\s+/g))
// 人员文件
const emps = fs.readFileSync('./emp.txt').toString('utf-8')
const empLines = emps.split(/\n/g).map(line => line.split(/\s+/g))
// 维护项目文件
const defends = fs.readFileSync('./defend.txt').toString('utf-8')
const defendLines = defends.split(/\n/g).map(line => line.split(/\s+/g))

// 项目经理
const pms = empLines.filter(v => v[4].indexOf('项目经理') != -1)



function getProjs() {
  const projects = lines.map((l, i) =>
  (
    l[5].substr(0, 4).match(/[0-9]/g) == null ? l[5] : (l.splice(5, 0, '')),
    // l[5].substr(0, 4).match(/[0-9]/g) == null ? (l[5] = l[5] + '、' + l[4]) : (l.splice(5, 0, '')),
    {
      id: l[0],
      name: l[2],
      leader: pms.filter(v => v[3] == l[4])[0][0],
      budget: l.length < 9 ? '' : l[8],
      createDate: l[6].split('/').map(v => v.length < 2 ? '0' + v : v).join().replace(/,/g, ''),
      type: projsType.map(v => v[0] == l[3] && v[1]).filter(Boolean).toString(),
      // 没有员工编号的不会显示
      participants: R.unnest(l[5].split(/、/g).map(v => empLines.filter(t => t[3] == v))).map(v => v[0]).concat(pms.filter(v => v[3] == l[4])[0][0]),
      contacts: [
        {
          name: `test contact${i} one`,
          duties: 'manager',
          phone: `1380000000${i}`
        },
        {
          name: `test contact${i} two`,
          duties: 'manager',
          phone: `1380000000${i}`
        }
      ]
    }
  )
  )
  return projects
}
function getDefends() {
  const defendProjects = defendLines.map((l, i) =>
  (
    {
      id: l[0],
      name: l[1] + '维护',
      leader: pms.filter(v => v[3] == l[3])[0][0],
      budget: l[5],
      createDate: '',
      type: projsType.map(v => v[0] == l[2] && v[1]).filter(Boolean).toString(),
      // 没有员工编号的不会显示
      participants: pms.filter(v => v[3] == l[3])[0][0],
      contacts: [
        {
          name: `test contact${i} one`,
          duties: 'manager',
          phone: `1380000000${i}`
        },
        {
          name: `test contact${i} two`,
          duties: 'manager',
          phone: `1380000000${i}`
        }
      ]
    }
  )
  )
  return defendProjects

}
const all = JSON.stringify(getProjs().concat(getDefends()), undefined, '  ')


fs.writeFileSync('./projs.json', all, { flag: 'w' })

