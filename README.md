# Description

A minimalist academic homepage generator using YAML for configuration, Markdown for content, and GitHub Pages for deployment.

## Usage

1. Fork this repository
2. Modify `config.yml`:
   - Personal info (name, avatar, description)
   - Social media links
   - Navigation menu
3. Write your content in `content/` directory
4. Push to GitHub and the site will be automatically deployed via GitHub Actions

## Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Generate data.json
python deploy.py

# Start local server at http://localhost:8000
python -m http.server 8000
```