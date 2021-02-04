module.exports = {
    base: '/blog/',
    dest: 'dist',
    title: '行书子',
    description: '',
    themeConfig: {
        editLinks: false,
        docsDir: 'docs',
        nav: [{
                text: '前端算法',
                link: 'https://github.com/xszi/javascript-algorithms'
            },
            {
                text: '机器学习',
                link: 'https://github.com/xszi/javascript-algorithms'
            },
            {
                text: '感悟杂记',
                link: 'https://github.com/xszi/javascript-algorithms'
            },
            {
                text: 'Github',
                link: 'https://www.github.com/xszi'
            },
        ],
        sidebar: [{
                title: '2021训练专题',
                collapsable: false,
                children: [
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
            }
        ]
    },
    plugins: {
        '@vssue/vuepress-plugin-vssue': {
          platform: 'github', //v3的platform是github，v4的是github-v4
          locale: 'zh', //语言
          // 其他的 Vssue 配置
          owner: 'xszi', //github账户名
          repo: 'blog', //github一个项目的名称
          clientId: '46b28c3bacd5c436fe28',//注册的Client ID
          clientSecret: '87fb68373df686731ab6578bb3eb56f48269c117',//注册的Client Secret
          autoCreateIssue:true // 自动创建评论，默认是false，最好开启，这样首次进入页面的时候就不用去点击创建评论的按钮了。
        }
    }
}