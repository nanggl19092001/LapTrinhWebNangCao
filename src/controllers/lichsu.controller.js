
const DBconnection = require('../DB')

class lichsu{

    homePage(req,res){
        console.log(req.session.role)
        let current_user = req.session.user
        DBconnection.query(`SELECT * FROM chuyentien WHERE username = ${current_user} AND LoaiGiaoDich = 1`,(err,result) =>{
            if(err){
                res.send(JSON.stringify({code:500}))
            }
            else{
                res.render('lichsu', {transaction: result, helpers: { change(trangthai){
                    if(trangthai == 1) return 'Hoàn thành'
                    if(trangthai == 0) return 'Thất bại'
                    if(trangthai == 3) return 'Đang chờ'
                }}})
            }
        })
        
    }

    thedienthoaiInfo(req,res){
        
        let IDGiaoDich = req.params.IDGiaoDich

        DBconnection.query(`SELECT * FROM themua WHERE IDGiaoDich = ${IDGiaoDich}`, (err,result) => {
            if(err){
                return res.send(JSON.stringify({code: 500}))
            }
            else{
                for(let i = 0; i<result.length;i++){
                    if(result[i].nhamang == 'viettel'){
                        result[i].MaThe = '11111' + result[i].MaThe
                    }
                    else if(result[i].nhamang == 'mobifone'){
                        result[i].MaThe = '22222' + result[i].MaThe
                    }
                    else{
                        result[i].MaThe = '33333' + result[i].MaThe
                    }
                }

                return res.render('thedienthoaiInfo',{result})
            }
        })
    }

    ruttienPage(req,res){
        let current_user = req.session.user
        DBconnection.query(`SELECT * FROM chuyentien WHERE username = ${current_user} AND LoaiGiaoDich = 2`, (err,result) => {
            if(err){
                res.send(JSON.stringify({code: 500}))
                return false
            }
            else{
                res.render('lichsuRuttien', {giaodich: result, helpers: { change(trangthai){
                    if(trangthai == 1) return 'Hoàn thành'
                    if(trangthai == 0) return 'Thất bại'
                    if(trangthai == 3) return 'Đang chờ'
                }}})
            }
        })
    }

    thedienthoaiPage(req,res){
        let current_user = req.session.user
        DBconnection.query(`SELECT * FROM muathe WHERE username = ${current_user}`,(err,result) => {
            if(err){
                console.log(err)
                res.send(JSON.stringify({code:500}))
            }
            else{
                res.render('lichsuThedienthoai', {giaodich: result})
            }
        })
    }

    naptienPage(req,res){
        let current_user = req.session.user
        DBconnection.query(`SELECT * FROM chuyentien WHERE username = ${current_user} AND LoaiGiaoDich = 3 ORDER BY NgayThucHien DESC`, (err,result) => {
            if(err){
                res.send(JSON.stringify({code: 500}))
                return false
            }
            else{
                res.render('lichsuNaptien', {giaodich: result, helpers: { change(trangthai){
                    if(trangthai == 1) return 'Hoàn thành'
                    if(trangthai == 0) return 'Thất bại'
                    if(trangthai == 3) return 'Đang chờ'
                }}})
            }
        })
    }

}

module.exports = new lichsu