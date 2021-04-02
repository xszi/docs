const dataArr = [
    { type: '治理层', name: 'hive_82', reserve: '2', id: 1 },
    { type: '原始数据层', name: 'qwe', reserve: '1', id: 2 },
    { type: '贴源层', name: 'mysql_exchangis', reserve: '3', id: 3 },
    { type: '治理层', name: 'links_188', reserve: '1', id: 4 },
    { type: '贴源层', name: 'mysql_ces', reserve: '2', id: 5 }
]

const treeData = dataArr.reduce((cur, next) => {
    const obj = cur.find(curItem => curItem.label === next.type) 
    if (obj) { 
        if (obj.children.indexOf(next.id) === -1) { //去重处理
            obj.children.push({ 
                ...next, 
                label: next.name 
            })
        }
    } else {
        const newObj = {
            label: next.type,
            children: [{
                ...next,
                label: next.name
            }]
        }
        cur.push(newObj)
    }
    return cur
}, []);
console.log(treeData)