# Img.astro

This Astro component is used to render an image with optional caption and
dimensions.

## Props

- `imgSrc` (required): The source URL of the image.
- `imgCaption` (optional): The caption text to display below the image.
- `imgAlt` (optional): The alternative text for the image.
- `imgWidth` (optional): The width of the image in pixels.
- `imgHeight` (optional): The height of the image in pixels.

## Usage

```js
---
import Img from './Img.astro'
---

<Img 
  imgSrc="/images/example.jpg"
  imgAlt="Example Image"
  imgWidth={800}
  imgHeight={600}
  imgCaption="This is an example image caption."
/>
```

This will render an image with the specified source, alternative text,
dimensions, and caption.
