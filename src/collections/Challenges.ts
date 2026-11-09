import type { CollectionConfig } from 'payload'

export const Challenges: CollectionConfig = {
  slug: 'challenges',
  fields: [
    {
      name: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'location',
      type: 'group',
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
  access: {
    read: () => true,
  },
}
