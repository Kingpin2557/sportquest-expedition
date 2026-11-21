import type { CollectionConfig } from 'payload'

export const Challenges: CollectionConfig = {
  slug: 'challenges',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Information',
          fields: [
            {
              label: 'Title',
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              label: 'Description',
              name: 'description',
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
    update: () => true,
  },
}
