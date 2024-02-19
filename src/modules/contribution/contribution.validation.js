import joi from 'joi'

export const createContribution = {
    body:joi.object().required().keys({
        ArabicName: joi.string().min(2).max(25).required(),
        EnglishName: joi.string().min(2).max(25).required(),
        description: joi.string().min(10).required().messages({
          'string.min': 'يجب ان يتكون الوصف من  10 احرف على الاقل ',
      }),
        benefit: joi.string().min(10).required().messages({
            'string.min': 'يجب ان يتكون الفوائد من  10 احرف على الاقل',
        }),
        effect: joi.string().min(5).required().messages({
            'string.min': 'يجب ان يتكون الاثارالجانبية  من  5 احرف على الاقل',
        }),
        place: joi.string().min(3).required().messages({
            'string.min': 'يجب ان يتكون المنشأ من  3 احرف على الاقل',
        }),
    })
};


export const updateContribution={
    body:joi.object().required().keys({
        ArabicName:joi.string().min(2).max(25),
        EnglishName:joi.string().min(2).max(25),
        description:joi.string().min(10).max(500),
        benefit:joi.string().max(1000).min(10),
        effect:joi.string().min(5).max(1000),
        place:joi.string().min(3).max(200),
        verified:joi.boolean()
    })
}


