const multer=require("multer");
const { nanoid } = require("nanoid");
const path=require("path");


//获取绝对路径
let fullPath=path.resolve(__dirname+"/upload");
let storage=multer.diskStorage({
	//设置存储路径
    destination:(req,file,cb)=>{
        console.log("destination:",file);//打印结果如下图
        cb(null,"./upload");
    },
    //设置存储的文件名
    filename:(req,file,cb)=>{
        console.log("filename:",file);//打印结果如下图
        //获取文件的扩展名
        let extname=path.extname(file.originalname);
        let filename1=file.originalname.split('.')[0]+"-"+Date.now() + "-" + nanoid() + extname;
        cb(null,filename1);
    }
})

const uploadFile2 = multer({ storage });

function uploadFile(req,res,next){
	//dest 值为文件存储的路径;single方法,表示上传单个文件,参数为表单数据对应的key
	let upload=multer({dest:"upload/"}).single("file");
	upload(req,res,(err)=>{
		//打印结果看下面的截图
	    console.log(req.file);
		if(err){
	        res.send("err:"+err);
	    }else{
	        //将文件信息赋值到req.body中，继续执行下一步
	        req.body.filename=req.file.filename;
	        next();
	    }
	})
}

module.exports =  {
    uploadFile: uploadFile2
}