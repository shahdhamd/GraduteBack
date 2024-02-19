
import { herbModel } from "../../../../DB/model/Herb.model.js"
import { contributionModel } from "../../../../DB/model/Contribution.model.js"
import cloudinary from "../../../services/cloudinary.js"


export const createContribution = async (req, res) => {
  try {
    const { ArabicName, EnglishName, description, benefit, image, effect, place } = req.body
    const findHerb = await herbModel.findOne({ ArabicName: ArabicName })
    const findContribution = await contributionModel.findOne({ ArabicName: ArabicName })
    if (findHerb) {
      return res.json({ message: 'النبتة موجودة مسبقا' });
    }

    if (findContribution) {
      return res.json({ message: 'النبتة موجودة مسبقا' });
    }

    if (!req.file) {
      return res.json({ message: 'قم بإدراج الصورة' });
    }

    req.body.createdBy = req.user._id;

    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `plant/contribution/${req.user._id}` });

    req.body.publicId = public_id;
    req.body.image = secure_url;

    const contribution = await contributionModel.create(req.body);

    if (!contribution) {
      return res.json({ message: 'فشل اضافة المساهمة' });
    }

    return res.status(200).json({ message: 'success', contribution });

  } catch (error) {
    return res.json({ message: `catch error ${error}` })
  }

}

export const updateContribution = async (req, res) => {
  try {
    const { ArabicName, EnglishName, description, benefit, image, effect, place, verified } = req.body

    const { id } = req.params;

    const findContribution = await contributionModel.findById(id);

    if (!findContribution) {
      return res.status(400).json({ message: 'Invalid id for contribution' });
    }
    console.log('id',findContribution._id);
    req.body.contributionID=findContribution._id;
    if(findContribution){
      if(!ArabicName){
        req.body.ArabicName=findContribution.ArabicName
      }
      if(!EnglishName){
        req.body.EnglishName=findContribution.EnglishName
      }
      if(!description){
        req.body.description=findContribution.description
      }
      if(!benefit){
        req.body.benefit=findContribution.benefit
      }
      if(!effect){
        req.body.effect=findContribution.effect
      }
      if(!place){
        req.body.place=findContribution.place
      }
      if(!verified){
        req.body.verified=findContribution.verified
      }
      if(req.file){
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
          folder:`plant/user/${_id}`
        
        })
        req.body.image=secure_url;
        req.body.publicId=public_id
      }else{
        req.body.image=findContribution.image
        req.body.publicId=findContribution.publicId;
      }
        req.body.createdBy = findContribution.createdBy;
        console.log(place)
    if (verified && !findContribution.verified) {
      const herb=await herbModel.create(req.body)
    }
    console.log(req.body)
    const updateContribution = await contributionModel.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json({ message: 'succes', updateContribution });
  }}catch (error) {
    return res.status(400).json({ message: `Catch error ${error}` });
  }
};

export const getAll = async (req, res) => {
  try {
    const contribution = await contributionModel.find({}).populate([{
path:'createdBy' , select:'userName email role'
    }])
    if (!contribution) {
      return res.json({ message: 'not find herb' })
    }
    return res.status(200).json({ message: 'sucess', contribution })
  } catch (error) {
    return res.json({ message: `catch error ${error}` })
  }
}

export const deleteContribution=async(req,res)=>{
  const {id}=req.params
  const findContribution=await contributionModel.findOne({_id:id})
  if(findContribution){
    const contribution=await contributionModel.findOneAndDelete({_id:findContribution.id})
    return res.status(200).json({message:'sucess',contribution})
  }
  return res.json({message:'fail delete contribution'})
}
