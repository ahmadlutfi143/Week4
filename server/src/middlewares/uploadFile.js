const multer = require('multer');

exports.uploadFile = (imageFile) => {

  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function(req, file, cb){
      cb(null, Date.now() + '-'+ file.originalname.replace(/\s/g,""));
    }
  })

  const fileFilter = function (req, file, cb){
    if(file.fieldname === imageFile){
      if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)){
        req.fileValidationError = {
          message: 'Only image files are allowed!'
        }
        return cb(new Error("Only image files are allowed!"), false)
      }
    }
    cb(null, true)
  }

  const size = 10;
  const maxSize = size * 1000 * 1000;
  const limits = {
    fileSize: maxSize
  }

 const upload = multer({
    storage,
    fileFilter,
    limits
  }).single(imageFile)

  return (req, res, next) => {
    upload(req, res, function (err) {

      if(req.fileValidationError){
        return res.send(req.fileValidationError)
      }
      
      // // If file empty
      // if(!req.file && !err){
      //   return res.send({
      //     message: 'Please select files to upload!'
      //   })
      // }

      if(err){
        if(err.code == "LIMIT_FILE_SIZE"){
          return res.send({
            message: 'Max file sized 10Mb'
          })
        }
        return res.send(err)
      }
      return next();
    })
  }
};