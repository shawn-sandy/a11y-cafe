# CollectionList.astro

## Overview

The `CollectionList.astro` file is an Astro component that renders a list of blog posts or other content items from a specified collection. It fetches the collection data, filters out draft items, sorts the items by publication date (newest first), and displays a limited number of items with their titles, descriptions, and links.

## Functionality

1. **Imports**
   - The component imports the necessary modules and components, including `getCollection` from `astro:content`, `BlogPosts` component, and type definitions.

2. **Props**
   - The component accepts the following props:
     - `collectionTitle` (optional): The title to display for the collection.
     - `pageSize` (optional): The number of items to display per page.
     - `to` (optional): The base URL path for the item links.
     - `collection` (optional): The name of the collection to fetch.
     - `startCount` (optional): The index to start displaying items from.

3. **Data Fetching**
   - The component uses `getCollection` to fetch the specified collection (defaults to "posts").
   - It filters out draft items (`data.draft === false`).
   - It sorts the items by publication date in descending order.
   - It slices the sorted array to display only the specified number of items (`PAGINATION_COUNT` or 3 by default).

4. **Rendering**
   - If `collectionTitle` is provided, it renders an `<h3>` element with the title.
   - It maps over the filtered and sorted collection items.
   - For each item, it renders a `BlogPosts` component with the item's `title`, `description`, and a link constructed from the `to` prop and the item's `slug`.

## Usage

To use the `CollectionList` component, import it into your Astro file and pass the required props:

```js
---
## import CollectionList from '../components/astro/CollectionList.astro'

---

<CollectionList collectionTitle="Latest Blog Posts" to="blog" />
```

This will render a list of the latest blog posts with their titles,
descriptions, and links to the individual post pages.

You can customize the behavior by passing additional props, such as `pageSize`
to control the number of items displayed, or `collection` to fetch a different
content collection.
