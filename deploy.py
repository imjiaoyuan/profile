import yaml
import json
import os
import markdown
from pathlib import Path

def load_yaml(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)

def load_markdown(file_path):
    if not os.path.exists(file_path):
        # 如果文件不存在，创建一个默认内容的文件
        create_default_markdown(file_path)
        return markdown.markdown("# Hello World!")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        # 使用 markdown 扩展来支持 GitHub 风格的代码块
        return markdown.markdown(
            content,
            extensions=[
                'fenced_code',
                'codehilite',
                'tables',
                'markdown.extensions.attr_list'
            ],
            extension_configs={
                'codehilite': {
                    'css_class': 'highlight',
                    'use_pygments': False
                }
            }
        )

def create_default_markdown(file_path):
    """创建默认的markdown文件"""
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write("# Hello World!")
    print(f'✓ Created: {Path(file_path).name}')

def main():
    # 加载配置文件
    config = load_yaml('config.yml')
    
    # 加载所有内容文件
    contents = {}
    content_dir = Path('content')
    # 确保 content 目录存在
    content_dir.mkdir(exist_ok=True)
    
    # 从配置文件中获取导航项
    sections = [item['url'].replace('#', '') for item in config.get('navigation', [])]
    
    for section in sections:
        md_file = content_dir / f'{section}.md'
        contents[section] = load_markdown(str(md_file))
    
    # 组合数据
    data = {
        'config': config,
        'contents': contents
    }
    
    # 写入 data.json
    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print('Generated: data.json')

if __name__ == '__main__':
    main() 