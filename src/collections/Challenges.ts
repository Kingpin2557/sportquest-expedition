import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Challenges: CollectionConfig = {
  slug: 'challenges',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Information',
          fields: [
            {
              name: 'Title',
              type: 'text',
              required: true,
            },
            {
              name: 'Description',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          label: 'Location',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'latitude', type: 'number', admin: { width: '50%' } },
                { name: 'longitude', type: 'number', admin: { width: '50%' } },
              ],
            },
            {
              name: 'picker',
              type: 'ui',
              admin: {
                components: {
                  Field: '/components/LocationPicker/LocationPicker',
                },
              },
            },
          ],
        },
      ],
    },
  ],
  access: {
    read: () => true,
  },
}
