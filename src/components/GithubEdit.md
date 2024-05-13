
# GithubEdit Component

The `GithubEdit` component is an Astro component that generates a link to edit the current file on GitHub. It takes in the following props:

```js
export type Props = {
  slug?: string; // The slug of the file to edit
  user?: string; // The GitHub username
  repo?: string; // The GitHub repository name
  branch?: string; // The branch to edit
  path?: string; // The path to the file
};
```

## Usage

---

```astro
## import GithubEdit from '../components/GithubEdit.astro';

<GithubEdit slug="my-post" user="myusername" repo="my-repo" branch="main" path="/src/content/posts/" />
```

This will render a link to edit the file `my-post.mdx` in the `my-repo`
repository, owned by `myusername`, on the `main` branch, located at
`/src/content/posts/`.

If any of the props are not provided, the component will use the following
defaults:

- `user`: "shawn-sandy"
- `repo`: "a11y-cafe"
- `branch`: "main"
- `path`: "/src/content/posts/"

So if you don't provide any props, it will render a link to edit the current
file in the `shawn-sandy/a11y-cafe` repository, on the `main` branch, located at
`/src/content/posts/`.
