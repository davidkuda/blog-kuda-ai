---
title: 'How to use Docker with an Apple Silicon M1 Chip'
slug: 'terraform_variables'
date: '2021-07-10T20:44:05.872Z'
---

I love my new Macbook in so many aspects. There are some challenges, though. One of them: Docker. If you are here, you have probably already run into problems, too. Here are the best strategies that I have found so far on how you can troubleshoot.

### Use iTerm2 (or terminal) in Rosetta mode

Open Finder and select Applications. Duplicate your terminal app (in my case iTerm). Rename the copy to "iTerm Rosetta". Right click "iTerm Rosetta", click on "Get Info" and tick "Open using Rosetta".

### Use "linux/arm64" as default platform
You can export an environment variable called "DOCKER_DEFAULT_PLATFORM". Set it to "linux/arm64".
```export DOCKER_DEFAULT_PLATFORM=linux/arm64```

### Build your images with "--platform=linux/arm"

Many images enable you to use the arm platform. After the `FROM` statement, use the option `--platform=linux/arm`.

If you try using any alpine image, you will likely run into an error. If you use instead use it with this flag in your Dockerfile, you will not have any problems.

```Dockerfile
FROM --platform=linux/arm node:alpine
WORKDIR "/app"
COPY package.json .
RUN npm install
# We don't need to handle volumnes for the production
# environment since we are not going to "develop" here.
COPY . .
CMD ["npm", "run", "build"]
```
