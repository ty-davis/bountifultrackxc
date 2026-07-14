import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: 'page',
            source: '**/*.md',
            schema: z.object({
                date: z.string(),
                season: z.enum(['Cross Country', 'Indoor Track', 'Outdoor Track']),
                location: z.string().optional(),
                results: z.string().optional(),
                startTime: z.string().optional(),
                address: z.string().optional(),
                googleMapsLink: z.string().optional(),
                busDepart: z.string().optional(),
                busReturn: z.string().optional(),
            })
        })
    }
})

