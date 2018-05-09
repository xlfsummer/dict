# dict
一个命令行翻译工具，调用有道智云接口

## 功能说明

- 支持单词查询，详细/简略模式  
使用 `-d` 或 `--detail` 显示更多内容  
![详细查询](https://github.com/xlfsummer/dict/blob/master/public/dict-detail-example.png) 

- 支持句子翻译  
直接 `dict + <句子内容>` 即可翻译

- 支持 9 种语言的相互翻译  
使用 `-f` 或 `--from` 指定源语言, 使用 `-t` 或 `--to` 指定目标语言  
![翻译语言](https://github.com/xlfsummer/dict/blob/master/public/dict-language.png) 

- 支持连续查询  
使用 `-` 参数, 在一次翻译结束后保留参数(`-t`, `-f`, `-d`)继续翻译  
![连续查询](https://github.com/xlfsummer/dict/blob/master/public/dict-continue.png) 

- 任何情况下可从 Windows 搜索快速启动，手指无需离开键盘  
按 `Windows` 后直接输入 `dict - <内容>` 即可启动翻译, 翻译完成后按回车即可退出  
![菜单启动](https://github.com/xlfsummer/dict/blob/master/public/dict-startmenu.png) 

- 支持跳转到网页词典界面  
使用 `-o` 或 `--online` 参数打开有道词典对应单词页面，查看更多更详细的释义

## 安装

1. 使用 npm i cli-dict-x -g 安装

## 首次运行

要使用此工具，你需要一个[有道智云](http://ai.youdao.com/)的账户。首次运行此程序时会要求填入有道智云的 appSecret 和 appKey。

1. 注册并登录[有道智云](http://ai.youdao.com/)
2. 应用管理 > 我的应用 > 创建应用 创建一个应用
	- 应用名称：命令行翻译应用
	- 应用类别: 效率办公
	- 应用平台: API
3. 自然语言翻译 > 翻译实例 > 创建实例
	- 实例名称: 命令行翻译实例
	- 实例类型: 文本翻译
4. 自然语言翻译 > 翻译实例 > 命令行翻译实例 > 操作 > 绑定应用
	- 选择刚创建的应用 > 提交更改
5. 应用管理 > 我的应用 > 应用名称：命令行翻译应用
	- 复制 "应用ID" 和 "应用密钥"
6. 在命令行输入 `dict` 启动应用
	- 在 appSecret 中填入应用密钥
	- 在 appKey 中填入应用ID

## 支持的语言与语言代码对应表
语言		|代码
---|---
中文		|zh-CHS
日文		|ja
英文		|EN
韩文		|ko
法文		|fr
俄文		|ru
葡萄牙文	| pt
西班牙文	| es
越南文		| vi
