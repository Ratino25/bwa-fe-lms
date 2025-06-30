import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(5, { message: "String must contain at least 5 character(s)" })
})

export const signInSchema = signUpSchema.omit({ name: true })

export const createCourseSchema = z.object({
    name: z.string().min(5),
    categoryId: z.string().min(5, { message: 'Please select a category' }),
    tagline: z.string().min(5),
    description: z.string().min(10),
    thumbnail: z.any().refine((file) => file?.name, { message: 'Thumbnail is required' })
})

export const updateCourseSchema = createCourseSchema.partial({
    thumbnail: true
})

export const mutateContentSchema = z.object({
    title: z.string().min(5),
    type: z.string().min(3, { message: 'Type is Required' }),
    youtubeId: z.string().optional(),
    text: z.string().optional(),
    // courseId: z.string().min(5)
})
    .superRefine((val, ctx) => {

        const parseVideoId = z.string().min(4).safeParse(val.youtubeId)
        const parseText = z.string().min(4).safeParse(val.text)

        if (val.type === "video") {
            if (!parseVideoId.success) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Youtube ID is Required',
                    path: ['youtubeId']
                })
            }

        }

        if (val.type === "text") {
            if (!parseText.success) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Content ID is Required',
                    path: ['text']
                })
            }
        }
    })