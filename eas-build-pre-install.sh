#!/bin/bash
# eas-build-pre-install.sh

# Install pnpm
npm install -g pnpm

# Output versions for debugging
echo "Node version: $(node -v)"
echo "PNPM version: $(pnpm -v)"