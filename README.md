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
