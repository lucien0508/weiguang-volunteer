# 微光支教计划 · 公益网站

一个介绍“乡村支教”公益项目的响应式单页网站，包含完整的文案、真实照片、动图与交互功能。

## 预览

在 `outputs/weiguang` 目录下运行：

```bash
python3 -m http.server 8080
```

然后访问 <http://localhost:8080>。

## 文件结构

- `index.html`：页面内容与结构
- `styles.css`：样式与响应式布局
- `script.js`：全部交互逻辑
- `assets/`：真实照片、三段动画 GIF

## 图片来源与许可

真实照片来自 Wikimedia Commons，均在本地保存为 `assets/*.jpg`，并遵循各自许可（CC BY / CC BY-SA / Public domain）使用，仅作公益展示：

| 文件 | 内容 | 许可 |
| --- | --- | --- |
| `about-volunteer.jpg` | 支教志愿者与学生们 | Public domain（Peace Corps） |
| `photo-01.jpg` | 贵州西江乡村课堂 | CC BY 2.0 |
| `photo-02/03.jpg` | 广西龙州民族中学英语课 | CC BY 2.0 |
| `photo-04.jpg` | 广西阳朔英语课 | CC BY 2.0 |
| `photo-05.jpg` | 北洛小学校园 | CC BY-SA 4.0 |
| `photo-06.jpg` | 杨家岭福州希望小学 | CC BY-SA 4.0 |
| `photo-07.jpg` | 贵州织金希望小学的孩子 | Public domain |
| `photo-08.jpg` | 科学实验课 | CC BY-SA 4.0 |

每张图的 `<img>` 标签里也保留了原始 Commons 页面链接（`data-remote` 属性），便于溯源与替换。

## 包含的交互

- 滚动进度条、吸顶导航、移动端菜单
- 教育箴言横幅（雅斯贝尔斯《什么是教育》）
- 滚动进入动画、数字滚动计数
- 课程标签页切换
- “温暖课桌”助力按钮 + 进度条
- 照片墙灯箱（上一张/下一张/键盘方向键/Esc）
- 志愿者感言轮播（自动播放 + 圆点 + 手动切换）
- 常见问题手风琴
- 报名表单校验与提交反馈
- 回到顶部、页脚年份自动更新

## 自定义

直接编辑 `index.html` 中的文案与图片链接，替换 `styles.css` 中的颜色变量（`:root`）即可快速换肤。要接入真实报名，可将表单提交指向你的后端或表单服务。
