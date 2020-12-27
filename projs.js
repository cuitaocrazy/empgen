const fs = require('fs')
const R = require('ramda')

const projsType = [
  ['售前', 'preSale'],
  ['售中', 'onSale'],
  ['售后', 'afterSale']

]
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
const pms = empLines.filter(v => v[4].indexOf('项目经理') !== -1)
// l[5].substr(0, 4).match(/[0-9]/g) == null ? (l[5] = l[5] + '、' + l[4]) : (l.splice(5, 0, '')),
function getProjs () {
  return lines.map(l => ((
    l[5].substr(0, 4).match(/[0-9]/g) === null ? l[5] : (l.splice(5, 0, '')),
    {
      id: l[0],
      name: l[2],
      leader: pms.filter(v => v[3] === l[4])[0][0],
      budget: parseInt((l.length < 9 ? '' : l[8]).replace(/,/g, '')),
      createDate: l[6].split('/').map(v => v.length < 2 ? '0' + v : v).join().replace(/,/g, ''),
      type: projsType.map(v => v[0] === l[3] && v[1]).filter(Boolean).toString(),
      // 没有员工编号的不会显示
      participants: R.unnest(l[5].split(/、/g).map(v => empLines.filter(t => t[3] === v))).map(v => v[0]).concat(pms.filter(v => v[3] === l[4])[0][0]),
      contacts: []
    }
  )))
}
function getDefends () {
  return defendLines.map(l => (
    {
      id: l[0],
      name: l[1] + '维护',
      leader: pms.filter(v => v[3] === l[3])[0][0],
      budget: parseInt(l[5].replace(/,/g, '')),
      createDate: '20200101',
      type: projsType.map(v => v[0] === l[2] && v[1]).filter(Boolean).toString(),
      // 没有员工编号的不会显示
      participants: [].concat(pms.filter(v => v[3] === l[3])[0][0]),
      contacts: []
    }
  ))
}
const all = JSON.stringify(getProjs().concat(getDefends()), undefined, '  ')

fs.writeFileSync('./projs.json', all, { flag: 'w' })
