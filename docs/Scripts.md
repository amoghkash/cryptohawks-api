# Scripts

## Purpose

This module holds and organizes supporting functions for the API. This includes all misc tasks that don't fit into the other folders. It is necessary for organization and readability.

## Script List

1. inputValidation.js
   - Purpose: Validate the body of a request. If a certain field is wrong or missing, instead of throwing an error, let the user know by sending a specific error that specifies what is wrong. Ex. "title is required"
   - Uses JOI API to accomplish validation
  
2. jwt.js
   - Purpose: Handle creation and reading of jwt tokens
   - Uses jsonwebtoken API to accomplish validation and parsing of tokens
