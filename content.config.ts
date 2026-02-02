import { defineContentConfig, defineCollection } from '@nuxt/content'
import {z} from 'zod'

export default defineContentConfig({
  collections: {
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
    }),
    resources: defineCollection({
      type: 'data',
      source: 'resources/*.csv',
      schema: z.object({
        resource_name: z.string(),
        resource_url: z.url(),
        resource_description: z.string(),
        resource_keywords: z.string().transform(value => value.split(',').map(k => k.trim()))
      }),
    })
  },
})
