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
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/LocationPicker/LocationPicker',
        },
      },
    },
  ],
  access: {
    read: () => true,
  },
}
