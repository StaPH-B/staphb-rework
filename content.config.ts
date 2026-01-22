import { defineContentConfig, defineCollection } from '@nuxt/content'
import {z} from 'zod'

export default defineContentConfig({
  collections: {
    page_content: defineCollection({
      type: 'page',
      source: 'page_content/*.md',
    }),
    pipelines: defineCollection({
      type: 'data',
      source: 'pipelines/*.csv',
      schema: z.object({
        pipeline_name: z.string(),
        pipeline_url: z.url(),
        pipeline_description: z.string(),
        pipeline_language: z.string(),
        pipeline_ownership: z.string(),
        pipeline_keywords: z.string().transform(value => value.split(',').map(k => k.trim()))
      }),
      // indexes: [
      //   {columns: ['pipeline_name']},
      //   {columns: ['pipeline_description']},
      //   {columns: ['pipeline_language']},
      //   {columns: ['pipeline_ownership']},
      //   {columns: ['pipeline_keywords']},

      //   {columns: ['pipeline_language','pipeline_keywords']},
      // ]
    })
  },
})
