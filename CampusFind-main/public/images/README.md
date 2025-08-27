# Images Directory

This directory contains images used in the CampusFind application.

## Adding Team Member Photos

To add photos for the team members on the About Us page:

1. **Add your photos to this directory:**

   - `khushi-avatar.jpg` - Photo for Khushi Padaliya
   - `apexa-avatar.jpg` - Photo for Apexa Patel

2. **Image Requirements:**

   - Format: JPG, PNG, or WebP
   - Recommended size: 200x200 pixels (square format works best)
   - File size: Keep under 1MB for optimal loading

3. **Naming Convention:**
   - Use lowercase letters
   - Use hyphens instead of spaces
   - Include file extension

## Fallback System

If the images are not found, the system will automatically generate avatar images using the person's initials. This ensures the page always displays properly even without custom photos.

## Example File Structure:

```
public/
├── images/
│   ├── khushi-avatar.jpg
│   ├── apexa-avatar.jpg
│   └── README.md (this file)
```

## Updating Image Paths

If you want to use different filenames, update the paths in:
`src/pages/AboutUsPage.jsx` in the `teamMembers` array.
