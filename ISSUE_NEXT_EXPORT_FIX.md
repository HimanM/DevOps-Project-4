# Issue: ECS Tasks Failing with "next start does not work with output: export"

## Problem Description

After deploying the Next.js application to AWS ECS, the containers were repeatedly starting and then stopping with exit code 1. The deployment workflow was completing successfully, but the ECS service was unable to maintain running tasks.

## Symptoms

- ECS tasks started successfully
- Container pulled from ECR without issues
- Application initialized (`✓ Starting...`)
- Container crashed immediately after startup with exit code 1
- ECS service kept trying to start new tasks in a loop

## Error Details

From CloudWatch logs:

```
Error: "next start" does not work with "output: export" configuration. 
Use "npx serve@latest out" instead.
    at ignore-listed frames
```

## Root Cause

The Next.js configuration had `output: 'export'` set globally, which generates static HTML files. This mode is incompatible with `next start` command used in production deployments.

The issue occurred because:
1. GitHub Pages deployment requires `output: 'export'` (static site)
2. AWS ECS deployment requires `output: 'standalone'` (Node.js server)
3. Both deployments were using the same configuration

## Solution

### 1. Updated `next.config.ts` to conditionally set output mode:

```typescript
import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS && process.env.DEPLOY_AWS !== 'true';

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: isGitHubPages ? 'export' : 'standalone',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

### 2. Updated Dockerfile for production-ready standalone mode:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production image with standalone output
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### 3. Updated GitHub Actions workflow to set environment variable:

```yaml
- name: Build for GitHub Pages
  if: steps.check-deploy.outputs.deploy_to_aws == 'false'
  working-directory: ./aws-deploy-guide
  run: npm run build
  env:
    NEXT_PUBLIC_BASE_PATH: ''
    DEPLOY_AWS: 'false'
```

## Verification

After implementing the fix:

1. **AWS ECS Deployment**: Container starts successfully with `standalone` mode
   ```
   ▲ Next.js 16.0.5
   - Local:         http://ip-172-31-12-97.us-west-2.compute.internal:3000
   - Network:       http://ip-172-31-12-97.us-west-2.compute.internal:3000
   ✓ Starting...
   ✓ Ready in 293ms
   ```

2. **GitHub Pages Deployment**: Static files generated correctly with `export` mode

## Key Takeaways

- Next.js `output: 'export'` is for static sites only (no server required)
- Next.js `output: 'standalone'` is for production Node.js servers
- Use environment variables to conditionally configure build modes
- Always check CloudWatch logs for ECS container failures
- Use multi-stage Docker builds for optimized production images

## Commands Used for Debugging

```powershell
# Check ECS task status
aws ecs describe-tasks --cluster CLUSTER_NAME --tasks TASK_ARN --region REGION

# View CloudWatch logs
aws logs tail /ecs/TASK_DEFINITION_NAME --since 1h --region REGION

# Test container locally
docker build -t aws-deploy-guide .
docker run -p 3000:3000 aws-deploy-guide
```

## Related Documentation

- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Next.js Standalone Output](https://nextjs.org/docs/app/api-reference/next-config-js/output)
- [AWS ECS Task Definition](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html)
