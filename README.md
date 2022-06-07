# Generate sha-256 hashes for netlify

Generates hashes for any inline script you have in your html and adds them to the netlify headers file

### How to run

```
node generate-hashes
```

or add to your build process, eg in package.json

```
"scripts": {
    "hashes": "node generate-hashes",
...
```

You'll need a pre-existing `_headers` file, or there will be nothing to modify. An example file is included here in `dist`. Make sure the `script-src` section of `Content-Security-Policy` comes last, as in the example

### TODO

Make available as npm package
