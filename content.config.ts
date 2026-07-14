import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: 'page',
            source: '**/*.md',
            schema: z.object({
                date: z.string(),
                location: z.string().optional(),
                results: z.string().optional(),
            })
        })
    }
})

