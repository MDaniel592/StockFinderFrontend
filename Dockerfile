# Production image, copy all the files and run next
FROM node:16-alpine
RUN apk add --no-cache libc6-compat

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


COPY package*.json ./
# RUN npm install
RUN npm ci

COPY . .

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV DOMAIN_NAME stockfinder.tech

RUN npm run build

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE ${DOCKER_FRONTEND_PORT}
ENV PORT=${DOCKER_FRONTEND_PORT}


CMD ["node", "server.js"]