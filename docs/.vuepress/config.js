module.exports = {
    // 注入到当前页面的 HTML <head> 中的标签
    base: '/docs/',
    head: [
        ['link', {
            rel: 'icon',
            href: '/logo.png'
        }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    dest: 'dist',
    title: '行书子',
    description: '文档记录',
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
        sidebarDepth: 2, // 将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        lastUpdated: '上次更新', // 文档更新时间：每个文件git最后提交的时间
        editLinks: false,
        docsDir: 'docs',
        nav: [{
                text: '前端算法',
                link: 'https://github.com/xszi/javascript-algorithms'
            },
            {
                text: '机器学习',
                link: 'https://xszi.github.io/docs/'
            },
            {
                text: '感悟杂记',
                link: 'https://xszi.github.io/docs'
            },
            {
                text: 'Github',
                link: 'https://www.github.com/xszi'
            },
        ],
        sidebar: [{
            title: '前端译站',
            collapsable: true,
            children: [
                'translation/category',
                'translation/nginx',
                'translation/callstack',
                'translation/docker',
                'translation/nodeq',
                'translation/float',
                'translation/eventloop',
                'translation/hoisting',
                'translation/scope',
                'translation/jsengine',
                'translation/prototype',
                'translation/geniterator',
                'translation/promise',
                'translation/stream',
                'translation/chrometool',
            ]
        }, {
            title: '备忘',
            collapsable: false,
            children: [
                'review/memo',
                'review/plan',
                'review/trend',
                'review/question',
                'review/html',
                'review/css'
            ]
        }, {
            title: '训练专题',
            collapsable: false,
            children: [
                'topic/sourcemap',
                'topic/hmr',
                'topic/algorithms',
                'topic/webpack',
                'topic/monitor'
            ]
        }, {
            title: 'TypeScript',
            collapsable: false,
            children: [
                'typescript/intro',
                'typescript/install',
                'typescript/start'
            ]
        }]
    },
    plugins: {
        '@vssue/vuepress-plugin-vssue': {
            platform: 'github', //v3的platform是github，v4的是github-v4
            locale: 'zh', //语言
            // 其他的 Vssue 配置
            owner: 'xszi', //github账户名
            repo: 'xszi.github.io', //github一个项目的名称
            clientId: '46b28c3bacd5c436fe28', //注册的Client ID
            clientSecret: '87fb68373df686731ab6578bb3eb56f48269c117', //注册的Client Secret
            autoCreateIssue: true // 自动创建评论，默认是false，最好开启，这样首次进入页面的时候就不用去点击创建评论的按钮了。
        }
    }
}