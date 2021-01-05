const fs = require('fs')
const R = require('ramda')

const projsType = [
  ['售前', 'preSale'],
  ['售中', 'onSale'],
  ['售后', 'afterSale']

]
// 人员文件
const emps = fs.readFileSync('./emp.txt').toString('utf-8')
const empLines = emps.split(/\n/g).map(line => line.split(/\s+/g))
// 项目文件
const content = fs.readFileSync('./projs.csv').toString('utf-8')
const lines = content.split(/\n/g).splice(1).map(line => line.split(/,/g))
// 维护项目文件
const defends = fs.readFileSync('./defend.csv').toString('utf-8')
const defendLines = defends.split(/\n/g).splice(1).map(line => line.split(/,/g))
// 项目经理
const pms = empLines.filter(v => v[4].indexOf('项目经理') !== -1)
function getProjs () {
  return lines.map(l => (
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

  )
  )
}
function getDefends () {
  return defendLines.map(l => (
    {
      id: l[0],
      name: l[1] + '维护',
<<<<<<< HEAD
      leader: (pms.map(v => v[3] === l[3] && v[0])).filter(Boolean).toString(),
      budget: parseInt(l[6]),
      createDate: '',
=======
      leader: pms.filter(v => v[3] === l[3])[0][0],
      budget: parseInt(l[5].replace(/,/g, '')),
      createDate: '20200101',
>>>>>>> 94020e5fbb35fe1f58320073c778b69939bcc614
      type: projsType.map(v => v[0] === l[2] && v[1]).filter(Boolean).toString(),
      // 没有员工编号的不会显示
      participants: [].concat((pms.map(v => v[3] === l[3] && v[0])).filter(Boolean).toString()),
      contacts: []
    }
  ))
}
const all = JSON.stringify(getProjs().concat(getDefends()), undefined, '  ')

fs.writeFileSync('./projs.json', all, { flag: 'w' })
