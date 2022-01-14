# This is a multistage dockerfile we start by building the extension bundle and creating a modifed config file
# After which we start with a fresh container of routerlicious and copy the bundle and the config file.

# We use the container it is running in to to build the bundle to make sure we use consistent node/npm versions
# Would be replaced with a routerlicious image that supports extensions
FROM routerlicious_alfred:latest

# For clarity make build folder
WORKDIR "/usr/bundle"

# Build the bundle
ADD ./ ./

RUN npm install --unsafe-perm
RUN npm run build:compile

# Update the config
RUN  BUNDLEPATH=/usr/src/server/extensions/dynamodb/dynamo.js JSONPATH=/usr/src/server/packages/routerlicious/config/config.json node edit.js

# Would be replaced with a routerlicious image that supports extensions
FROM routerlicious_alfred:latest
COPY --from=0 /usr/bundle/out.json /usr/src/server/packages/routerlicious/config/config.json
COPY --from=0 /usr/bundle/dist/ /usr/src/server/extensions/dynamodb/

